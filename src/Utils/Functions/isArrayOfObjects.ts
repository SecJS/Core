export function isArrayOfObjects(array: any[]) {
  if (!Array.isArray(array)) return false

  const results = array.map(object => typeof object === 'object')

  return results.includes(false) ? false : true
}
