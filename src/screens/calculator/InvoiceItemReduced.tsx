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
                {`Name: ${item.props.name} · Type: ${item.props.type} · Fabric: ${item.props.fabric} · Color: ${item.props.color}`}
                <br />
                {`Width: ${item.props.width} · Height: ${item.props.height} · Yards ${item.props.yards.text}:${item.props.yards.rowValue} · Yards Ceiling Value: ${item.props.yards.ceilingValue}`}
            </p>
        </div>
    );
};
