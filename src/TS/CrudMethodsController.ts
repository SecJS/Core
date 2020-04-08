// import { CrudMethodsService } from './CrudMethodsService'
import { CrudMethodsRepository } from './CrudMethodsRepository'

class CrudMethodsController<Model> {
  // protected service: CrudMethodsService<Model>
  protected repository: CrudMethodsRepository<Model>

  constructor() {
    // this.service = new CrudMethodsService<Model>()
    this.repository = new CrudMethodsRepository<Model>()
  }

  public async index(request: Request, response: Response) {
    const models = this.repository.all()

    return models
  }
}

export default CrudMethodsController
