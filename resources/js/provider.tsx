import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider } from 'next-themes';
import { NuqsAdapter } from 'nuqs/adapters/react';
import * as React from 'react';

import { Toaster } from '@/components/ui/sonner';
import { environment } from '@/lib/utils';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: Infinity
        }
    }
});

export function Provider({ children }: { children: React.ReactNode }) {
    return (
        <NuqsAdapter>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider enableSystem disableTransitionOnChange defaultTheme="system" attribute="class">
                    {children}
                    <Toaster position="bottom-center" />
                </ThemeProvider>
                {environment.VITE_APP_DEBUG ? <ReactQueryDevtools buttonPosition="top-right" /> : null}
            </QueryClientProvider>
        </NuqsAdapter>
    );
}
