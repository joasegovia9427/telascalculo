import { Card, CardDescription, CardHeader, CardTitle } from '~/components/ui';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '~/components/ui/accordion';
import { Item } from '~/services/calculator';
import { MAX_WIDTH_ROLL_YARDS } from '~/services/calculator/constants';
import { getYardsWithMaxWidthRoll } from '~/services/calculator/getGroupedYards';

import { InvoiceItemReduced } from './InvoiceItemReduced';

export const YardsGroupedRequest = ({ list }: { list: Item[] }) => {
    const totalUnprocessedYards = list.reduce(
        (acc, item) => acc + item.props.yards.ceilingValue,
        0
    );

    const yardsGroupedRequestWithMaxWidthRoll = getYardsWithMaxWidthRoll(list);

    const totalProcessedYards = yardsGroupedRequestWithMaxWidthRoll.reduce(
        (acc, item) => acc + item.totalYards,
        0
    );

    return (
        <Accordion type="single" collapsible defaultValue="item-1">
            <AccordionItem value="item-1">
                <Card>
                    <CardHeader className="bg-card sticky top-0 z-10 -mx-6 -mt-6 flex flex-row items-center px-2 pt-6">
                        <AccordionTrigger
                            headerClassName="flex-1"
                            className="flex-1 flex-col sm:flex-row [&>svg]:ml-2"
                        >
                            <CardTitle className="flex-1 text-xs sm:text-base">
                                Yards Grouped Request{' '}
                                <span className="text-orange-500">
                                    with max width roll of ::
                                </span>{' '}
                                <span className="bold text-orange-600 italic">
                                    {MAX_WIDTH_ROLL_YARDS} yards
                                </span>
                            </CardTitle>
                            <CardDescription className="flex w-full flex-1 justify-end text-xs sm:text-base">
                                <div className="flex flex-row items-center gap-2">
                                    <p className="text-bold my-auto align-middle text-xs text-green-700 sm:text-lg">
                                        Total processed yards ::{' '}
                                        {totalProcessedYards} yards
                                    </p>
                                    <p className="text-semibold text-md my-auto align-middle text-green-700 italic">
                                        We saved ::{' '}
                                        {totalUnprocessedYards -
                                            totalProcessedYards}{' '}
                                        yards 🎉
                                    </p>
                                    <div className="flex w-auto shrink-0 flex-row items-center gap-2 rounded-md bg-blue-800/70 p-1 text-white">
                                        Totals T-F-C::{' '}
                                        {
                                            yardsGroupedRequestWithMaxWidthRoll.length
                                        }
                                    </div>
                                </div>
                            </CardDescription>
                        </AccordionTrigger>
                    </CardHeader>

                    <AccordionContent>
                        <div className="max-h-[80vh] overflow-y-auto">
                            <ul className="items-center space-y-0 divide-y-6 divide-gray-900">
                                {yardsGroupedRequestWithMaxWidthRoll.map(
                                    (group, groupIndex) => (
                                        <li
                                            key={group.id}
                                            className="flex flex-col gap-1 pt-1"
                                        >
                                            <div className="rounded-md bg-gray-300 p-1 font-medium capitalize">
                                                {groupIndex + 1}. Type:
                                                {group.type} — Name:{' '}
                                                {group.fabric} — Color:{' '}
                                                {group.color}
                                                {' · '}
                                                <span className="bold text-md text-orange-600">
                                                    Total grouped and processed
                                                    yards:{' '}
                                                    <span className="bold text-md rounded-full bg-orange-100 p-1 text-orange-700">
                                                        {group.totalYards}
                                                    </span>
                                                </span>
                                                {' :: '}
                                                <span className="block text-sm font-bold whitespace-pre-line text-gray-700 sm:text-lg">
                                                    {group.description}
                                                </span>
                                            </div>
                                            <div className="flex flex-col gap-1 divide-y divide-dashed divide-gray-600">
                                                {group.items.map(
                                                    (item, index) => (
                                                        <InvoiceItemReduced
                                                            key={item.id}
                                                            groupIndex={
                                                                groupIndex
                                                            }
                                                            item={item}
                                                            index={index}
                                                        />
                                                    )
                                                )}
                                            </div>
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>
                    </AccordionContent>
                </Card>
            </AccordionItem>
        </Accordion>
    );
};
