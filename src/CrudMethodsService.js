const CrudMethodsRepository = require('./CrudMethodsRepository');

class CrudMethodsService {
  constructor() {
    this.crudMethodsRepository = new CrudMethodsRepository();
  }

  async index(entity) {
    const models = await this.crudMethodsRepository.index(entity);

    return models;
  }

  async store(body, entity) {
    const model = await this.crudMethodsRepository.store(body, entity);

    return model;
  }

  async show({ id }, entity) {
    const model = await this.crudMethodsRepository.show(id, entity);

    return model;
  }

  async destroy({ id }, entity) {
    const model = await this.crudMethodsRepository.destroy(id, entity);

    return model;
  }
}

module.exports = CrudMethodsService;