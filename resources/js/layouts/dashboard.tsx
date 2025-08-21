import * as React from 'react';

import { CommandMenu } from '@/components/command-menu';

export function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div className="flex min-h-dvh flex-col">
                <div className="shrink-0"></div>

                <div className="flex-1">{children}</div>

                <div className="shrink-0"></div>
            </div>

            <CommandMenu />
        </>
    );
}
