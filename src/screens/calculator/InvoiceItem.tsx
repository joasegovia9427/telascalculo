import { twm } from '~/lib/utils';
import { Item } from '~/services/calculator';

export const InvoiceItem = ({ item, index }: { item: Item; index: number }) => {
    return (
        <div key={item.id} className="flex flex-col pt-1 text-xs lg:text-sm">
            <p>
                ({index + 1}) - Item line: {item.originalLine}
            </p>
            <div className="flex flex-row flex-wrap items-start gap-1 divide-gray-900 sm:items-center">
                <p>Name: </p>
                <p className="text-bold rounded-md bg-gray-200 p-1">
                    {item.props.name}
                </p>

                <p>Type:</p>
                <p
                    className={twm(
                        'text-bold rounded-md bg-gray-200 p-1 capitalize',
                        item.props.type === 'unknown'
                            ? 'bg-red-400'
                            : 'bg-gray-200'
                    )}
                >
                    {item.props.type}
                </p>
                <p>Fabric:</p>
                <p
                    className={twm(
                        'text-bold rounded-md bg-gray-200 p-1 capitalize',
                        item.props.fabric === 'unknown'
                            ? 'bg-red-400'
                            : 'bg-gray-200'
                    )}
                >
                    {item.props.fabric}
                </p>

                <p>Color:</p>
                <p
                    className={twm(
                        'text-bold rounded-md bg-gray-200 p-1',
                        item.props.color === 'unknown'
                            ? 'bg-red-400'
                            : 'bg-gray-200'
                    )}
                >
                    {item.props.color}
                </p>
            </div>
            <div className="flex flex-row flex-wrap items-center gap-0 lg:gap-1">
                <p>Width:</p>
                <p
                    className={twm(
                        'text-bold rounded-md bg-gray-200 p-1',
                        item.props.width === 0 ? 'bg-red-400' : 'bg-gray-200'
                    )}
                >
                    {item.props.width}
                </p>
                <p className="ml-2">Height:</p>
                <p
                    className={twm(
                        'text-bold rounded-md bg-gray-200 p-1',
                        item.props.height === 0 ? 'bg-red-400' : 'bg-gray-200'
                    )}
                >
                    {item.props.height}
                </p>
                <p className="ml-2 text-gray-600 italic">{`Yards ${item.props.yards.text}:`}</p>
                <p className="text-bold rounded-md bg-gray-200 p-1">
                    {item.props.yards.rowValue}
                </p>
                <div className="flex flex-row items-center gap-2">
                    <p className="ml-2">{`Yards Ceiling Value:`}</p>
                    <p className="text-bold rounded-md bg-gray-200 p-1">
                        {item.props.yards.ceilingValue}
                    </p>
                </div>
            </div>
        </div>
    );
};
