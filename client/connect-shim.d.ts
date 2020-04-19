import { FastifyRequest, FastifyReply } from 'fastify';

/**
 * extending nuxt req
 */
declare module 'connect' {
  export interface IncomingMessage {
    fastifyRequest: FastifyRequest;
  }
}

/**
 * extending nuxt res
 */
declare module 'http' {
  export interface ServerResponse {
    fastifyReply: FastifyReply<ServerResponse>;
  }
}
