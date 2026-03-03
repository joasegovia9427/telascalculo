import { Card, CardDescription, CardHeader, CardTitle } from '~/components/ui';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '~/components/ui/accordion';
import { Item } from '~/services/calculator';
import { getTextOccurrencesCounter } from '~/utils/utils';

import { InvoiceItem } from './InvoiceItem';

export const InvoicesProcessedList = ({ list }: { list: Item[] }) => {
    const unknownDataCounter = getTextOccurrencesCounter(list, 'unknown');

    return (
        <Accordion type="single" collapsible defaultValue="item-1">
            <AccordionItem value="item-1">
                <Card>
                    <AccordionTrigger headerClassName="bg-card sticky top-0 z-10 -mx-6 -mt-6 px-6 pt-6">
                        <CardHeader className="flex w-full flex-row items-center">
                            <CardTitle>Items</CardTitle>
                            <CardDescription className="flex w-full flex-row items-center justify-between gap-2 pr-4">
                                <p className="my-auto">
                                    {list.length} items found
                                </p>
                                {unknownDataCounter > 0 && (
                                    <p className="my-auto rounded-md bg-red-400 p-3">
                                        ERROR: {unknownDataCounter} unknown data
                                    </p>
                                )}
                                {unknownDataCounter === 0 && (
                                    <p className="my-auto rounded-md bg-green-200 p-3">
                                        No unknown data found. All OK 😉
                                    </p>
                                )}
                            </CardDescription>
                        </CardHeader>
                    </AccordionTrigger>

                    <AccordionContent>
                        <div className="max-h-[60vh] overflow-y-auto">
                            <ul className="items-start divide-y divide-gray-900">
                                {list.map((item, index) => (
                                    <InvoiceItem
                                        key={item.id}
                                        item={item}
                                        index={index}
                                    />
                                ))}
                            </ul>
                        </div>
                        {/* <div className="flex gap-2">
                    <Input
                        type="text"
                        onChange={e => setNewItem(e.target.value)}
                    />
                    <Button onClick={handleAdd}>
                        Add
                        <ListPlus />
                    </Button>
                </div> */}
                    </AccordionContent>
                </Card>
            </AccordionItem>
        </Accordion>
    );
};
