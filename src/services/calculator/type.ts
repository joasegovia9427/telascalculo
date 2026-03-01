import z from 'zod';

import { ItemSchema } from './schemas';

export type Item = z.infer<typeof ItemSchema>;
