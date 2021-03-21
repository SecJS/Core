export function isArrayOfObjects(array: any[]) {
  const results = array.map(object => typeof object === 'object')

  return results.includes(false) ? false : true
}
