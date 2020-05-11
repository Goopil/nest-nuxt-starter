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

    // const app = await NestFactory.create(ApplicationModule);
    // app.useGlobalFilters(new NuxtExpressFilter(nuxt));

    const app = await NestFactory.create<NestFastifyApplication>(
      ApplicationModule,
      new FastifyAdapter(),
    );

    if (!config.dev) {
      app.enableShutdownHooks();
    }

    app.useGlobalFilters(new NuxtFastifyFilter(nuxt));

    await app.listen(config.env.port as number, config.env.host, () => {
      log.log(`Server listening at ${config.env.host}:${config.env.port}`);
      log.log(`Server listening at ${config.env.domain}`);
    });

    if (module.hot) {
      module.hot.accept();
      module.hot.dispose(() => app.close());
    }

    process.on('SIGTERM', async () => {
      log.log('[SIGTERM] received, closing app');

      await nuxt.close();
      await app.close();

      log.log('[SIGTERM] App closed');
    });

    process.on('SIGINT', async () => {
      log.log('[SIGINT] received, closing app');

      await nuxt.close();
      await app.close();

      log.log('[SIGINT] App closed');
    });
  } catch (e) {
    log.error(e.message, e.trace);
  }
})();
