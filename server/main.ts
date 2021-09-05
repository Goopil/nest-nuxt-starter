import {Logger} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';

import {FastifyAdapter, NestFastifyApplication} from '@nestjs/platform-fastify';
import config from '../nuxt.config';

import {ApplicationModule} from './application.module';
import {NuxtServer} from './nuxt';
import {NuxtFastifyFilter} from './nuxt/nuxtFastify.filter';

// import { NuxtExpressFilter } from './nuxt/nuxtExpress.filter';

const log = new Logger('Bootstrap');

declare const module: any;

(async function bootstrap() {
    try {
        const shouldBuild = config.dev ? !module.hot._main : false;
        const nuxt = await NuxtServer.getInstance().run(shouldBuild);
        const fastify = new FastifyAdapter()

        const app = await NestFactory.create<NestFastifyApplication>(ApplicationModule, fastify, {bufferLogs: true});
        app.useGlobalFilters(new NuxtFastifyFilter(nuxt));
        app.useLogger(log);
        // const app = await NestFactory.create(ApplicationModule);
        // app.useGlobalFilters(new NuxtExpressFilter(nuxt));

        if (!config.dev) {
            app.enableShutdownHooks();

            const signals = ['SIGTERM', 'SIGINT'] as const;
            signals.forEach(signal => {
                process.on(signal, async () => {
                    log.log(`[${signal}] received, closing App`);

                    await Promise.all([
                        nuxt.close(),
                        app.close()
                    ])

                    log.log(`[${signal}] App closed`);
                });
            });
        }

        await app.listen(config.env.port as number, config.env.host, () => {
            log.log(`Server listening at ${config.env.host}:${config.env.port}`);
            log.log(`Server listening at ${config.env.domain}`);
        });

        if (module.hot) {
            module.hot.accept();
            module.hot.dispose(() => app.close());
        }
    } catch (e) {
        log.error(e.message, e.trace);
    }
})();
