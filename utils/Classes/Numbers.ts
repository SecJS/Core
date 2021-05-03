export class Numbers {
  getHigher(numbers: any[]) {
    return Math.max.apply(Math, numbers)
  }

  getLower(numbers: any[]) {
    return Math.min.apply(Math, numbers)
  }

  extractNumbers(string: string) {
    return string ? string.replace(/\D/g, '') : string
  }

  argsAverage(...args: any[]) {
    return args.reduce((acc: any, curr: any) => acc + curr, 0) / args.length
  }

  arrayAverage(array: any[]) {
    return array.reduce((acc, curr) => acc + curr, 0) / array.length
  }
}
