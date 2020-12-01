export function clean(object: any): any {
  const newObj: any = {}

  Object.keys(object).map(prop => {
    if (object[prop]) {
      newObj[prop] = object[prop]
    }
  })

  return newObj
}
