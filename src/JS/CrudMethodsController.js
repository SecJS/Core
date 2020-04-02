const CrudMethodsService = require('./CrudMethodsService');

class CrudMethodsController {
    constructor() {
      this.crudMethodsService = new CrudMethodsService();
    }
  
    async index({ params, request, response }) {
      const models = await this.crudMethodsService.index(this.entity);
  
      return response.status(200).json({msg: `all-${this.entity}-found`, type: `All ${this.entity} found`, models});
    }
  
    async store({ params, request, response }) {
      const model = await this.crudMethodsService.store(request.all(), this.entity);
  
      return response.status(200).json({msg: `${this.entity}-stored`, type: `${this.entity} stored`, model});
    }
  
    async show({ params, request, response }) {
      const model = await this.crudMethodsService.show(params, this.entity);
  
      return response.status(200).json({msg: `${this.entity}-founded`, type: `${this.entity} founded`, model});
    }
  
    async update({ params, request, response }) {
      const model = await this.crudMethodsService.update(params, request.all(), this.entity);
  
      return response.status(200).json({msg: `${this.entity}-updated`, type: `${this.entity} updated`, model});
    }
  
    async destroy({ params, request, response }) {
        this.crudMethodsService.destroy(params, this.entity);

        return;
    }
  }
  
  module.exports = CrudMethodsController;