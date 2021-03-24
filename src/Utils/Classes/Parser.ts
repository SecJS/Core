export interface IStringToNumber {
  string: string | number,
  isCordinate?: boolean
}

export class Parser {
  public stringToArray(string: string): string[] {
    return string.split(',').map(index => index.trim())
  }

  public stringToNumber({ string, isCordinate }: IStringToNumber): number {
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

  public jsonToFormData(object: any) {
    return Object.keys(object).reduce((previous, current) => {
      return previous + `&${current}=${encodeURIComponent(object[current])}`
    }, '')
  }
}
