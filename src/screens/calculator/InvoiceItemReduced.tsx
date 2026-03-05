import { twm } from '~/lib/utils';
import { Item } from '~/services/calculator';

const GROUP_CODE_COLORS = {
    A: 'bg-blue-800',
    B: 'bg-green-600',
    C: 'bg-yellow-600',
    D: 'bg-red-600',
    E: 'bg-purple-600',
    F: 'bg-pink-600',
    G: 'bg-orange-600',
    H: 'bg-teal-600',
    I: 'bg-indigo-600',
    J: 'bg-lime-600',
    K: 'bg-cyan-600',
    L: 'bg-fuchsia-600',
    M: 'bg-violet-600',
    N: 'bg-rose-600',
    O: 'bg-amber-600',
    P: 'bg-emerald-600',
    Q: 'bg-sky-600',
    R: 'bg-rose-600',
    S: 'bg-amber-600',
    T: 'bg-emerald-600',
    U: 'bg-sky-600',
    V: 'bg-rose-600',
    W: 'bg-amber-600',
    X: 'bg-emerald-600',
    Y: 'bg-sky-600',
    Z: 'bg-rose-600',
    AA: 'bg-amber-600',
    AB: 'bg-emerald-600',
    AC: 'bg-sky-600',
    AD: 'bg-rose-600',
    AE: 'bg-amber-600',
    AF: 'bg-emerald-600',
    AG: 'bg-sky-600',
};

export const InvoiceItemReduced = ({
    groupIndex,
    item,
    index,
}: {
    groupIndex: number;
    item: Item & { groupCode: string };
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
                <span className="bold text-lg text-black italic">
                    {' · '} Group code:{' '}
                </span>
                <span
                    className={twm(
                        'rounded px-1.5 py-0.5 font-mono text-sm text-white',
                        GROUP_CODE_COLORS[
                            item.groupCode as keyof typeof GROUP_CODE_COLORS
                        ]
                    )}
                >
                    {item.groupCode}
                </span>
            </p>
        </div>
    );
};
