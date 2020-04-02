import CrudMethodsController from "../../src/TS/CrudMethodsController"
import TestService from './TestService'
import TestRepository from './TestRepository'

export default class TestController extends CrudMethodsController {
  protected service: TestService
  protected repository: TestRepository

  public constructor (service: TestService, repository: TestRepository) {
    super()
    this.service = service
    this.repository = repository
  }
}