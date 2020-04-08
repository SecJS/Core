interface ICrudMR<Model> {
  all(): Promise<Model>
  getById(): Promise<Model>
}

import getMongooseEntity from './Utils/getMongooseEntity'

export class CrudMethodsRepository<Model> implements ICrudMR<Model> {
  protected entity: getMongooseEntity<Model>

  constructor() {
    this.entity = new getMongooseEntity<Model>()
  }

  public async all(): Promise<Model> {
    const entity = this.entity.getEntity
    const models = entity.find()

    return
  }
  
  public async getById(): Promise<Model> {
    return 
  }
}