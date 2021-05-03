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

    const { where, orderBy, includes, isInternRequest = true } = data

    if (includes) {
      this.factoryIncludes(Query, includes, alias, isInternRequest)
    }

    if (where) {
      this.factoryWhere(Query, where, alias, isInternRequest)
    }

    if (orderBy) {
      this.factoryOrderBy(Query, orderBy, alias)
    }
  }

  private factoryWhere(
    query: SelectQueryBuilder<TModel>,
    where: WhereContract,
    alias?: string,
    isInternRequest?: boolean,
  ) {
    if (!alias) {
      alias = query.alias
    }

    Object.keys(where).forEach(key => {
      const value = where[key]

      if (!isInternRequest && !this.Model.where?.includes(key)) {
        throw new Error('KEY_NOT_ALLOWED')
      }

      if (!value) {
        query.andWhere(`${alias}.${key} IS NULL`)

        return
      }

      if (Array.isArray(value)) {
        query.andWhere(`${alias}.${key} ::jsonb @> :${key}`, {
          [key]: JSON.stringify(value),
        })

        return
      }

      const valueInString = value.toString()

      if (valueInString.indexOf(',') > 0) {
        query.andWhere(`${alias}.${key} IN (:...${key})`, {
          [key]: new Parser().stringToArray(valueInString),
        })

        return
      }

      query.andWhere(`${alias}.${key} = '${value}'`)
    })

    return query
  }

  private factoryOrderBy(
    query: SelectQueryBuilder<TModel>,
    orderBy: OrderByContract,
    alias?: string,
  ) {
    if (!alias) {
      alias = query.alias
    }

    Object.keys(orderBy).forEach(key => {
      const value = orderBy[key]

      query.addOrderBy(`${alias}.${key}`, value)
    })

    return query
  }

  private factoryIncludes(
    query: SelectQueryBuilder<TModel>,
    includes: IncludesContract,
    alias?: string,
    isInternRequest?: boolean,
  ) {
    if (!alias) {
      alias = query.alias
    }

    Object.keys(includes).forEach(key => {
      const value = includes[key]

      if (!isInternRequest && !this.Model.includes?.includes(value.relation)) {
        throw new Error('KEY_NOT_ALLOWED')
      }

      const includeAlias = `${value.relation}`.toLocaleUpperCase()

      query.leftJoinAndSelect(`${alias}.${value.relation}`, includeAlias)

      this.factoryRequest(query, value, includeAlias)
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
