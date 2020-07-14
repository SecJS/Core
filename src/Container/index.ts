import Express, { Request, Response, NextFunction } from 'express'
import { createNamespace } from 'cls-hooked'
import { uuid } from 'uuidv4'

export default class Container {
  private $ns: any
  private $services: any
  private $singletons: any

  static get proxy(): any {
    return {
      get(instance: any, property: any): any {
        if (instance.$services.has(property)) {
          return instance.get(property)
        }

        return instance[property]
      },
    }
  }

  static create(definitions: any = [], namespace?: any): any {
    namespace = namespace || createNamespace(uuid())

    const container = new Container(namespace)
    const express = Express()

    express.set('services', container)

    express.use((req: Request, res: Response, next: NextFunction) => {
      namespace.bindEmitter(req)
      namespace.bindEmitter(res)

      namespace.run(() => {
        next()
      })
    })

    definitions.forEach((definition: any) => {
      const { name, factory, dependencies, options } = definition

      container.register(name, factory, dependencies, options)
    })

    container.register('express', () => express)

    return container
  }

  constructor(namespace: any) {
    this.$ns = namespace
    this.$services = new Map()
    this.$singletons = new Map()

    return new Proxy(this, Container.proxy)
  }

  register(
    name: string,
    definition: object,
    dependencies?: [],
    options?: object,
  ): any {
    options = Object.assign(
      {
        singleton: true,
        scoped: false,
      },
      options,
    )

    this.$services.set(name, {
      definition,
      dependencies,
      ...options,
    })
  }

  get(name: string): any {
    const service = this.$services.get(name)

    if (!service) {
      throw new Error(`Service ${name} has not been registered`)
    }

    if (typeof service.definition === 'function') {
      if (service.singleton) {
        let instance

        if (service.scoped && this.$ns.active) {
          instance = this.$ns.get(name)

          if (!instance) {
            instance = this.factory(service)
            this.$ns.set(name, instance)
          }
        } else {
          instance = this.$singletons.get(name)

          if (!instance) {
            instance = this.factory(service)
            this.$singletons.set(name, instance)
          }
        }

        return instance
      }

      return this.factory(service)
    }

    return service.definition
  }

  resolveDeps(service: any): any {
    let deps = []

    if (service.dependencies) {
      deps = service.dependencies.map((dep: any) => {
        return this.get(dep)
      })
    }

    return deps
  }

  factory(service: any): any {
    const Constructor = service.definition

    if (
      typeof Constructor.prototype !== 'undefined' &&
      Constructor.prototype.constructor
    ) {
      return new Constructor(...this.resolveDeps(service))
    }

    return Constructor(...this.resolveDeps(service))
  }

  reset(): any {
    this.$singletons = new Map()
  }
}
