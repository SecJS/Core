import { v4, validate } from 'uuid'

export class Token {
  public verify(token: string, isPrefixed = true): boolean {
    if (isPrefixed) {
      return validate(token.split('-')[1])
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
    if (!this.verify(token, false)) {
      throw new Error ('TOKEN_IS_NOT_UUID')
    }

    return `${prefix}-${token}`
  }

  public changePrefix(newPrefix: string, token: string): string {
    const uuid = token.split('-')[1]

    if (!this.verify(uuid)) {
      throw new Error ('TOKEN_IS_NOT_UUID')
    }

    return `${newPrefix}-${uuid}`
  }
}
