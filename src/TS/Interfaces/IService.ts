export interface IServices<Model> {
  store(data: any): Model

  update(id: any, data: any): Model

  delete(id: any): boolean
}
