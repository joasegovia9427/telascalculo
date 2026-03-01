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
        <Card>
            <CardHeader className="flex flex-row items-center">
                <CardTitle>Source</CardTitle>
                <CardDescription>
                    <p className="my-auto">Add source items</p>
                </CardDescription>
            </CardHeader>
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
                            onChange={e => setTextSource(e.target.value)}
                            className="h-70"
                        />
                    </Card>
                </div>
            </div>

            <Button onClick={() => onProcessSource(textSource)}>
                Process Source
                <ArrowDownWideNarrowIcon />
            </Button>
        </Card>
    );
};
