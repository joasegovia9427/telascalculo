import { twm } from '~/lib/utils';
import { Item } from '~/services/calculator';

export const InvoiceItem = ({ item, index }: { item: Item; index: number }) => {
    return (
        <div key={item.id} className="flex flex-col pt-1">
            <p>
                ({index + 1}) - Item line: {item.originalLine}
            </p>
            <div className="flex flex-col items-start gap-2 divide-gray-900 sm:flex-row sm:items-center">
                <div className="flex flex-row items-center gap-2">
                    <p>Name:</p>
                    <p className="text-bold rounded-md bg-gray-200 p-2">
                        {item.props.name}
                    </p>
                </div>
                <div className="flex flex-row items-center gap-2">
                    <p>Type:</p>
                    <p
                        className={twm(
                            'text-bold rounded-md bg-gray-200 p-2 capitalize',
                            item.props.type === 'unknown'
                                ? 'bg-red-400'
                                : 'bg-gray-200'
                        )}
                    >
                        {item.props.type}
                    </p>
                </div>

                <div className="flex flex-row items-center gap-2">
                    <p>Fabric:</p>
                    <p
                        className={twm(
                            'text-bold rounded-md bg-gray-200 p-2 capitalize',
                            item.props.fabric === 'unknown'
                                ? 'bg-red-400'
                                : 'bg-gray-200'
                        )}
                    >
                        {item.props.fabric}
                    </p>
                </div>

                <div className="flex flex-row gap-2">
                    <p>Color:</p>
                    <p
                        className={twm(
                            'text-bold rounded-md bg-gray-200 p-2',
                            item.props.color === 'unknown'
                                ? 'bg-red-400'
                                : 'bg-gray-200'
                        )}
                    >
                        {item.props.color}
                    </p>
                </div>
            </div>
            <div className="flex flex-row flex-wrap items-center gap-2">
                <p>Width:</p>
                <p
                    className={twm(
                        'text-bold rounded-md bg-gray-200 p-2',
                        item.props.width === 0 ? 'bg-red-400' : 'bg-gray-200'
                    )}
                >
                    {item.props.width}
                </p>
                <p className="sm:ml-5">Height:</p>
                <p
                    className={twm(
                        'text-bold rounded-md bg-gray-200 p-2',
                        item.props.height === 0 ? 'bg-red-400' : 'bg-gray-200'
                    )}
                >
                    {item.props.height}
                </p>
                <p className="sm:ml-5">{`Yards ${item.props.yards.text}:`}</p>
                <p className="text-bold rounded-md bg-gray-200 p-2">
                    {item.props.yards.rowValue}
                </p>
                <div className="flex flex-row items-center gap-2">
                    <p className="sm:ml-5">{`Yards Ceiling Value:`}</p>
                    <p className="text-bold rounded-md bg-gray-200 p-2">
                        {item.props.yards.ceilingValue}
                    </p>
                </div>
            </div>
        </div>
    );
};
