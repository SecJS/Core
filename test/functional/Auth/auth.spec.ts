import { Assert, test } from '../../stub/types'
import { jwtData } from './data'
import { Guard, RoleEnum } from '../../../src/Auth'

test.group('Auth JWT', () => {
  test('A) Check JWT user', async (assert: Assert) => {
    const guard = new Guard()
    await guard.parse(jwtData.jwt_user)

    assert.equal(guard.check(), true)
    assert.equal(guard.username, '77f9ce53-b7a3-4e1f-b527-37644f126263')
    assert.equal(guard.userId, '77f9ce53-b7a3-4e1f-b527-37644f126263')
    assert.equal(guard.isUser(), true)
    assert.equal(guard.isAdmin(), false)
    assert.equal(guard.hasRole(RoleEnum.USER), true)
  })

  test('B) Check JWT ADMIN', async (assert: Assert) => {
    const guard = new Guard()
    await guard.parse(jwtData.jwt_admin)

    assert.equal(guard.check(), true)
    assert.equal(guard.username, '4cffee03-5594-47b4-8136-44e399b2e350')
    assert.equal(guard.userId, '4cffee03-5594-47b4-8136-44e399b2e350')
    assert.equal(guard.isUser(), true)
    assert.equal(guard.isAdmin(), true)
    assert.equal(guard.hasRole(RoleEnum.ADMIN), true)
  })

  test('C) Nao informado token', async (assert: Assert) => {
    const guard = new Guard()

    assert.equal(guard.check(), false)
    assert.equal(guard.username, null)
    assert.equal(guard.userId, null)
    assert.equal(guard.isUser(), false)
    assert.equal(guard.isAdmin(), false)
    assert.equal(guard.hasRole(RoleEnum.USER), false)
  })

  test('D) Token invalido', async (assert: Assert) => {
    const guard = new Guard()
    await guard.parse('aaaa.asdd.addad')

    assert.equal(guard.check(), false)
    assert.equal(guard.username, null)
    assert.equal(guard.userId, null)
    assert.equal(guard.isUser(), false)
    assert.equal(guard.isAdmin(), false)
    assert.equal(guard.hasRole(RoleEnum.USER), false)
  })

  test('E) Check JWT with BEARER user', async (assert: Assert) => {
    const guard = new Guard()
    await guard.parse(`bearer ${jwtData.jwt_user}`)

    assert.equal(guard.check(), true)
    assert.equal(guard.username, '77f9ce53-b7a3-4e1f-b527-37644f126263')
    assert.equal(guard.userId, '77f9ce53-b7a3-4e1f-b527-37644f126263')
    assert.equal(guard.isUser(), true)
    assert.equal(guard.isAdmin(), false)
    assert.equal(guard.hasRole(RoleEnum.USER), true)
  })

  test('F) Check JWT with case sentive BEARER user', async (assert: Assert) => {
    const guard = new Guard()
    await guard.parse(`Bearer ${jwtData.jwt_user}`)

    assert.equal(guard.check(), true)
    assert.equal(guard.username, '77f9ce53-b7a3-4e1f-b527-37644f126263')
    assert.equal(guard.userId, '77f9ce53-b7a3-4e1f-b527-37644f126263')
  })
})
