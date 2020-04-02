import CrudMethodsRepository from './CrudMethodsRepository'

export default class CrudMethodsService {
  private crudMethodsRepository: CrudMethodsRepository

  constructor () {
    this.crudMethodsRepository = new CrudMethodsRepository()
  }

  public async index () {
    const model = this.crudMethodsRepository.index()

    return model
  }
}