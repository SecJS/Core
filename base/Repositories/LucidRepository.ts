import { DateTime } from 'luxon'
import { PaginationContract } from '../../contracts/PaginationContract'
import { ApiRequestContract, IncludesContract, OrderByContract, WhereContract } from '../../contracts/ApiRequestContract'

export abstract class LucidRepository<TModel> {
  protected abstract Model: TModel | any

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
      query.orderBy(o.key, o.ordenation)
    })
  }

  private factoryIncludes(query: any, includes: IncludesContract[]) {
    includes.map((i: IncludesContract) => {
      query.preload(i.relation, (includeQuery: any) => {
        this.factoryRequest(includeQuery, i)
      })
    })
  }

  async getOne(id?: string | null, data?: ApiRequestContract): Promise<TModel | undefined> {
    const Query = this.Model.query()

    if (id) {
      Query.where('id', id)
    }

    this.factoryRequest(Query, data)

    return Query.first()
  }

  async getAll(pagination: PaginationContract, data?: ApiRequestContract): Promise<TModel[]> {
    const Query = this.Model.query()

    if (pagination.page && pagination.limit) {
      Query.paginate(pagination.page, pagination.limit)
    }

    this.factoryRequest(Query, data)

    return Query
  }

  async create(payload: TModel): Promise<TModel> {
    return this.Model.create(payload)
  }

  async update(id: string, payload: any): Promise<TModel> {
    const model = await this.getOne(id) as any

    if (!model) {
      throw new Error('MODEL_NOT_FOUND_UPDATE')
    }

    Object.keys(payload).map((key) => {
      model[key] = payload[key]
    })

    return model.save()
  }

  async delete(id: string): Promise<TModel> {
    const model = await this.getOne(id) as any

    if (!model) {
      throw new Error('MODEL_NOT_FOUND_DELETE')
    }

    model.deletedAt = DateTime.fromJSDate(new Date())

    return model.save()
  }
}
