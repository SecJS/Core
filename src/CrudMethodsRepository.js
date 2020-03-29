class CrudMethodsRepository {
  async index(E) {
    const Entity = use(`App/Models/${E}`);
    const models = await Entity.all();

    return models;
  }

  async store(body, E) {
    const Entity = use(`App/Models/${E}`);
    const model = await Entity.create({
      body,
    });

    return model;
  }

  async show({ id }, E) {
    const Entity = use(`App/Models/${E}`);
    const model = await Entity.findBy({
      id,
    });

    return model;
  }

  async destroy(id, E) {
    const Entity = use(`App/Models/${E}`);
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