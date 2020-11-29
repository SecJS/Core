export interface IStringToNumber {
  string: string | number,
  isCordinate?: boolean
}

export class Parser {
  public async stringToArray(string: string): Promise<string[]> {
    return Promise.all(string.split(',').map(index => index.trim()))
  }

  public async stringToNumber({ string, isCordinate }: IStringToNumber): Promise<number> {
    if (typeof string === 'string') {
      if (!string.replace(/\D/g, "")) {
        throw new Error('Your string is invalid, it should have at least one number')
      }

      string = string.replace(/\D/g, "")
    }

    if (typeof string === 'number') {
      return string
    }

    if (string.length >= 9 || isCordinate) {
      return parseFloat(string)
    }

    return parseInt(string)
  }
}