import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';

import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { NuxtFastifyFilter } from './nuxt/nuxtFastify.filter';

// import { NuxtExpressFilter } from './nuxt/nuxtExpress.filter';

import { NuxtServer } from './nuxt';
import config from '../nuxt.config';

import { ApplicationModule } from './application.module';

const log = new Logger('Bootstrap');

declare const module: any;

(async function bootstrap() {
  try {
    const nuxt = await NuxtServer.getInstance().run(
      config.dev ? !module.hot._main : true,
    );

    const app = await NestFactory.create<NestFastifyApplication>(ApplicationModule, new FastifyAdapter());
    app.useGlobalFilters(new NuxtFastifyFilter(nuxt));

    // const app = await NestFactory.create(ApplicationModule);
    // app.useGlobalFilters(new NuxtExpressFilter(nuxt));

    if (!config.dev) {
      app.enableShutdownHooks();

      const signals = ['SIGTERM', 'SIGINT'] as const;
      signals.forEach(signal => {
        process.on(signal, async () => {
          log.log(`[${signal}] received, closing App`);

          await nuxt.close();
          await app.close();

          log.log(`[${signal}] App closed`);
        });
      })
    }

    if (module.hot) {
      module.hot.accept();
      module.hot.dispose(() => app.close());
    }

    await app.listen(config.env.port as number, config.env.host, () => {
      log.log(`Server listening at ${config.env.host}:${config.env.port}`);
      log.log(`Server listening at ${config.env.domain}`);
    });
  } catch (e) {
    log.error(e.message, e.trace);
  }
})();
