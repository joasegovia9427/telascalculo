import z from 'zod';

import { FABRIC_TYPES_VALUES } from './constants';

export const ItemSchema = z.object({
    id: z.string(),
    originalLine: z.string(),
    props: z.object({
        name: z.string(),
        type: z.enum(FABRIC_TYPES_VALUES),
        fabric: z.string(),
        color: z.string(),
        width: z.number(),
        height: z.number(),
        yards: z.object({
            text: z.string(),
            rowValue: z.number(),
            ceilingValue: z.number(),
        }),
    }),
});

export const GroupedItemSchema = z.object({
    id: z.string(),
    type: z.string(),
    fabric: z.string(),
    color: z.string(),
    totalYards: z.number(),
    description: z.string(),
    items: z.array(
        ItemSchema.extend({
            groupCode: z.string(), // A, B, C... per packing strip for UI validation
        })
    ),
});
