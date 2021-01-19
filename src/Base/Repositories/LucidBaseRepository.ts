import { DateTime } from 'luxon'
import { BaseModel } from '@adonisjs/lucid/build/src/Orm/BaseModel'
import { ApiRequestContract, IncludesContract, OrderByContract, WhereContract } from 'src/Contracts/ApiRequestContract'

export class LucidBaseRepository {
  protected Model: typeof BaseModel | any

  private factoryWhere(query: any, where: WhereContract[]) {
    where.map((w: WhereContract) => {
      query.where(w.key, w.value)
    })
  }

  private factoryOrderBy(query: any, orderBy: OrderByContract[]) {
    orderBy.map((ob: OrderByContract) => {
      query.orderBy(ob.key, ob.ordenation)
    })
  }

  private factoryIncludes(query: any, includes: IncludesContract[]) {
    includes.map((i: IncludesContract) => {
      query.preload(i.relation, (includeQuery: any) => {
        if (i.where) {
          this.factoryWhere(includeQuery, i.where)
        }

        if (i.orderBy) {
          this.factoryOrderBy(includeQuery, i.orderBy)
        }

        if (i.includes) {
          this.factoryIncludes(includeQuery, i.includes)
        }
      })
    })
  }

  public async getOne(id?: string | null, data?: ApiRequestContract | null) {
    const Query = this.Model.query()

    if (id) {
      Query.where('id', id)
    }

    if (!data) {
      return Query.first()
    }

    const { where, includes } = data

    if (where) {
      this.factoryWhere(Query, where)
    }

    if (includes) {
      this.factoryIncludes(Query, includes)
    }

    return Query.first()
  }

  public async getAll(pagination: any, data?: ApiRequestContract) {
    const Query = this.Model.query()

    if (pagination !== 'unpaginated') {
      Query.paginate(pagination.page, pagination.limit)
    }

    if (!data) {
      return Query
    }

    const { where, orderBy, includes } = data

    if (where) {
      this.factoryWhere(Query, where)
    }

    if (orderBy) {
      this.factoryOrderBy(Query, orderBy)
    }

    if (includes) {
      this.factoryIncludes(Query, includes)
    }

    return Query
  }

  public async create(payload: any) {
    return this.Model.create(payload)
  }

  public async update(id: string, payload: any) {
    const model = await this.getOne(id)

    Object.keys(payload).map((key) => {
      model[key] = payload[key]
    })

    return model.save()
  }

  public async delete(id: string) {
    const model = await this.getOne(id)

    model.status = 'deleted'
    model.deletedAt = DateTime.fromJSDate(new Date())

    return model.save()
  }
}
