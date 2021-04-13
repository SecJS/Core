export function urlify(string: any) {
  const regex = /(https?:\/\/[^\s]+)/g

  return string.replace(regex, '<a href="$1">$1</a>')
}
