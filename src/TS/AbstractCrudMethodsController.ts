import { Request, Response } from 'express'

interface I

export default abstract class AbstractCrudMethodsController {
  protected service: TestService
  protected repository: TestRepository

  protected async index (request: Request, response: Response) {
    const models = this.service.index()

    return response.json({ type: 'index', msg: 'Index Model', obj: {
      models
    }})
  }

  // protected async store (request: Request, response: Response) {
  //   const model = this.service.store(request.all())

  //   return response.json({ type: 'store', msg: 'Store Model', obj: {
  //     model
  //   }})
  // }

  // protected async show (request: Request, response: Response) {
  //   const model = this.service.show(request.params.id)

  //   return response.json({ type: 'show', msg: 'Show Model', obj: {
  //     model
  //   }})
  // }
}