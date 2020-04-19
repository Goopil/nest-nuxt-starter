import { Nuxt, Builder } from 'nuxt';

import config from '../../nuxt.config';

import { Logger } from '@nestjs/common';

const log = new Logger('NuxtServer');

export default class NuxtServer {
  private static instance: NuxtServer;
  public nuxt: Nuxt;

  public async run(shouldBuild: boolean = true): Nuxt {
    const willBuild = config.dev && shouldBuild;
    const nuxt = new Nuxt(config);
    await nuxt.ready();

    // Build only in dev mode
    if (willBuild) {
      log.debug('building');
      const builder = new Builder(nuxt);
      const res = await builder.build();
      this.nuxt = res.nuxt;

      return this.init(res.nuxt);
    }

    if (this.nuxt) {
      log.debug('reusing');
      return this.nuxt;
    }

    log.debug('fresh instance');
    return this.init(nuxt);
  }

  public static getInstance(): NuxtServer {
    if (this.instance) {
      return this.instance;
    } else {
      this.instance = new NuxtServer();
      return this.instance;
    }
  }

  private init(nuxt: Nuxt): Nuxt {
    nuxt.hook('render:setupMiddleware', (app) =>
      app.use((req, res, next) => {
        log.debug(`path called ${req.url}`);
        next();
      }),
    );

    nuxt.hook('render:errorMiddleware', (app) =>
      app.use((err, req, res, next) => {
        log.error(err.message, err.stack);
        next(err);
      }),
    );

    return nuxt;
  }

  async close() {
    if (this.nuxt) {
      await this.nuxt.close();
    }
  }
}
