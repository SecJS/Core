import { Injectable } from '@nestjs/common'
import { NestCrudRepository } from '../Repositories/NestCrudRepository'

@Injectable()
export class NestCrudService<Model> {
    constructor(private repository: NestCrudRepository<Model>) {}

    public async create(body: any): Promise<any> {
        console.log(body)
    }
    public async update(id: string | number, body: any): Promise<any> {
        return this.repository.update(id, body)
    }
    public async delete(id: string | number): Promise<void> {
        console.log(id)
    }
}
