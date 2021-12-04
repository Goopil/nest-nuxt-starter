import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

import { ApplicationModule } from './application.module';
import { config } from './nuxt/nuxt.config';

// import {NuxtExpressFilter} from './nuxt/nuxtExpress.filter';
import { NuxtFastifyFilter } from './nuxt/nuxtFastify.filter';
import { NuxtServer } from './nuxt/NuxtServer';

const log = new Logger('Bootstrap');

declare const module: any;

(async function bootstrap() {
  try {
    const shouldBuild = config.dev ? module.hot._main : false;
    const nuxt = await NuxtServer.getInstance().run(shouldBuild);
    const fastify = new FastifyAdapter();

    const app = await NestFactory.create<NestFastifyApplication>(
      ApplicationModule,
      fastify,
      { bufferLogs: true },
    );
    app.useGlobalFilters(new NuxtFastifyFilter(nuxt));

    // const app = await NestFactory.create(ApplicationModule, {bufferLogs: true});
    // app.useGlobalFilters(new NuxtExpressFilter(nuxt));

    app.useLogger(log);
    app.enableShutdownHooks();

    const signals = ['SIGINT'] as const;
    signals.forEach((signal) => {
      const listener = async () => {
        log.log(`[${signal}] received, closing App`);

        await Promise.allSettled([nuxt.close()]);

        log.log(`[${signal}] App closed`);

        process.off(signal, listener);

        return Promise.resolve();
      };

      process.on(signal, listener);
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
