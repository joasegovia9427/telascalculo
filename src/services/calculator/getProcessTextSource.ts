import { Item } from './type';

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

/** Match "34 3/4 x 60 1/4 (Manual L)" or "94 5/8 X 78 1/8 (2,1)" */
const parseDimensionsLine = (
    line: string
): { width: number; height: number; type: string } => {
    const xMatch = line.match(/^(.+?)\s+[xX]\s+(.+?)(?:\s*\(([^)]*)\))?\s*$/);
    if (xMatch) {
        const width = parseMixedNumber(xMatch[1].trim());
        const height = parseMixedNumber(xMatch[2].trim());
        const type = (xMatch[3] ?? '').trim();
        return { width, height, type };
    }

    //TODO:: identify the type here

    return { width: 0, height: 0, type: '' };
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

const extractInfoFromItems = (stringsItems: string[]): Item[] => {
    const parsedItems: Item[] = stringsItems.map(stringItem => {
        const lines = stringItem
            .split('\n')
            .map(l => l.trim())
            .filter(Boolean);
        const firstLine = lines[0] ?? '';
        const firstMatch = firstLine.match(/^(\d+)\.\s*(.+)$/);
        const id = firstMatch?.[1] ?? '';
        const name = firstMatch?.[2] ?? firstLine;
        const detailsLine = lines[1] ?? '';
        const { width, height, type } = parseDimensionsLine(detailsLine);
        const yards = yardsFromDimensions(height, type);
        return {
            id,
            originalLine: stringItem,
            props: {
                name,
                type,
                width,
                height,
                yards,
            },
        };
    });

    return parsedItems;
};
