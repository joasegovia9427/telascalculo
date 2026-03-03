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
                    <CardHeader className="bg-card sticky top-0 z-10 -mx-6 -mt-6 flex flex-row items-center px-6 pt-6">
                        <AccordionTrigger
                            headerClassName="flex-1"
                            className="flex-1 flex-col sm:flex-row [&>svg]:ml-2"
                        >
                            <CardTitle>Items</CardTitle>
                            <CardDescription className="flex w-full items-center justify-between gap-3 pr-4">
                                <p className="my-auto pl-3">
                                    {list.length} items found
                                </p>
                                {unknownDataCounter > 0 && (
                                    <p className="my-auto rounded-md bg-red-400 p-3">
                                        ERROR: {unknownDataCounter} unknown data
                                    </p>
                                )}
                                {unknownDataCounter === 0 &&
                                    list.length > 0 && (
                                        <div className="flex w-auto shrink-0 flex-row items-center gap-2 rounded-md bg-green-600/70 p-1 text-white">
                                            No unknown data found. All OK 😉.
                                        </div>
                                    )}
                            </CardDescription>
                        </AccordionTrigger>
                    </CardHeader>

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
