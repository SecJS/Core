import 'reflect-metadata'

import { Controller } from '../../../src/Decorators/Http/Controller'
import { Get, Post, Put, Delete } from '../../../src/Decorators/Http/RequestMapping'

describe('\n Request Mapping Decorators', () => {
  it('should be able to create a controller with routes inside', async () => {
    @Controller()
    class TestController {
      @Get()
      async get() {}

      @Post()
      async post() {}

      @Put()
      async put() {}

      @Delete()
      async delete() {}
    }

    expect(Reflect.getMetadata('controller:path', TestController)).toStrictEqual(['/'])
    expect(Reflect.getMetadata('controller:routes', TestController)).toStrictEqual([
      {path: '/', method: 0},
      {path: '/', method: 1},
      {path: '/', method: 2},
      {path: '/', method: 3},
    ])
  })

  it('should be able to create a controller with routes inside and map the paths', async () => {
    @Controller('api/v1')
    class TestController {
      @Get('tests')
      async get() {}

      @Post('/tests/')
      async post() {}

      @Put('/tests/:id')
      async put() {}

      @Delete('tests/:id')
      async delete() {}
    }

    expect(Reflect.getMetadata('controller:path', TestController)).toStrictEqual(['/api/v1'])
    expect(Reflect.getMetadata('controller:routes', TestController)).toStrictEqual([
      {path: '/api/v1/tests', method: 0},
      {path: '/api/v1/tests', method: 1},
      {path: '/api/v1/tests/:id', method: 2},
      {path: '/api/v1/tests/:id', method: 3},
    ])
  })

  it('should be able to map a controller using arrays in paths to create more entries', async () => {
    @Controller(['/api/v1', 'api/v2'])
    class TestController {
      @Get(['tests', '/tests/v2'])
      async get() {}
    }

    expect(Reflect.getMetadata('controller:path', TestController)).toStrictEqual(['/api/v1', '/api/v2'])
    expect(Reflect.getMetadata('controller:routes', TestController)).toStrictEqual([
      {path: '/api/v1/tests', method: 0},
      {path: '/api/v1/tests/v2', method: 0},
      {path: '/api/v2/tests', method: 0},
      {path: '/api/v2/tests/v2', method: 0},
    ])
  })
})
