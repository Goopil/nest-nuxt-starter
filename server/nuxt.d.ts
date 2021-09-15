 // waiting on this https://github.com/nuxt/nuxt.js/issues/7651

 declare module 'nuxt' {
     import {NuxtConfig} from '@nuxt/types';
     import {NuxtOptionsHooks} from '@nuxt/types/config'
     import {IncomingMessage} from 'connect';
     import {ServerResponse} from 'http';

     declare class Nuxt {
         constructor(config: NuxtConfig)
         async ready (): Promise<void>
         async close (): Promise<void>
         hook(hookName: string, cb: NuxtOptionsHooks.render): void
         async render(req: IncomingMessage, res: ServerResponse): Promise<void>
     }

     // tslint:disable-next-line:max-classes-per-file
     declare class Builder {
         constructor(nuxt: Nuxt)
         async build (): Promise<{nuxt: Nuxt}>
     }
 }
