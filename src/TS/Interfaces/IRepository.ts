export interface IRepository<Model> {
  find(id: any): Model

  all(): Model[]
}
