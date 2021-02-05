import { GuardTypesContract } from '../../Contracts/GuardTypesContract'

export class GuardBaseService<Guard extends GuardTypesContract> {
  private _guard: Guard | undefined

  get guard(): Guard {
    if (!this._guard) {
      throw new Error('GUARD_UNSET')
    }

    return this._guard
  }

  setGuard(guard: Guard) {
    this._guard = guard

    if (guard.id) {
      this._guard.user = guard
    }

    return this
  }
}
