export async function fillable(data: any, keys: [string]): Promise<any> {
  return keys.reduce((previous: any, key: string) => {
    if (data[key]) {
      previous[key] = data[key]
    }

    return previous
  }, {})
}