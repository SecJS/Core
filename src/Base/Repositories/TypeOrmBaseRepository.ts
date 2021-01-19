import {
  ApiRequestContract,
  IncludesContract,
  OrderByContract,
  WhereContract,
} from 'src/Contracts/ApiRequestContract'

import { Parser } from 'src/Utils/Classes/Parser'
import { Repository, SelectQueryBuilder } from 'typeorm'

export class TypeOrmBaseRepository<Model> extends Repository<Model> {
  protected Schema: any

  private factoryWhere(
    query: SelectQueryBuilder<any>,
    where: WhereContract[],
    alias?: string,
  ) {
    if (!alias) {
      alias = query.alias
    }

    where.map((where: WhereContract) => {
      const value = where.value.toString()

      if (value.indexOf(',') >= 0) {
        query.andWhere(`${alias}.${where.key} IN (:...in)`, {
          in: new Parser().stringToArray(value),
        })
      } else {
        query.andWhere(`${alias}.${where.key} = '${where.value}'`)
      }
    })

    return query
  }

  private factoryOrderBy(
    query: SelectQueryBuilder<any>,
    orderBy: OrderByContract[],
    alias?: string,
  ) {
    if (!alias) {
      alias = query.alias
    }

    orderBy.map((orderBy: OrderByContract) => {
      query.addOrderBy(`${alias}.${orderBy.key}`, orderBy.ordenation)
    })

    return query
  }

  private factoryIncludes(
    query: SelectQueryBuilder<any>,
    includes: IncludesContract[],
    alias?: string,
  ) {
    if (!alias) {
      alias = query.alias
    }

    includes.map((include: IncludesContract) => {
      const includeAlias = `${include.relation}`.toLocaleUpperCase()

      query.leftJoinAndSelect(`${alias}.${include.relation}`, includeAlias)

      if (include.where) {
        this.factoryWhere(query, include.where, includeAlias)
      }

      if (include.orderBy) {
        this.factoryOrderBy(query, include.orderBy, includeAlias)
      }

      if (include.includes) {
        this.factoryIncludes(query, include.includes, includeAlias)
      }
    })

    return query
  }

  async getAll(pagination: any, data?: ApiRequestContract) {
    const Query = this.createQueryBuilder(this.Schema)

    let page = 0
    let limit = 0

    if (pagination !== 'unpaginated') {
      page = pagination.page || 0
      limit = pagination.limit || 10

      Query.skip(page)
      Query.take(limit)
    }

    if (!data) {
      return Query.getMany()
    }

    const { where, orderBy, includes } = data

    if (includes) {
      this.factoryIncludes(Query, includes)
    }

    if (where) {
      this.factoryWhere(Query, where)
    }

    if (orderBy) {
      this.factoryOrderBy(Query, orderBy)
    }

    return {
      data: await Query.getMany(),
      pagination: {
        page,
        limit,
      },
    }
  }

  async storeOne(body: any) {
    return this.save(this.create(body))
  }

  async getOne(id?: string | null, data?: ApiRequestContract) {
    const Query = this.createQueryBuilder()

    if (id) {
      Query.where({ id })
    }

    if (!data) {
      return Query.getOne()
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

    return Query.getOne()
  }
}
