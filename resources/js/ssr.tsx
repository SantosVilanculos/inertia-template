import { scan } from 'react-scan/all-environments';

import { createInertiaApp } from '@inertiajs/react';
import createServer from '@inertiajs/react/server';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { renderToString } from 'react-dom/server';

import { environment } from '@/lib/utils';
import { Provider } from '@/provider';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { Ziggy } from '@/ziggy';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
globalThis.Ziggy = Ziggy;

scan({
    enabled: environment.VITE_APP_DEBUG,
    animationSpeed: 'off'
});

createServer(page =>
    createInertiaApp({
        title: title => title || environment.VITE_APP_NAME,
        resolve: name => resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')),
        page,
        render: renderToString,
        setup: ({ App, props }) => <Provider children={<App {...props} />} />
    })
);
