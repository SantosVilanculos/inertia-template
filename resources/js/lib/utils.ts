import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { z } from 'zod';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const environment = z
    .object({
        VITE_APP_DEBUG: z.stringbool(),
        VITE_APP_ENV: z.enum(['local', 'testing', 'production']),
        VITE_APP_LOCALE: z.enum(['en', 'pt_PT']),
        VITE_APP_NAME: z.string(),
        VITE_APP_TIMEZONE: z.literal('UTC'),
        VITE_APP_URL: z.url()
    })
    .parse({
        VITE_APP_DEBUG: import.meta.env.VITE_APP_DEBUG,
        VITE_APP_ENV: import.meta.env.VITE_APP_ENV,
        VITE_APP_LOCALE: import.meta.env.VITE_APP_LOCALE,
        VITE_APP_NAME: import.meta.env.VITE_APP_NAME,
        VITE_APP_TIMEZONE: import.meta.env.VITE_APP_TIMEZONE,
        VITE_APP_URL: import.meta.env.VITE_APP_URL
    });
