import {
  ExceptionFilter,
  HttpException,
  ArgumentsHost,
  Catch,
} from '@nestjs/common';
import { Nuxt } from 'nuxt';

@Catch()
export class NuxtFastifyFilter implements ExceptionFilter {
  private readonly nuxt: Nuxt;

  private sharedProps = ['session'];

  constructor(nuxt: Nuxt) {
    this.nuxt = nuxt;
  }

  public async catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();
    const req = ctx.getRequest();
    const status = exception.getStatus();

    const sharedReq = req.raw;

    this.sharedProps.forEach((key) => {
      sharedReq[key] = req[key];
    });

    if (status === 404) {
      if (!res.headersSent) {
        await this.nuxt.render(sharedReq, res.res);
      }
    } else {
      res.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: req.url,
      });
    }
  }
}
