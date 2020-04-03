import {IRepository, IServices} from "./Interfaces";


export default abstract class AbstractCrudMethodsController<Model> {
    protected constructor(protected service: IServices<Model>, protected repository: IRepository<Model>) {}

    public async index(request, response) {
        const models = await this.repository.all()

        return response.json({
            type: 'index', msg: 'Index Model', obj: {
                models
            }
        })
    }

    public async store(request, response) {
      const models = await this.service.store(request.all())

      return response.json({
          type: 'index', msg: 'Index Model', obj: {
              models
          }
      })
  }
}
