import Container from '../../../src/Container'
import { Assert, test } from '../../stub/types'
import request from 'supertest'

class TestService {
  private parent: any

  constructor(parent: any) {
    this.parent = parent
  }

  getFoo () {
    return this.parent.foo
  }
}

test.group('IoC Container', () => {
  test('it should use proxy', async (assert: Assert) => {
    const services = Container.create()

    services.register('foo', 'bar')

    assert.equal(services.foo, services.get('foo'))
  })

  test('it should create new container from an array of definitions', async (assert: Assert) => {
    const definitions = [
      {
        name: 'parent',
        factory: () => {
          return {
            foo: 'bar'
          }
        }
      },
      {
        name: 'child',
        factory: TestService,
        dependencies: ['parent']
      }
    ]

    const services = Container.create(definitions)

    assert.equal(services.parent.foo, 'bar')
    assert.equal(services.child.getFoo(), 'bar')

    services.parent.foo = 'bar2'

    assert.equal(services.parent.foo, 'bar2')
    assert.equal(services.child.getFoo(), 'bar2')
  })

  test('it should scope services', async (assert: Assert) => {
    const singletons: any = []

    const services = Container.create()

    services.register('scoped', () => 'foo', null, { scoped: true })
    services.register('unscoped', () => 'bar')

    const app = services.express

    app.get('/', (req: any, res: any) => {
      singletons.push({
        scoped: req.app.get('services').scoped,
        unscoped: req.app.get('services').unscoped,
      })

      res.send('Ok')
    })

    await Promise.all([
      request(app)
        .get('/')
        .expect(200),
      request(app)
        .get('/')
        .expect(200),
    ])

    assert.equal(singletons[0].unscoped === singletons[1].unscoped, true)
    assert.equal(singletons[0].scoped === singletons[1].scoped, true)
  })
})
