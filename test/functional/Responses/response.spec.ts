import test from 'japa'

import { SecResponse } from '../../../src/Responses'

test.group('SecResponse', group => {
  group.beforeEach(() => {
    // ioc.restore();
  })

  group.before(async () => {
    // await setupSupportProvider();
  })

  test('should return a collection of objects', async assert => {
    const data = [
      {
        'first-data': 'João',
      },
      {
        'second-data': 'Valmir',
      },
    ]

    const response = new SecResponse().withCollection(data)

    assert.equal(response.status, 'success')
  })

  test('should return one object', async assert => {
    const data = { 'first-data': 'João' }

    const response = new SecResponse().withOne(
      data,
      'I can pass messages or not!!',
    )

    assert.equal(response.status, 'success')
    assert.equal(response.message, 'I can pass messages or not!!')
  })

  test('should return just a status with message', async assert => {
    const response = new SecResponse().withoutBody('Without body!!')

    assert.equal(response.status, 'success')
    assert.equal(response.message, 'Without body!!')
  })

  test('should return an error message', async assert => {
    const data = { total: 'I can pass data in withError to!' }

    const response = new SecResponse().withError(
      data,
      'A very nice error message :P',
      'ERROR_CODE',
      400,
    )

    assert.equal(response.status, 'error')
    assert.equal(response.message, 'A very nice error message :P')
    assert.equal(response.error?.code, 'ERROR_CODE')
    assert.equal(response.error?.httpStatus, 400)
  })

  test('should return an error message with validation', async assert => {
    const data = { total: 'I can pass data in withError to!' }
    const validation = {
      first_name: ['O campo é obrigatório'],
      last_name: ['O campo é obrigatório'],
    }

    const response = new SecResponse().withValidationError(
      data,
      validation,
      'A very nice error message :P',
      'WRONG_ARGS',
      400,
    )

    assert.equal(response.status, 'error')
    assert.equal(response.message, 'A very nice error message :P')
    assert.equal(response.error?.code, 'WRONG_ARGS')
    assert.equal(response.error?.httpStatus, 400)
  })
})
