import CrudMethodsController from "../../src/TS/AbstractCrudMethodsController"
import TestService from './TestService'
import Test from './Models/Test'
import TestRepository from './TestRepository'

export default class TestController extends CrudMethodsController<Test> {

    constructor(protected service: TestService, protected repository: TestRepository) {
        super(service, repository);
    }

    otherMethod(): void {
        this.repository.other()
    }
}


