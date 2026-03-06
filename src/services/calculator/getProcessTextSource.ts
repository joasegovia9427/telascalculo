import { generateId } from '~/utils/utils';

import { EXCLUSION_WORDS, FABRIC_TYPES, FABRICS } from './constants';
import { Item } from './type';

type FabricKey = keyof typeof FABRICS;
type FabricType = Item['props']['type'];

/** Map each alias in FABRIC_TYPES to its canonical type (first value). Sorted by alias length desc so longer matches win (e.g. "roller zebra" before "zebra"). */
const FABRIC_TYPE_ALIASES: { alias: string; canonicalType: FabricType }[] = (
    Object.keys(FABRIC_TYPES) as (keyof typeof FABRIC_TYPES)[]
).flatMap(key => {
    const values = FABRIC_TYPES[key];
    const canonicalType = values[0] as FabricType;
    return values.map(alias => ({ alias: alias.toLowerCase(), canonicalType }));
});
FABRIC_TYPE_ALIASES.sort((a, b) => b.alias.length - a.alias.length);

/** True if the line contains any of EXCLUSION_WORDS as a whole word (case-insensitive). */
const lineHasExclusionWord = (line: string): boolean =>
    EXCLUSION_WORDS.some(word =>
        new RegExp(`\\b${escapeRegex(word)}\\b`, 'i').test(line)
    );

const escapeRegex = (s: string): string =>
    s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// const replaceBreakLinesForSpaces = (text: string): string => {
//     return text.replace(/\n/g, ' ');
// };

/** True if any line in the item contains an exclusion word (whole word, case-insensitive). */
const itemHasExclusionWord = (item: string): boolean =>
    item.split('\n').some(line => lineHasExclusionWord(line));

export const getProcessTextSource = (text: string): Item[] => {
    const lines = text
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0 && !line.startsWith('BB:'));

    const stringsItems: string[] = [];
    let currentItem = '';

    for (const line of lines) {
        const isNewItem = /^\d+\./.test(line);

        if (isNewItem) {
            if (currentItem && !itemHasExclusionWord(currentItem)) {
                stringsItems.push(currentItem);
            }
            currentItem = line;
        } else if (currentItem) {
            currentItem += '\n' + line;
        }
    }

    if (currentItem && !itemHasExclusionWord(currentItem)) {
        stringsItems.push(currentItem);
    }

    const parsedItems = extractInfoFromItems(stringsItems);

    return parsedItems;
};

const parseMixedNumber = (s: string): number => {
    const trimmed = s.trim();
    const fractionMatch = trimmed.match(/^(\d+)\s+(\d+)\/(\d+)$/);
    if (fractionMatch) {
        const whole = parseInt(fractionMatch[1], 10);
        const num = parseInt(fractionMatch[2], 10);
        const den = parseInt(fractionMatch[3], 10);
        return whole + (den ? num / den : 0);
    }
    const simple = parseFloat(trimmed);
    return Number.isNaN(simple) ? 0 : simple;
};

/** Standalone fraction before "x" (e.g. "1/2 x 34 1/2") is invalid — dimension must have a whole number or mixed number, not only a fraction. */
const STANDALONE_FRACTION_BEFORE_X = /^(?:\s*\([^)]*\))*\s*\d+\/\d+\s*[xX×]/;
/** Standalone fraction after "x" (e.g. "70 1/2 × 3/8") is invalid — height must have a whole number or mixed number, not only a fraction. */
const STANDALONE_FRACTION_AFTER_X =
    /[xX×](?:\s*\([^)]*\))*\s*\d+\/\d+(\s|$|\))/;

/** Match dimensions W x H; allows parentheticals before first number e.g. "(Roller Translucent) 34 7/8 x 60 1/2 (Manual L)", after x, and at end. Searches the whole line (no ^) so it works when dimensions follow a type in parens. */
const parseDimensionsLine = (
    line: string
): { width: number; height: number } => {
    if (STANDALONE_FRACTION_BEFORE_X.test(line)) {
        return { width: 0, height: 0 };
    }
    if (STANDALONE_FRACTION_AFTER_X.test(line)) {
        return { width: 0, height: 0 };
    }
    const xMatch = line.match(
        /(?:\s*\([^)]*\))*\s*(\d+(?:\s+\d+\/\d+)?)(?:\s*\([^)]*\))*\s*[xX×]\s*(\d+(?:\s+\d+\/\d+)?)(?:\s*\([^)]*\))*/
    );
    if (xMatch) {
        const width = parseMixedNumber(xMatch[1].trim());
        const height = parseMixedNumber(xMatch[2].trim());
        return { width, height };
    }

    return { width: 0, height: 0 };
};

