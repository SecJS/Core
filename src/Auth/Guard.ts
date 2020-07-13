import * as jwt from 'jsonwebtoken'
import { RoleEnum } from './enums'

export class Guard {
  private payload?: Record<string, any>

  async parse(token: string): Promise<void> {
    const text = token.replace('Bearer ', '').replace('bearer ', '')
    this.payload = jwt.decode(text) as Record<string, any>
    return Promise.resolve()
  }

  get username(): string {
    return this.payload?.username
  }

  get userId(): string {
    return this.payload?.sub
  }

  isUser(): boolean {
    return this.hasRole(RoleEnum.USER)
  }

  isAdmin(): boolean {
    return this.hasRole(RoleEnum.ADMIN)
  }

  getRoles(): RoleEnum[] {
    if (!this.check() || !this.payload) return []

    const roles = this.payload['cognito:groups']
      ? this.payload['cognito:groups']
      : []

    roles.push(RoleEnum.USER)
    return roles
  }

  hasRole(role: RoleEnum): boolean {
    return this.getRoles().includes(role)
  }

  check(): boolean {
    return !!this.payload
  }
}
