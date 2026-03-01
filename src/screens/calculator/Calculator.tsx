import { useState } from 'react';

import { Card, CardDescription, CardHeader, CardTitle } from '~/components/ui';
import { Item } from '~/services/calculator';
import { getProcessTextSource } from '~/services/calculator/getProcessTextSource';

import { InvoiceItem } from './InvoiceItem';
import { InvoiceSource } from './InvoiceSource';

export const Calculator = () => {
    // const [newItem, setNewItem] = useState<string>('');

    const [list, setList] = useState<Item[]>([]);

    // const handleAdd = () => {
    //     setList([...list, newItem]);
    // };

    const handleProcessSource = (textSource: string) => {
        // console.log('process source');
        const processedList = getProcessTextSource(textSource);
        // console.log('processedList:: ', processedList);
        setList(processedList);
    };

    return (
        <div className="flex w-full flex-1 flex-col">
            <h1>Calculator</h1>

            <InvoiceSource
                onProcessSource={(textSource: string) =>
                    handleProcessSource(textSource)
                }
            />

            <Card>
                <CardHeader className="flex flex-row items-center">
                    <CardTitle>Items</CardTitle>
                    <CardDescription>
                        <p className="my-auto">{list.length} items found</p>
                    </CardDescription>
                </CardHeader>
                <div>
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
            </Card>
        </div>
    );
};
