import { Item } from './type';

/** One row per type+fabric+color with total yards (sum of ceiling values) for production cut list */
export type YardsSummaryRow = {
    id: string;
    type: string;
    fabric: string;
    color: string;
    yards: number;
};

/**
 * Summarizes all list items and groups total yards by type–fabric–color
 * for the production team to cut fabrics.
 */
export function getYardsByTypeFabricColor(list: Item[]): YardsSummaryRow[] {
    const map = new Map<string, YardsSummaryRow>();

    for (const item of list) {
        const { type, fabric, color, yards } = item.props;
        const key = `${type}|${fabric}|${color}`;
        const existing = map.get(key);

        if (existing) {
            existing.yards += yards.ceilingValue;
        } else {
            map.set(key, {
                id: key,
                type,
                fabric,
                color,
                yards: yards.ceilingValue,
            });
        }
    }

    return Array.from(map.values()).sort((a, b) => {
        if (a.type !== b.type) return a.type.localeCompare(b.type);
        if (a.fabric !== b.fabric) return a.fabric.localeCompare(b.fabric);
        return a.color.localeCompare(b.color);
    });
}
