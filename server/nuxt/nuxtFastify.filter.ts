import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  NotFoundException,
} from '@nestjs/common';
import { jsonRequest } from '@server/nuxt/req.helpers';
import { Nuxt } from 'nuxt';

@Catch(NotFoundException)
export class NuxtFastifyFilter implements ExceptionFilter {
  private readonly nuxt: Nuxt;

  constructor(nuxt: Nuxt) {
    this.nuxt = nuxt;
  }

  public async catch(
    exception: NotFoundException,
    host: ArgumentsHost,
  ): Promise<void> {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();
    const req = ctx.getRequest();

    if (jsonRequest(req.raw.headers)) {
      const status = exception.getStatus();
      res.status(status).send({
        message: exception.message,
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: req.url,
      });
    } else {
      const sharedReq = req.raw;
      const sharedRes = res.raw;

      sharedReq.fastifyRequest = req;
      sharedRes.fastifyReply = res;

      if (!res.headersSent) {
        await this.nuxt.render(sharedReq, sharedRes);
      }
    }
  }
}
