interface ICrudMS<Model> {
  store(): Promise<Model>
  update(): Promise<Model>
  destroy(): Promise<Model>
}

export class CrudMethodsService<Model> implements ICrudMS<Model> {
  public async store(): Promise<Model> {
    return
  }
  public async update(): Promise<Model> {
    return
  }
  public async destroy(): Promise<Model> {
    return
  } 
}
