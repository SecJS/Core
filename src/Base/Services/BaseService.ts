import { ApiRequestContract } from "../../Contracts"

export class BaseService {
  public async initRequest(data: ApiRequestContract) {
    if (!data.where) {
      data.where = []
    }

    if (!data.orderBy) {
      data.orderBy = []
    }

    if (!data.includes) {
      data.includes = []
    }
  }
}
