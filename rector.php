<?php

declare(strict_types=1);

use Rector\Config\RectorConfig;
use Rector\Php70\Rector\StaticCall\StaticCallOnNonStaticToInstanceCallRector;
use Rector\Php81\Rector\Array_\FirstClassCallableRector;

return RectorConfig::configure()
    ->withPaths([
        __DIR__.'/app',
        __DIR__.'/bootstrap/app.php',
        __DIR__.'/bootstrap/providers.php',
        __DIR__.'/config',
        __DIR__.'/database',
        __DIR__.'/public/index.php',
        __DIR__.'/routes',
        __DIR__.'/tests',
    ])
    ->withPhpSets()
    ->withPreparedSets(
        deadCode: true,
        codeQuality: true,
        typeDeclarations: true,
        privatization: true,
        earlyReturn: true,
        strictBooleans: true,
    )
    ->withSkip([
        FirstClassCallableRector::class,
        StaticCallOnNonStaticToInstanceCallRector::class,
    ]);
