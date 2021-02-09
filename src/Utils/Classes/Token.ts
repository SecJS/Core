import { v4, validate } from 'uuid'

export class Token {
  public verify(token: string, isPrefixed = false): boolean {
    if (isPrefixed) {
      return validate(this.getToken(token))
    }

    return validate(token)
  }

  public generate(prefix?: string): string {
    if (prefix) {
      return `${prefix}-${v4()}`
    }

    return v4()
  }

  public getToken(token: string): string {
    const prefix = token.split('-')[0]

    return token.split(`${prefix}-`)[1]
  }

  public injectPrefix(prefix: string, token: string): string {
    if (!this.verify(token)) {
      throw new Error ('TOKEN_IS_NOT_UUID')
    }

    return `${prefix}-${token}`
  }

  public changePrefix(newPrefix: string, token: string): string {
    const uuid = this.getToken(token)

    if (!this.verify(uuid)) {
      throw new Error ('TOKEN_IS_NOT_UUID')
    }

    return `${newPrefix}-${uuid}`
  }

  public changeOrGenerate(prefix: string, token?: string): string {
    if (token) {
      return this.changePrefix(prefix, token)
    }

    return this.generate(prefix)
  }
}
