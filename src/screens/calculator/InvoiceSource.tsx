import {
    ArrowDownWideNarrowIcon,
    BrushCleaningIcon,
    // ListPlus
} from 'lucide-react';
import { useState } from 'react';

import {
    Button,
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
    // Input,
    Textarea,
} from '~/components/ui';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '~/components/ui/accordion';
import { mockData } from '~/services/calculator/mockData';

export const InvoiceSource = ({
    onProcessSource,
}: {
    onProcessSource: (textSource: string) => void;
}) => {
    const [textSource, setTextSource] = useState<string>(mockData);

    const handleClearSource = () => {
        setTextSource('');
    };

    return (
        <Accordion type="single" collapsible defaultValue="item-1">
            <AccordionItem value="item-1">
                <Card>
                    <AccordionTrigger headerClassName="bg-card sticky top-0 z-10 -mx-6 -mt-6 px-6 pt-6">
                        <CardHeader className="flex w-full flex-row items-center">
                            <CardTitle>Source</CardTitle>
                            <CardDescription>
                                <p className="my-auto">Add source items</p>
                            </CardDescription>
                        </CardHeader>
                    </AccordionTrigger>

                    <AccordionContent>
                        <div className="flex flex-col justify-between gap-2 md:flex-row">
                            <div className="h-full w-full md:w-50">
                                <Card>
                                    <p>Image source:</p>
                                </Card>
                            </div>
                            <div className="h-full w-full">
                                <Card className="flex flex-col items-start gap-2">
                                    <div className="flex w-full flex-row items-center justify-between gap-2 p-2">
                                        <p>Text input source:</p>
                                        <Button
                                            variant="secondary"
                                            onClick={handleClearSource}
                                        >
                                            <BrushCleaningIcon className="size-4" />
                                        </Button>
                                    </div>
                                    <Textarea
                                        value={textSource}
                                        onChange={e =>
                                            setTextSource(e.target.value)
                                        }
                                        className="h-70"
                                    />
                                </Card>
                            </div>
                        </div>

                        <AccordionTrigger>
                            <Button
                                className="w-full"
                                onClick={() => onProcessSource(textSource)}
                            >
                                Process Source
                                <ArrowDownWideNarrowIcon />
                            </Button>
                        </AccordionTrigger>
                    </AccordionContent>
                </Card>
            </AccordionItem>
        </Accordion>
    );
};
