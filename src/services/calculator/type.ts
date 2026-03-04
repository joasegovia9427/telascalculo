import z from 'zod';

import { GroupedItemSchema, ItemSchema } from './schemas';

export type Item = z.infer<typeof ItemSchema>;

export type GroupedItem = z.infer<typeof GroupedItemSchema>;
