import { Layout } from '@/layouts/dashboard';

export default ({ LARAVEL_VERSION, PHP_VERSION }: { LARAVEL_VERSION: string; PHP_VERSION: string }) => {
    return (
        <Layout>
            <div className="grid min-h-dvh place-content-center">
                <p>
                    Laravel v{LARAVEL_VERSION} (PHP v{PHP_VERSION})
                </p>
            </div>
        </Layout>
    );
};
