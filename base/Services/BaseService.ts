import { ApiRequestContract } from "../../contracts"

export class BaseService<T extends object> {
  /**
   * Creates a new instance of the given entity
   *
   * @param create Properties of the instance to create.
   * @return The entity instance to be created
   */
  async setDataCreate(create: any): Promise<T> {
    const model = {};

    Object.entries(create).forEach(([key, value]) => {
      model[key] = value;
    });

    return model as T;
  }

  /**
   * Updates the given instance of the entity
   *
   * @param model The current instance
   * @param update Properties to apply as update.
   * @return The updated entity instance
   */
  async setDataUpdate(model: T, update: any): Promise<T> {
    Object.entries(update).forEach(([key, value]) => {
      model[key] = value;
    });

    return model;
  }
}
