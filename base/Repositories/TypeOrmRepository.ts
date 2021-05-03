import { Parser } from '../../utils/Classes/Parser'
import { Repository, SelectQueryBuilder } from 'typeorm'
import { PaginatedResponse } from '../../contracts/ApiResponseContract'
import { PaginationContract } from '../../contracts/PaginationContract'
import { ApiRequestContract, IncludesContract, OrderByContract, WhereContract } from '../../contracts/ApiRequestContract'

export abstract class TypeOrmRepository<TModel> extends Repository<TModel> {
  protected abstract Model: any

  private factoryRequest(Query: SelectQueryBuilder<TModel>, data?: ApiRequestContract, alias?: string) {
    if (!data) {
      return
    }

    const { where, orderBy, includes } = data

    if (includes) {
      this.factoryIncludes(Query, includes, alias)
    }

    if (where) {
      this.factoryWhere(Query, where, alias)
    }

    if (orderBy) {
      this.factoryOrderBy(Query, orderBy, alias)
    }
  }

  private factoryWhere(
    query: SelectQueryBuilder<TModel>,
    where: WhereContract[],
    alias?: string,
  ) {
    if (!alias) {
      alias = query.alias
    }

    where.forEach((w: WhereContract) => {
      if (!this.Model.where?.includes(w.key)) {
        throw new Error('KEY_NOT_ALLOWED')
      }

      if (!w.value) {
        query.andWhere(`${alias}.${w.key} IS NULL`)

        return
      }

      if (Array.isArray(w.value)) {
        query.andWhere(`${alias}.${w.key} ::jsonb @> :${w.key}`, {
          [w.key]: JSON.stringify(w.value),
        })

        return
      }

      const value = w.value.toString()

      if (value.indexOf(',') > 0) {
        query.andWhere(`${alias}.${w.key} IN (:...${w.key})`, {
          [w.key]: new Parser().stringToArray(value),
        })

        return
      }

      query.andWhere(`${alias}.${w.key} = '${w.value}'`)
    })

    return query
  }

  private factoryOrderBy(
    query: SelectQueryBuilder<TModel>,
    orderBy: OrderByContract[],
    alias?: string,
  ) {
    if (!alias) {
      alias = query.alias
    }

    orderBy.map((o: OrderByContract) => {
      query.addOrderBy(`${alias}.${o.key}`, o.ordenation)
    })

    return query
  }

  private factoryIncludes(
    query: SelectQueryBuilder<TModel>,
    includes: IncludesContract[],
    alias?: string,
  ) {
    if (!alias) {
      alias = query.alias
    }

    includes.map((include: IncludesContract) => {
      if (!this.Model.includes?.includes(include.relation)) {
        throw new Error('KEY_NOT_ALLOWED')
      }

      const includeAlias = `${include.relation}`.toLocaleUpperCase()

      query.leftJoinAndSelect(`${alias}.${include.relation}`, includeAlias)

      this.factoryRequest(query, include, includeAlias)
    })

    return query
  }

  async getAll(pagination: PaginationContract, data?: ApiRequestContract): Promise<PaginatedResponse<TModel>> {
    const Query = this.createQueryBuilder(this.Model)

    let page = 0
    let skip = 0
    let limit = 0
    let offset = 0

    if (pagination.limit) {
      page = pagination.page || 0
      limit = pagination.limit || 10
      offset = pagination.offset || 0

      Query.skip(page || offset)
      Query.take(limit || skip)
    }

    this.factoryRequest(Query, data)

    const returnData = await Query.getManyAndCount()

    return {
      data: returnData[0],
      pagination: {
        page,
        skip,
        offset,
        limit,
        total: returnData[1]
      },
    }
  }

  async storeOne(body: any): Promise<TModel | any> {
    return this.save(this.create(body))
  }

  async getOne(id?: string | null, data?: ApiRequestContract): Promise<TModel | undefined> {
    const Query = this.createQueryBuilder()

    if (id) {
      Query.where({ id })
    }

    this.factoryRequest(Query, data)

    return Query.getOne()
  }
}
