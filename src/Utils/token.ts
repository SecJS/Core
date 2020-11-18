import { uuid, isUuid } from 'uuidv4'

export class Token {
    public async verify(token: string): Promise<boolean> {
        return isUuid(token.split('-')[1])
    }

    public async generate(prefix: string): Promise<string> {
        return `${prefix}-${uuid()}`
    }
}
