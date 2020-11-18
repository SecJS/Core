import { Injectable } from '@nestjs/common'

@Injectable()
export class NestCrudService {
    protected model: any

    constructor(resource: any) {
        this.model = resource
    }

    public async create(body: any): Promise<any> {}
    public async update(id: string | number, body: any): Promise<void> {}
    public async delete(id: string | number): Promise<void> {}
}
