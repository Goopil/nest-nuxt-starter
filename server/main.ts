import {Logger} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';

import {FastifyAdapter, NestFastifyApplication} from '@nestjs/platform-fastify';
import {config} from './nuxt/nuxt.config';

import {ApplicationModule} from './application.module';
import {NuxtServer} from './nuxt/NuxtServer';
import {NuxtFastifyFilter} from './nuxt/nuxtFastify.filter';

// import { NuxtExpressFilter } from './nuxt/nuxtExpress.filter';

const log = new Logger('Bootstrap');

declare const module: any;

(async function bootstrap() {
    try {
        const shouldBuild = config.dev ? module.hot._main : false;
        const nuxt = await NuxtServer.getInstance().run(shouldBuild);
        const fastify = new FastifyAdapter()

        const app = await NestFactory.create<NestFastifyApplication>(ApplicationModule, fastify, {bufferLogs: true});
        app.useGlobalFilters(new NuxtFastifyFilter(nuxt));

        // const app = await NestFactory.create(ApplicationModule);
        // app.useGlobalFilters(new NuxtExpressFilter(nuxt));

        app.useLogger(log);
        app.enableShutdownHooks();

        const signals = ['SIGTERM', 'SIGINT'] as const;
        signals.forEach(signal => {
            process.on(signal, async () => {
                log.log(`[${signal}] received, closing App`);

                await Promise.allSettled([
                    nuxt.close(),
                    app.close()
                ])

                log.log(`[${signal}] App closed`);

                return Promise.resolve();
            });
        });

        await app.listen(config?.env.port, config?.env.host, () => {
            log.log(`Server listening at ${config?.env.host}:${config.env.port}`);
        });

        if (module.hot) {
            module.hot.accept();
            module.hot.dispose(() => app.close());
        }
    } catch (e: any) {
        log.error(e.message, e.trace);
    }
})();
