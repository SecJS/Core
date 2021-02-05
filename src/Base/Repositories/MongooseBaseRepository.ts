import {
  WhereContract,
  OrderByContract,
  IncludesContract,
  ApiRequestContract,
} from '../../Contracts/ApiRequestContract'

import { Model, Document } from 'mongoose'
import { PaginationContract} from '../../Contracts/PaginationContract'

export abstract class MongooseBaseRepository<TModel extends Document> {
  protected abstract Model: Model<TModel>

  private factoryRequest(query: any, data?: ApiRequestContract) {
    if (!data) {
      return
    }

    const { where, orderBy, includes } = data

    if (where) {
      this.factoryWhere(query, where)
    }

    if (orderBy) {
      this.factoryOrderBy(query, orderBy)
    }

    if (includes) {
      this.factoryIncludes(query, includes)
    }

    return query
  }

  private factoryWhere(query: any, where: WhereContract[]) {
    where.map((w: WhereContract) => {
      query.where(w.key, w.value)
    })
  }

  private factoryOrderBy(query: any, orderBy: OrderByContract[]) {
    orderBy.map((o: OrderByContract) => {
      query.sort({ [o.key]: o.ordenation })
    })
  }

  private factoryIncludes(query: any, includes: IncludesContract[]) {
    includes.map((i: IncludesContract) => {
      query.populate(i.relation, null, (includeQuery: any) => {
        this.factoryRequest(includeQuery, i)
      })
    })
  }

  async getOne(id?: string, data?: ApiRequestContract): Promise<TModel | null> {
    const query = this.Model.findOne()

    if (id) {
      query.where('id', id)
    }

    this.factoryRequest(query, data)

    return query.exec()
  }

  async getAll(
    pagination: PaginationContract,
    data?: ApiRequestContract,
  ): Promise<TModel[]> {
    const query = this.Model.find()

    if (pagination.page && pagination.limit) {
      query.skip(pagination.page).limit(pagination.limit)
    }

    return this.factoryRequest(query, data).exec()
  }

  async create(body: any): Promise<TModel> {
    return new this.Model(body).save()
  }

  async update(id: string, body: any): Promise<TModel> {
    const model = (await this.getOne(id)) as any

    if (!model) {
      throw new Error('MODEL_NOT_FOUND_UPDATE')
    }

    return model.updateOne({ _id: id }, body).exec()
  }

  async delete(id: string): Promise<TModel> {
    const model = (await this.getOne(id)) as any

    if (!model) {
      throw new Error('MODEL_NOT_FOUND_DELETE')
    }

    return model.updateOne({ deleted_at: new Date(), status: 'deleted' }).exec()
  }
}
