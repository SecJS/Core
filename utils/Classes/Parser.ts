export class Parser {
  /**
   * Parse a string to array
   *
   * @param string The string to parse
   * @return The array of string
   */
  stringToArray(string: string): string[] {
    return string.split(',').map(index => index.trim())
  }

  /**
   * Parse a string to number or Cordinate
   *
   * @param string The string to parse
   * @param isCoordinate If string is a coordinate
   * @return The string parsed to int or float
   */
  stringToNumber(string: string, isCoordinate = false): number {
    if (!string.replace(/\D/g, '')) {
      throw new Error('Your string is invalid, it should have at least one number')
    }

    string = string.replace(/\D/g, "")

    if (string.length >= 9 || isCoordinate) {
      return parseFloat(string)
    }

    return parseInt(string)
  }

  /**
   * Parse an object form data
   *
   * @param object The object to parse
   * @return The object parsed to form data
   */
  jsonToFormData(object: any): string {
    return Object.keys(object).reduce((previous, current) => {
      return previous + `&${current}=${encodeURIComponent(object[current])}`
    }, '').substring(1)
  }

  /**
   * Parse an object to query string
   *
   * @param object The object to parse
   * @return The object parsed to query string
   */
  jsonToQueryString(object: any): string {
    return Object.keys(object).reduce((previous, current) => {
      if (!previous) {
        return `?${current}=${encodeURIComponent(object[current])}`
      }

      return previous + `&${current}=${encodeURIComponent(object[current])}`
    }, '').substring(1)
  }
}
