import z from 'zod';

import { FABRIC_TYPES } from './constants';

export const ItemSchema = z.object({
    id: z.string(),
    originalLine: z.string(),
    props: z.object({
        name: z.string(),
        type: z.enum(FABRIC_TYPES),
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
