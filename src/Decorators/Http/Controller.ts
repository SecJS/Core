import { pathPattern } from '@secjs/utils'

export function Controller(path?: string | string[]): ClassDecorator {
  if (!path) path = '/'

  path = pathPattern(path)

  return (target: any) => {
    const routes: any[] = Reflect.getMetadata('controller:routes', target)

    if (routes && routes.length) {
      if (Array.isArray(path)) {
        const routesPrefixed = []

        path.forEach(p => {
          if (p === '/') return

          routes.forEach(route =>
            routesPrefixed.push({
              path: `${p}${route.path}`,
              method: route.method,
            }),
          )
        })

        Reflect.defineMetadata('controller:routes', routesPrefixed, target)
      } else {
        const routesPrefixed =
          path === '/'
            ? routes
            : routes.filter(route => (route.path = `${path}${route.path}`))

        Reflect.defineMetadata('controller:routes', routesPrefixed, target)
      }
    }

    Reflect.defineMetadata(
      'controller:path',
      typeof path === 'string' ? [path] : path,
      target,
    )
  }
}
