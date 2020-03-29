const CrudMethodsService = require('./CrudMethodsService');

class CrudMethodsController {
    constructor() {
      this.crudMethodsService = new CrudMethodsService();
    }
  
    async index({ params, request, response }) {
      const models = await this.crudMethodsService.index(this.entity);
  
      return response.status(200).json(models);
    }
  
    async store({ params, request, response }) {
      const model = await this.crudMethodsService.store(request.all(), this.entity);
  
      return response.status(200).json(model);
    }
  
    async show({ params, request, response }) {
      const model = await this.crudMethodsService.show(params, this.entity);
  
      return response.status(200).json(model);
    }
  
    async update({ params, request, response }) {
      const model = await this.crudMethodsService.update(params, request.all(), this.entity);
  
      return response.status(200).json(model);
    }
  
    async destroy({ params, request, response }) {
        await this.crudMethodsService.delete(params, this.entity);

        return response.status(204);
    }
  }
  
  module.exports = CrudMethodsController;