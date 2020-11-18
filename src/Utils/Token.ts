import { uuid, isUuid } from 'uuidv4'

export class Token {
    public verify(token: string): boolean {
        return isUuid(token.split('-')[1])
    }

    public generate(prefix: string): string {
        return `${prefix}-${uuid()}`
    }
}
