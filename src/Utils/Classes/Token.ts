import { uuid, isUuid } from 'uuidv4'

export class Token {
  public verify(token: string, isPrefixed = true): boolean {
    if (isPrefixed) {
      return isUuid(token.split('-')[1])
    }

    return isUuid(token)
  }

  public generate(prefix?: string): string {
    if (prefix) {
      return `${prefix}-${uuid()}`
    }

    return uuid()
  }

  public getToken(token: string): string {
    return token.split('-')[1]
  }

  public injectPrefix(prefix: string, token: string): string {
    if (!this.verify(token, false)) {
      throw new Error ('TOKEN_IS_NOT_UUID')
    }

    return `${prefix}-${token}`

  }
}
