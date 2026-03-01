import { generateId } from '~/utils/utils';

import { FABRIC_TYPES, FABRICS } from './constants';
import { Item } from './type';

type FabricKey = keyof typeof FABRICS;
type FabricType = Item['props']['type'];

// const replaceBreakLinesForSpaces = (text: string): string => {
//     return text.replace(/\n/g, ' ');
// };

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
            if (currentItem) {
                stringsItems.push(currentItem);
            }
            currentItem = line;
        } else if (currentItem) {
            currentItem += '\n' + line;
        }
    }

    if (currentItem) {
        stringsItems.push(currentItem);
    }

    console.log('items:: ', stringsItems);
    const parsedItems = extractInfoFromItems(stringsItems);
    console.log('parsedItems:: ', parsedItems);

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

/** Match "34 3/4 x 60 1/4 (Manual L)", "94 5/8 X 78 1/8 (2,1)", or "36 1/4 × 72 3/8" */
const parseDimensionsLine = (
    line: string
): { width: number; height: number } => {
    const xMatch = line.match(/^(.+?)\s+[xX×]\s+(.+?)(?:\s*\(([^)]*)\))?\s*$/);
    if (xMatch) {
        const width = parseMixedNumber(xMatch[1].trim());
        const height = parseMixedNumber(xMatch[2].trim());
        return { width, height };
    }

    return { width: 0, height: 0 };
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

    return {
        type: FABRIC_TYPES.UNKNOWN,
        fabric: 'unknown',
        color: 'unknown',
    };
};

const extractInfoFromItems = (stringsItems: string[]): Item[] => {
    const parsedItems: Item[] = stringsItems.map(stringItem => {
        const uniqueId = generateId();

        const lines = stringItem
            .split('\n')
            .map(l => l.trim())
            .filter(Boolean);
        const firstLine = lines[0] ?? '';
        const firstMatch = firstLine.match(/^(\d+)\.\s*(.+)$/);
        const id = firstMatch?.[1] + '-' + uniqueId;
        const name = firstMatch?.[2] ?? firstLine;
        const detailsLine = lines[1] ?? '';
        const { width, height } = parseDimensionsLine(detailsLine);
        const { type, fabric, color } = parseTypeFabricColor(stringItem);
        const yards = yardsFromDimensions(height, type);
        return {
            id,
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
        };
    });

    return parsedItems;
};
