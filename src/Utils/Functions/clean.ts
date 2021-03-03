/**
 * @deprecated
 * @param object
 *
 * Use cleanObj from Clean class instead. Will me removed in v1.5.0
 */
export function clean(object: any): any {
  const newObj: any = {}

  Object.keys(object).map(prop => {
    if (object[prop]) {
      newObj[prop] = object[prop]
    }
  })

  return newObj
}
