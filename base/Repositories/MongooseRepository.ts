import {
  WhereContract,
  OrderByContract,
  IncludesContract,
  ApiRequestContract,
  PaginationContract,
} from '../../contracts'
import { Model, Document, isValidObjectId } from 'mongoose'

export abstract class MongooseRepository<TModel extends Document> {
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
      query.populate(i.relation)
    })
  }

  async getOne(id?: string, data?: ApiRequestContract): Promise<TModel | null> {
    const query = this.Model.findOne()

    if (id) {
      if (!isValidObjectId(id)) {
        throw new Error('NOT_VALID_OBJECT_ID')
      }

      query.where('_id', id)
    }

    this.factoryRequest(query, data)

    return query.exec()
  }

  async getAll(
    pagination: PaginationContract,
    data?: ApiRequestContract,
  ): Promise<any> {
    const query = this.Model.find()

    if (pagination.limit) {
      query.skip(pagination.page || pagination.offset || pagination.skip).limit(pagination.limit)
    }

    this.factoryRequest(query, data)

    pagination.total = await this.Model.countDocuments()

    return {
      data: await query.exec(),
      pagination,
    }
  }

  async storeOne(body: any): Promise<TModel> {
    return new this.Model(body).save()
  }

  async updateOne(id: any, body: any): Promise<TModel> {
    let model = id

    if (typeof id === 'string') {
      model = await this.getOne(id)

      if (!model) {
        throw new Error('MODEL_NOT_FOUND_UPDATE')
      }
    }

    Object.keys(body).map(key => {
      model[key] = body[key]
    })

    return model.save()
  }

  async deleteOne(id: any): Promise<TModel> {
    let model = id

    if (typeof id === 'string') {
      model = await this.getOne(id)

      if (!model) {
        throw new Error('MODEL_NOT_FOUND_DELETE')
      }
    }

    model.deletedAt = new Date()

    return model.save()
  }
}
