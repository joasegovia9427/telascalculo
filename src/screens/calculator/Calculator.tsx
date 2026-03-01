import {
    ArrowDownWideNarrowIcon,
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
import { Item } from '~/services/calculator';
import { getProcessTextSource } from '~/services/calculator/getProcessTextSource';

const textExample = `1. Máster Left - Genesis Blackout White
34 3/4 x 60 1/4 (Manual L)
2. Master Right - Genesis Blackout White
34 7/8 x 60 1/2 (Manual R)
3. Living Room - Genesis Blackout White
35 x 60 3/8 (Manual R)
4. Room 1 - Genesis Blackout White
34 3/4 x 60 1/2 (Manual R)
5. Room 2 - Genesis Blackout White
34 3/4 x 60 1/4 (Manual R)
6. Sliding Door - Genesis Blackout White
94 5/8 X 78 1/8 (2,1)
BB: 93 1/2 (Motorized LR)
`;

export const Calculator = () => {
    // const [newItem, setNewItem] = useState<string>('');
    const [textSource, setTextSource] = useState<string>(textExample);
    const [list, setList] = useState<Item[]>([]);

    // const handleAdd = () => {
    //     setList([...list, newItem]);
    // };

    const handleProcessSource = () => {
        // console.log('process source');
        const processedList = getProcessTextSource(textSource);
        // console.log('processedList:: ', processedList);
        setList(processedList);
    };

    return (
        <div className="flex flex-col">
            <h1>Calculator</h1>

            <Card>
                <CardHeader className="flex flex-row items-center">
                    <CardTitle>Source</CardTitle>
                    <CardDescription>
                        <p className="my-auto">Add source items</p>
                    </CardDescription>
                </CardHeader>
                <div className="flex justify-between gap-2">
                    <div className="h-full flex-1">
                        <Card>
                            <p>Image source:</p>
                        </Card>
                    </div>
                    <div className="h-full flex-1">
                        <Card className="flex flex-col items-start gap-2">
                            <p>Text input source:</p>
                            <Textarea
                                value={textSource}
                                onChange={e => setTextSource(e.target.value)}
                                className="h-70"
                            />
                        </Card>
                    </div>
                </div>

                <Button onClick={handleProcessSource}>
                    Process Source
                    <ArrowDownWideNarrowIcon />
                </Button>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center">
                    <CardTitle>Items</CardTitle>
                    <CardDescription>
                        <p className="my-auto">{list.length} items found</p>
                    </CardDescription>
                </CardHeader>
                <div>
                    <ul className="items-start divide-y divide-gray-900">
                        {list.map(item => (
                            <div key={item.id} className="flex flex-col pt-1">
                                <p>Item line: {item.originalLine}</p>
                                <div className="-x flex flex-row items-center gap-2 divide-gray-900">
                                    <p>Name:</p>
                                    <p className="text-bold rounded-md bg-gray-300 p-2">
                                        {item.props.name}
                                    </p>
                                    <p className="ml-5">Type:</p>
                                    <p className="text-bold rounded-md bg-gray-300 p-2">
                                        {item.props.type}
                                    </p>
                                </div>
                                <div className="flex flex-row items-center gap-2">
                                    <p>Width:</p>
                                    <p className="text-bold rounded-md bg-gray-300 p-2">
                                        {item.props.width}
                                    </p>
                                    <p className="ml-5">Height:</p>
                                    <p className="text-bold rounded-md bg-gray-300 p-2">
                                        {item.props.height}
                                    </p>
                                    <p className="ml-5">{`Yards ${item.props.yards.text}:`}</p>
                                    <p className="text-bold rounded-md bg-gray-300 p-2">
                                        {item.props.yards.rowValue}
                                    </p>
                                    <p className="ml-5">{`Yards Ceiling Value:`}</p>
                                    <p className="text-bold rounded-md bg-gray-300 p-2">
                                        {item.props.yards.ceilingValue}
                                    </p>
                                </div>
                            </div>
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
            </Card>
        </div>
    );
};
