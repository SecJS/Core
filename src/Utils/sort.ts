export async function sort(max: number, min: number) {
  const index = Math.random() * (max - min) + min

  return Math.floor(index)
}
