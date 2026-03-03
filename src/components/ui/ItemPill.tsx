export const ItemPill = ({
    label,
    value,
}: {
    label: string;
    value: string | number;
}) => {
    return (
        <div className="flex flex-row items-center gap-2">
            <p>{label}:</p>
            <p className="text-bold bg-gray-200' rounded-md bg-gray-200 p-2 capitalize">
                {value}
            </p>
        </div>
    );
};
