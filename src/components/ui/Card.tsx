import * as React from 'react';

import { twm } from '~/lib/utils';

function Card({ className, ...props }: React.ComponentProps<'div'>) {
    return (
        <div
            data-slot="card"
            className={twm(
                'bg-card text-card-foreground mb-3 flex flex-col gap-3 divide-y divide-gray-200 rounded-xl border border-gray-200 p-2 shadow-md sm:p-6',
                className
            )}
            {...props}
        />
    );
}

function CardHeader({ className, ...props }: React.ComponentProps<'div'>) {
    return (
        <div
            data-slot="card-header"
            className={twm(
                '@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6',
                className
            )}
            {...props}
        />
    );
}

function CardTitle({ className, ...props }: React.ComponentProps<'div'>) {
    return (
        <div
            data-slot="card-title"
            className={twm('text-xl font-semibold', className)}
            {...props}
        />
    );
}

function CardDescription({ className, ...props }: React.ComponentProps<'div'>) {
    return (
        <div
            data-slot="card-description"
            className={twm('text-muted-foreground text-sm', className)}
            {...props}
        />
    );
}

function CardAction({ className, ...props }: React.ComponentProps<'div'>) {
    return (
        <div
            data-slot="card-action"
            className={twm(
                'col-start-2 row-span-2 row-start-1 self-start justify-self-end',
                className
            )}
            {...props}
        />
    );
}

function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
    return (
        <div
            data-slot="card-content"
            className={twm('px-3 sm:px-6', className)}
            {...props}
        />
    );
}

function CardFooter({ className, ...props }: React.ComponentProps<'div'>) {
    return (
        <div
            data-slot="card-footer"
            className={twm(
                'flex items-center px-3 sm:px-6 [.border-t]:pt-6',
                className
            )}
            {...props}
        />
    );
}

export {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
};