/** True if the line looks like a dimensions line (W x H) so it can be attributed to the previous item. */
const isDimensionsLine = (line: string): boolean => {
    const { width, height } = parseDimensionsLine(line);
    return width > 0 && height > 0;
};

const yardsFromDimensions = (
    height: number,
    type: string
): { text: string; rowValue: number; ceilingValue: number } => {
    if (type === 'zebra')
        return {
            text: `((${height}(height) * 2) + 12) / 36`,
            rowValue: (height * 2 + 12) / 36,
            ceilingValue: Math.ceil((height * 2 + 12) / 36),
        };

    return {
        text: `(${height}(height) + 12) / 36`,
        rowValue: (height + 12) / 36,
        ceilingValue: Math.ceil((height + 12) / 36),
    };
};

const parseTypeFabricColor = (
    itemText: string
): { type: FabricType; fabric: string; color: string } => {
    const normalized = itemText.toLowerCase().trim();

    for (const key of Object.keys(FABRICS) as FabricKey[]) {
        const entry = FABRICS[key];
        const fabricName = entry.name.toLowerCase();
        const fabricKey = key.replace(/_/g, ' ');
        const fabricMatch =
            normalized.includes(fabricName) || normalized.includes(fabricKey);

        if (!fabricMatch) continue;

        const colors = entry.color as Record<string, string>;
        for (const [colorKey, colorName] of Object.entries(colors)) {
            const colorKeyNorm = colorKey.replace(/_/g, ' ');
            const colorNameNorm = colorName.toLowerCase();
            if (
                normalized.includes(colorNameNorm) ||
                normalized.includes(colorKeyNorm)
            ) {
                return {
                    type: entry.type,
                    fabric: entry.name,
                    color: colorName,
                };
            }
        }

        return {
            type: entry.type,
            fabric: entry.name,
            color: 'unknown',
        };
    }

    // No fabric matched: try to infer type from aliases in FABRIC_TYPES (e.g. "roller zebra" -> zebra)
    for (const { alias, canonicalType } of FABRIC_TYPE_ALIASES) {
        if (normalized.includes(alias)) {
            return {
                type: canonicalType,
                fabric: 'unknown',
                color: 'unknown',
            };
        }
    }

    return {
        type: FABRIC_TYPES.UNKNOWN[0],
        fabric: 'unknown',
        color: 'unknown',
    };
};

const extractInfoFromItems = (stringsItems: string[]): Item[] => {
    const parsedItems: Item[] = [];

    for (const stringItem of stringsItems) {
        const uniqueId = generateId();
        const lines = stringItem
            .split('\n')
            .map(l => l.trim())
            .filter(Boolean);
        const firstLine = lines[0] ?? '';
        const firstMatch = firstLine.match(/^(\d+)\.\s*(.+)$/);
        const baseId = (firstMatch?.[1] ?? '0') + '-' + uniqueId;
        const name = firstMatch?.[2] ?? firstLine;
        const { type, fabric, color } = parseTypeFabricColor(stringItem);

        const dimensionLines = lines.slice(1).filter(isDimensionsLine);

        if (dimensionLines.length === 0) {
            const detailsLine = lines[1] ?? '';
            let { width, height } = parseDimensionsLine(detailsLine);
            if (width === 0 && height === 0 && firstLine) {
                const fromFirst = parseDimensionsLine(firstLine);
                width = fromFirst.width;
                height = fromFirst.height;
            }
            const yards = yardsFromDimensions(height, type);
            parsedItems.push({
                id: baseId,
                originalLine: stringItem,
                props: {
                    name,
                    type,
                    fabric,
                    color,
                    width,
                    height,
                    yards,
                },
            });
        } else {
            dimensionLines.forEach((dimLine, index) => {
                const { width, height } = parseDimensionsLine(dimLine);
                const yards = yardsFromDimensions(height, type);
                parsedItems.push({
                    id: `${baseId}-${index}`,
                    originalLine: index === 0 ? stringItem : dimLine,
                    props: {
                        name,
                        type,
                        fabric,
                        color,
                        width,
                        height,
                        yards,
                    },
                });
            });
        }
    }

    return parsedItems;
};
