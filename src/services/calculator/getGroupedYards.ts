import { GroupedItem, Item } from './type';

// MAX_WIDTH_ROLL_YARDS

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
                    totalYards: current.reduce(
                        (sum, i) => sum + i.props.yards.ceilingValue,
                        0
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
            totalYards: current.reduce(
                (sum, i) => sum + i.props.yards.ceilingValue,
                0
            ),
            items: current,
        });
    }

    return groups;
}
