import { EntityRepository, Repository } from 'typeorm'

@EntityRepository()
export class NestCrudRepository<Model> extends Repository<Model> {
    public async getResource(id: string | number) {
        console.log(id)
    }
    public async getResources(id: string | number) {
        console.log(id)
    }
}
