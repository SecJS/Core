import { paginate } from '@secjs/utils'
import { Model, Document, isValidObjectId } from 'mongoose'
import { ApiRequestContract, IncludesContract, OrderByContract, WhereContract, PaginationContract, PaginatedResponse } from '@secjs/contracts'

export abstract class MongooseRepository<TModel extends Document> {
  protected abstract Model: Model<TModel>

  private factoryRequest(query: any, options?: ApiRequestContract) {
    if (!options) {
      return
    }

    const { where, orderBy, includes } = options

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

  private factoryWhere(query: any, where: WhereContract) {
    Object.keys(where).forEach(key => {
      const value = where[key]

      query.where(key, value)
    })
  }

  private factoryOrderBy(query: any, orderBy: OrderByContract) {
    Object.keys(orderBy).forEach(key => {
      const value = orderBy[key]

      query.sort(key, value)
    })
  }

  private factoryIncludes(query: any, includes: IncludesContract[]) {
    includes.forEach(include => {
      query.populate(include.relation)
    })
  }

  /**
   * Retrieves one data from Database
   *
   * @param id The id of the model
   * @param options The options used to filter data
   * @return The model founded or null
   * @throws Error when id is not a valid ObjectId
   */
  async getOne(id?: string, options?: ApiRequestContract): Promise<TModel | null> {
    const query = this.Model.findOne()

    if (id) {
      if (!isValidObjectId(id)) {
        throw new Error('NOT_VALID_OBJECT_ID')
      }

      query.where('_id', id)
    }

    this.factoryRequest(query, options)

    return query.exec()
  }

  /**
   * Retrieves multiple data from Database
   *
   * @param pagination The pagination used to paginate data
   * @param options The options used to filter data
   * @return The paginated response with models retrieved
   */
  async getAll(
    pagination?: PaginationContract,
    options?: ApiRequestContract,
  ): Promise<PaginatedResponse<TModel>> {
    const query = this.Model.find()

    if (pagination) {
      query.skip(pagination.page || 0).limit(pagination.limit || 10)
    }

    this.factoryRequest(query, options)

    return paginate(await query.exec(), await query.countDocuments(), pagination || { page: 0, limit: 10 })
  }

  /**
   * Store one in database
   *
   * @param body The body that is going to be used to create
   * @return The model created with body information
   */
  async storeOne(body: any): Promise<TModel> {
    return new this.Model(body).save()
  }

  /**
   * Update one from database
   *
   * @param id The id or model that is going to be updated
   * @param body The body that is going to be used to update
   * @return The model updated with body information
   * @throws Error if cannot find model with ID
   */
  async updateOne(id: any, body: any): Promise<TModel> {
    let model = id

    if (typeof id === 'string') {
      model = await this.getOne(id)

      if (!model) {
        throw new Error('MODEL_NOT_FOUND_UPDATE')
      }
    }

    Object.keys(body).forEach(key => {
      model[key] = body[key]
    })

    return model.save()
  }

  /**
   * Delete one from database
   *
   * @param id The id or model that is going to be deleted
   * @param soft If is a soft delete or a true delete from database
   * @return The model soft deleted or void if deleted
   * @throws Error if cannot find model with ID
   */
  async deleteOne(id: any, soft = true): Promise<TModel | void> {
    let model = id

    if (typeof id === 'string') {
      model = await this.getOne(id)

      if (!model) {
        throw new Error('MODEL_NOT_FOUND_DELETE')
      }
    }

    if (soft) {
      model.deletedAt = new Date()

      return model.save()
    }

    await model.deleteOne()
  }
}
