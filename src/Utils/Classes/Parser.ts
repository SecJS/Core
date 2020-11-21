export class Parser {
  public async stringToArray(string: string) {
    return Promise.all(string.split(',').map(index => index.trim()))
  }
}
