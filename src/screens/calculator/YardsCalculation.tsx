import { Card, CardHeader, CardTitle, ItemPill } from '~/components/ui';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '~/components/ui/accordion';
import { getYardsByTypeFabricColor, Item } from '~/services/calculator';

export const YardsCalculation = ({ list }: { list: Item[] }) => {
    const yardsByTypeFabricColor = getYardsByTypeFabricColor(list);

    console.log('yardsByTypeFabricColor: ', yardsByTypeFabricColor);

    return (
        <Accordion type="single" collapsible defaultValue="item-1">
            <AccordionItem value="item-1">
                <Card>
                    <CardHeader className="bg-card sticky top-0 z-10 -mx-6 -mt-6 flex flex-row items-center px-6 pt-6">
                        <AccordionTrigger
                            headerClassName="flex-1"
                            className="flex-1 [&>svg]:ml-2"
                        >
                            <CardTitle>Yards Calculation Summary</CardTitle>
                        </AccordionTrigger>
                    </CardHeader>

                    <AccordionContent>
                        <div className="max-h-[60vh] overflow-y-auto">
                            <ul className="items-center space-y-2 divide-y divide-gray-600">
                                {yardsByTypeFabricColor.map((item, index) => (
                                    <div
                                        key={item.id}
                                        className="flex flex-row gap-2"
                                    >
                                        <div className="flex flex-row items-center gap-2">
                                            <p className="">{index + 1} )</p>
                                        </div>
                                        <ItemPill
                                            label="Type"
                                            value={item.type}
                                        />
                                        <ItemPill
                                            label="Fabric"
                                            value={item.fabric}
                                        />
                                        <ItemPill
                                            label="Color"
                                            value={item.color}
                                        />
                                        <ItemPill
                                            label="Yards"
                                            value={item.yards}
                                        />
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
