import 'reflect-metadata'
import { pathPattern } from '@secjs/utils'

export enum RequestMethod {
  GET,
  POST,
  PUT,
  DELETE,
  PATCH,
  ALL,
  OPTIONS,
  HEAD,
}

export function RequestMapper(path: string | string[] = '/', method: RequestMethod = RequestMethod.GET): MethodDecorator {
  if (path.length && !path[0]) path = '/'

  path = pathPattern(path)

  return (
    target: Object,
    key: string | symbol,
    descriptor: TypedPropertyDescriptor<any>,
  ) => {
    let routes = Reflect.getMetadata('controller:routes', target.constructor)

    if (!routes) {
      Reflect.defineMetadata('controller:routes', routes = [], target.constructor)
    }

    typeof path === 'string' ? routes.push({ path, method }) : path.forEach(p => routes.push({ path: p, method }))

    Reflect.defineMetadata('controller:routes', routes, target.constructor)

    return descriptor
  }
}


export const createRequestDecorator = (method: RequestMethod) => (path?: string | string[]): MethodDecorator => RequestMapper(path, method)

export const Get = createRequestDecorator(RequestMethod.GET)
export const Post = createRequestDecorator(RequestMethod.POST)
export const Put = createRequestDecorator(RequestMethod.PUT)
export const Patch = createRequestDecorator(RequestMethod.PATCH)
export const Delete = createRequestDecorator(RequestMethod.DELETE)
export const All = createRequestDecorator(RequestMethod.ALL)
export const Options = createRequestDecorator(RequestMethod.OPTIONS)
export const Head = createRequestDecorator(RequestMethod.HEAD)
