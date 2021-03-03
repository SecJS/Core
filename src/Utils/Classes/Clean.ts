export class Clean {
  cleanArray(array: any[]) {
    return array.filter(Boolean)
  }

  cleanObject(object: any) {
    const newObj: any = {}

    Object.keys(object).map(prop => {
      if (object[prop]) {
        newObj[prop] = object[prop]
      }
    })

    return newObj
  }
}
