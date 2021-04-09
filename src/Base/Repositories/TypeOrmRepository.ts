import { Parser } from '../../Utils/Classes/Parser'
import { Repository, SelectQueryBuilder } from 'typeorm'
import { PaginatedResponse } from '../../Contracts/ApiResponseContract'
import { PaginationContract } from '../../Contracts/PaginationContract'
import { ApiRequestContract, IncludesContract, OrderByContract, WhereContract } from '../../Contracts/ApiRequestContract'

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

    where.map((w: WhereContract) => {
      const value = w.value.toString()

      if (Array.isArray(w.value)) {
        query.andWhere(`${alias}.${w.key} ::jsonb @> :${w.key}`, {
          [w.key]: JSON.stringify(w.value),
        })
      } else if (value.indexOf(',') > 0) {
        query.andWhere(`${alias}.${w.key} IN (:...${w.key})`, {
          [w.key]: new Parser().stringToArray(value),
        })
      } else {
        query.andWhere(`${alias}.${w.key} = '${w.value}'`)
      }
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

      Query.skip(page || skip || offset)
      Query.take(limit)
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

  async storeOne(body: TModel): Promise<TModel> {
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
