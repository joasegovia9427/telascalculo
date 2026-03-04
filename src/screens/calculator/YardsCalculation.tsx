import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
    ItemPill,
} from '~/components/ui';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '~/components/ui/accordion';
import { getYardsByTypeFabricColor, Item } from '~/services/calculator';

export const YardsCalculation = ({ list }: { list: Item[] }) => {
    const yardsByTypeFabricColor = getYardsByTypeFabricColor(list);

    const totalUnprocessedYards = yardsByTypeFabricColor.reduce(
        (acc, item) => acc + item.yards,
        0
    );

    return (
        <Accordion type="single" collapsible defaultValue="item-1">
            <AccordionItem value="item-1">
                <Card>
                    <CardHeader className="bg-card sticky top-0 z-10 -mx-6 -mt-6 flex flex-row items-center px-6 pt-6">
                        <AccordionTrigger
                            headerClassName="flex-1"
                            className="flex-1 flex-col sm:flex-row [&>svg]:ml-2"
                        >
                            <CardTitle className="flex-1">
                                Yards Calculation Summary: Total unprocessed
                                yards :: {totalUnprocessedYards} yards
                            </CardTitle>
                            <CardDescription className="flex w-full flex-1 justify-end">
                                <div className="flex w-auto shrink-0 flex-row items-center gap-2 rounded-md bg-blue-800/70 p-1 text-white">
                                    TOTALS TYPES-FABRICS-COLORS::{' '}
                                    {yardsByTypeFabricColor.length}
                                </div>
                            </CardDescription>
                        </AccordionTrigger>
                    </CardHeader>

                    <AccordionContent>
                        <div className="max-h-[60vh] overflow-y-auto">
                            <ul className="items-center space-y-2 divide-y divide-gray-600">
                                {yardsByTypeFabricColor.map((item, index) => (
                                    <div
                                        key={item.id}
                                        className="flex flex-col items-center gap-2 sm:flex-row"
                                    >
                                        <div className="flex flex-row items-center gap-2">
                                            <p className="">{index + 1} )</p>
                                        </div>
                                        <div className="flex flex-row items-center gap-2">
                                            <ItemPill
                                                label="Type"
                                                value={item.type}
                                            />
                                            <ItemPill
                                                label="Fabric"
                                                value={item.fabric}
                                            />
                                        </div>
                                        <div className="flex flex-row items-center gap-2">
                                            <ItemPill
                                                label="Color"
                                                value={item.color}
                                            />
                                            <ItemPill
                                                label="*Unprocessed Yards"
                                                value={item.yards}
                                            />
                                        </div>
                                        <p>
                                            Do not use this value for
                                            calculations
                                        </p>
                                    </div>
                                ))}
                            </ul>
                        </div>
                    </AccordionContent>
                </Card>
            </AccordionItem>
        </Accordion>
    );
};
