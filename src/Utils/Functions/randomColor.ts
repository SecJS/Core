export function randomColor() {
  return `#${(Math.random() * 0xFFFFFF << 0).toString(16)}`
}
