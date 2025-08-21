import { scan } from 'react-scan/all-environments';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';

import { environment } from '@/lib/utils';
import { Provider } from '@/provider';

const { VITE_APP_NAME, VITE_APP_DEBUG } = environment;

scan({
    enabled: VITE_APP_DEBUG,
    animationSpeed: 'off'
});

createInertiaApp({
    title: title => title || VITE_APP_NAME,
    resolve: name => resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')),
    setup: ({ el, App, props }) => {
        createRoot(el).render(<Provider children={<App {...props} />} />);
    }
});
