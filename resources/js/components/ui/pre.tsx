import * as React from 'react';

export function Pre({ children }: { children: React.ReactNode }) {
    return <pre className="font-mono text-sm break-all whitespace-pre-wrap">{children}</pre>;
}
