export function scheduler(fn: any, ms: number) {
  setInterval(fn, ms)
}
