export class Clean {
  /**
   * Clean falsy values from array
   *
   * @param array The array with falsy values
   * @return The array filtered without any falsy value
   */
  cleanArray(array: any[]) {
    return array.filter(Boolean)
  }

  /**
   * Clean falsy values from objet
   *
   * @param object The object with falsy values
   * @return The object filtered without any falsy value
   */
  cleanObject(object: any) {
    Object.keys(object).forEach(prop => {
      if (!object[prop]) {
        delete object[prop]
      }
    })

    return object
  }
}
