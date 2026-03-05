import { MAX_WIDTH_ROLL_YARDS } from './constants';
import { GroupedItem, Item } from './type';

/**
 * Packs items into strips of maxRollWidth (side-by-side).
 * Each strip length = max(yards of items in that strip).
 * Returns strips with their items and total yards (sum of strip lengths).
 */
function computePackedStrips(
    items: Item[],
    maxRollWidth: number
): { totalYards: number; strips: Item[][] } {
    const strips: { usedWidth: number; maxYards: number; items: Item[] }[] = [];

    for (const item of items) {
        const { width, yards } = item.props;
        const itemYards = yards.ceilingValue;
        let placed = false;

        for (const strip of strips) {
            if (strip.usedWidth + width <= maxRollWidth) {
                strip.usedWidth += width;
                strip.maxYards = Math.max(strip.maxYards, itemYards);
                strip.items.push(item);
                placed = true;
                break;
            }
        }

        if (!placed) {
            strips.push({
                usedWidth: width,
                maxYards: itemYards,
                items: [item],
            });
        }
    }

    const totalYards = strips.reduce((sum, s) => sum + s.maxYards, 0);
    return {
        totalYards,
        strips: strips.map(s => s.items),
    };
}

function getStripLetter(index: number): string {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (index < letters.length) return letters[index];
    let result = '';
    let n = index;
    while (n >= 0) {
        result = letters[n % 26] + result;
        n = Math.floor(n / 26) - 1;
    }
    return result;
}

export function getYardsWithMaxWidthRoll(list: Item[]): GroupedItem[] {
    const sorted = [...list].sort((a, b) => {
        const {
            type: typeA,
            fabric: fabricA,
            color: colorA,
            width: widthA,
        } = a.props;
        const {
            type: typeB,
            fabric: fabricB,
            color: colorB,
            width: widthB,
        } = b.props;

        if (typeA !== typeB) return typeA.localeCompare(typeB);
        if (fabricA !== fabricB) return fabricA.localeCompare(fabricB);
        if (colorA !== colorB) return colorA.localeCompare(colorB);
        return widthB - widthA;
    });

    const groups: GroupedItem[] = [];
    let current: Item[] = [];
    let currentKey: string | null = null;

    function pushGroup(key: string, items: Item[]): void {
        const { totalYards, strips } = computePackedStrips(
            items,
            MAX_WIDTH_ROLL_YARDS
        );
        const { type: t, fabric: f, color: c } = items[0].props;
        const itemsWithGroupCode = strips.flatMap((stripItems, stripIndex) =>
            stripItems.map(item => ({
                ...item,
                groupCode: getStripLetter(stripIndex),
            }))
        );
        groups.push({
            id: key,
            type: t,
            fabric: f,
            color: c,
            totalYards,
            items: itemsWithGroupCode,
        });
    }

    for (const item of sorted) {
        const { type, fabric, color } = item.props;
        const key = `${type}|${fabric}|${color}`;

        if (currentKey !== key) {
            if (current.length > 0) {
                pushGroup(currentKey!, current);
            }
            currentKey = key;
            current = [item];
        } else {
            current.push(item);
        }
    }

    if (current.length > 0 && currentKey) {
        pushGroup(currentKey, current);
    }

    return groups;
}
