import AbstractCrudController from "../../src/TS/AbstractCrudMethodsController"
import TestService from './TestService'
import TestRepository from './TestRepository'

export default class TestController extends AbstractCrudController {
  public constructor (service: TestService, repository: TestRepository) {
    super()
    this.service = service
    this.repository = repository
  }
}