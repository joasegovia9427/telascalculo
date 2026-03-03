import { useState } from 'react';

import { Item } from '~/services/calculator';
import { getProcessTextSource } from '~/services/calculator/getProcessTextSource';

import { InvoiceSource } from './InvoiceSource';
import { InvoicesProcessedList } from './InvoicesProcessedList';

export const Calculator = () => {
    // const [newItem, setNewItem] = useState<string>('');

    const [list, setList] = useState<Item[]>([]);

    // const handleAdd = () => {
    //     setList([...list, newItem]);
    // };

    const handleProcessSource = (textSource: string) => {
        const processedList = getProcessTextSource(textSource);
        setList(processedList);
    };

    return (
        <div className="flex w-full flex-1 flex-col space-y-4">
            <h1>Calculator</h1>

            <InvoiceSource
                onProcessSource={(textSource: string) =>
                    handleProcessSource(textSource)
                }
            />

            <InvoicesProcessedList list={list} />
        </div>
    );
};
