import { router } from '@inertiajs/core';
import { HomeIcon, LaptopMinimalIcon, MoonIcon, Square, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import * as React from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { toast } from 'sonner';
import { useRoute } from 'ziggy-js';

import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList
} from '@/components/ui/command';
import { useCommandMenuStore } from '@/stores';

export function CommandMenu() {
    const route = useRoute();
    const { setTheme } = useTheme();

    const { open, setOpen } = useCommandMenuStore(state => state);

    useHotkeys(['ctrl+k'], () => setOpen(!open), {
        enableOnFormTags: true,
        preventDefault: true
    });

    const execute = React.useCallback((callback: () => void) => {
        setOpen(false);
        callback();
    }, []);

    return (
        <CommandDialog open={open} onOpenChange={setOpen} showCloseButton={false}>
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>

                <CommandGroup heading="Lorem, ipsum.">
                    <CommandItem onSelect={() => execute(() => router.visit(route('home')))}>
                        <HomeIcon />
                        <span>Dashboard</span>
                    </CommandItem>
                    <CommandItem onSelect={value => execute(() => toast.info(value))}>
                        <Square />
                        <span>Lorem, ipsum.</span>
                    </CommandItem>
                </CommandGroup>

                <CommandGroup heading="Lorem, ipsum.">
                    <CommandItem onSelect={() => execute(() => setTheme('light'))}>
                        <SunIcon />
                        <span>Light</span>
                    </CommandItem>
                    <CommandItem onSelect={() => execute(() => setTheme('light'))}>
                        <MoonIcon />
                        <span>Moon</span>
                    </CommandItem>
                    <CommandItem onSelect={() => execute(() => setTheme('system'))}>
                        <LaptopMinimalIcon />
                        <span>System</span>
                    </CommandItem>
                </CommandGroup>
            </CommandList>
        </CommandDialog>
    );
}
