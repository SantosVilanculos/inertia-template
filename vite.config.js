import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import { run } from 'vite-plugin-run';

export default defineConfig({
    plugins: [
        laravel({
            input: ['./resources/css/app.css', './resources/js/app.tsx'],
            ssr: './resources/js/ssr.tsx',
            refresh: true
        }),
        react(),
        tailwindcss(),
        run({
            input: [
                {
                    run: ['php', 'artisan', 'ziggy:generate', '--types'],
                    pattern: ['./bootstrap/app.php', './config/ziggy.php', './routes/**/*.php']
                },
                {
                    build: false,
                    run: ['php', 'artisan', 'ide-helper:generate']
                },
                {
                    run: ['php', 'artisan', 'ide-helper:models', '-N'],
                    pattern: ['./app/Models/**/*.php']
                }
            ]
        })
    ],
    resolve: {
        alias: {
            '@': resolve(import.meta.dirname, './resources/js'),
            'ziggy-js': resolve(import.meta.dirname, './vendor/tightenco/ziggy')
        }
    },
    esbuild: {
        jsx: 'automatic'
    }
});
