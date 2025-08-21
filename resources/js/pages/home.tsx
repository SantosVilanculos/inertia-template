import { Link } from '@inertiajs/react';
import { useRoute } from 'ziggy-js';

import { Button } from '@/components/ui/button';

export default () => {
    const route = useRoute();

    return (
        <div className="flex min-h-dvh items-center px-4 py-6">
            <div className="mx-auto grid w-full max-w-xs gap-y-6">
                <div className="grid place-content-center">
                    <Link className="block" href={route('home')} prefetch>
                        <svg
                            className="size-6 fill-black dark:fill-white"
                            viewBox="0 0 512 512"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <rect fill="currentColor" width={512} height={512} x={0} y={0} />
                        </svg>
                    </Link>
                </div>

                <Button className="w-full" asChild>
                    <Link href={route('dashboard')} prefetch>
                        Dashboard
                    </Link>
                </Button>
            </div>
        </div>
    );
};
