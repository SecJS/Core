export class GuardBaseService<Guard> {
  private _guard: Guard | undefined

  get guard(): Guard {
    if (!this._guard) {
      throw new Error('GUARD_UNSET')
    }

    return this._guard
  }

  setGuard(guard: Guard) {
    this._guard = guard

    return this
  }
}
