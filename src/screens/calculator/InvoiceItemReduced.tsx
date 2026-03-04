import { Item } from '~/services/calculator';

export const InvoiceItemReduced = ({
    groupIndex,
    item,
    index,
}: {
    groupIndex: number;
    item: Item;
    index: number;
}) => {
    return (
        <div key={item.id} className="flex flex-col">
            <p>
                {groupIndex + 1}.{index + 1}. - Item line:{' "'}
                <span className="text-gray-600 italic">
                    {item.originalLine}
                </span>
                {'"'}
                <br />
                <span className="font-bold text-gray-900">Name:</span>{' '}
                {item.props.name}
                <span className="font-bold text-gray-900"> · Type:</span>{' '}
                {item.props.type}
                <span className="font-bold text-gray-900"> · Fabric:</span>{' '}
                {item.props.fabric}
                <span className="font-bold text-gray-900"> · Color:</span>{' '}
                {item.props.color} <br />
                <span className="font-bold text-gray-900">Width:</span>{' '}
                {item.props.width}
                <span className="font-bold text-gray-900"> · Height:</span>{' '}
                {item.props.height}
                <span className="font-bold text-gray-900"> · Yards:</span>{' '}
                {item.props.yards.text}:{item.props.yards.rowValue}
                <span className="font-bold text-gray-900">
                    {' '}
                    = Ceiling:
                </span>{' '}
                <span className="font-bold text-yellow-600">
                    {item.props.yards.ceilingValue}
                </span>
            </p>
        </div>
    );
};
