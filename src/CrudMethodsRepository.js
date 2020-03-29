class CrudMethodsRepository {
  async index(Entity) {
    const models = await Entity.all();

    return models;
  }

  async store(body, Entity) {
    const model = await Entity.create({
      body
    });

    return model;
  }
  
  async show({ id }, Entity) {
    const model = await Entity.findBy({
      id,
    });

    return model;
  }

  async destroy(id, Entity) {
    const model = await Entity.findBy({
      id,
    });

    await model.delete();

    model.deleted = true;
    model.status = false;

    await model.save();

    return model;
  }
}

module.exports = CrudMethodsRepository;