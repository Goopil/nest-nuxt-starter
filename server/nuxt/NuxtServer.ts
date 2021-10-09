import { Logger } from '@nestjs/common';
import { NuxtConfig } from '@nuxt/types';
import {
  IncomingMessage,
  NextFunction,
  Server as ConnectServer,
} from 'connect';
import { ServerResponse } from 'http';

import { Builder, Nuxt } from 'nuxt';
import { config } from './nuxt.config';

const log = new Logger('NuxtServer');

export class NuxtServer {
  private static instance: NuxtServer;
  public nuxt!: Nuxt;

  public static getInstance(): NuxtServer {
    if (!this.instance) {
      this.instance = new NuxtServer();
    }

    return this.instance;
  }

  public async run(shouldBuild: boolean = true): Promise<Nuxt> {
    const willBuild = config.dev && shouldBuild;

    if (this.nuxt) {
      log.debug('reusing');
      return this.nuxt;
    }

    log.debug('creating');
    this.nuxt = new Nuxt(config as NuxtConfig);
    await this.nuxt.ready();

    this.init(this.nuxt);

    // Build only in dev mode
    if (willBuild) {
      log.debug('building');
      const builder = new Builder(this.nuxt);
      await builder.build();
    }

    return this.nuxt;
  }

  async close(): Promise<void> {
    if (this.nuxt) {
      await this.nuxt.close();
    }
  }

  private init(nuxt: Nuxt): Nuxt {
    nuxt.hook('render:route', (url: string) => {
      log.debug(`path called ${url}`);
    });

    nuxt.hook('render:errorMiddleware', (app: ConnectServer) =>
      app.use(
        (
          err: Error,
          req: IncomingMessage,
          res: ServerResponse,
          next: NextFunction,
        ) => {
          log.error(err.message, err.stack);
          next(err);
        },
      ),
    );

    return nuxt;
  }
}
