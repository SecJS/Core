export function observeChanges(object: any, key: string, func?: any, args?: any) {
  Object.defineProperty(object, key, {
    set: (value) => {
      if (func) func(value, args)
    }
  })
}
