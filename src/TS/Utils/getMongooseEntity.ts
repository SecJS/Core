export default class getMongooseEntity<Model> {
  async getEntity <Model>(value: Model): Promise<Model> {
    const entity = require(`../../../__tests__/TS/Models/${value}`)

    return entity
  }
}