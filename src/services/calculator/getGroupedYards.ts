import { MAX_WIDTH_ROLL_YARDS } from './constants';
import { GroupedItem, Item } from './type';

/**
 * Packs items into strips of maxRollWidth (side-by-side).
 * Each strip length = max(yards of items in that strip).
 * Returns total yards needed (sum of strip lengths).
 */
function computePackedYards(items: Item[], maxRollWidth: number): number {
    const strips: { usedWidth: number; maxYards: number }[] = [];

    for (const item of items) {
        const { width, yards } = item.props;
        const itemYards = yards.ceilingValue;
        let placed = false;

        for (const strip of strips) {
            if (strip.usedWidth + width <= maxRollWidth) {
                strip.usedWidth += width;
                strip.maxYards = Math.max(strip.maxYards, itemYards);
                placed = true;
                break;
            }
        }

        if (!placed) {
            strips.push({ usedWidth: width, maxYards: itemYards });
        }
    }

    return strips.reduce((sum, s) => sum + s.maxYards, 0);
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

    for (const item of sorted) {
        const { type, fabric, color } = item.props;
        const key = `${type}|${fabric}|${color}`;

        if (currentKey !== key) {
            if (current.length > 0) {
                const { type: t, fabric: f, color: c } = current[0].props;
                groups.push({
                    id: currentKey!,
                    type: t,
                    fabric: f,
                    color: c,
                    totalYards: computePackedYards(
                        current,
                        MAX_WIDTH_ROLL_YARDS
                    ),
                    items: current,
                });
            }
            currentKey = key;
            current = [item];
        } else {
            current.push(item);
        }
    }

    if (current.length > 0 && currentKey) {
        const { type, fabric, color } = current[0].props;
        groups.push({
            id: currentKey,
            type,
            fabric,
            color,
            totalYards: computePackedYards(current, MAX_WIDTH_ROLL_YARDS),
            items: current,
        });
    }

    return groups;
}
