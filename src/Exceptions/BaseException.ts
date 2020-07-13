import { ISecResponse, SecResponse } from '../Responses'

export abstract class BaseException extends Error {
  public isMakeBaseException = true
  public httpStatus?: number
  public data?: any

  constructor(public message: string, public code?: string) {
    super(message)
  }

  getSecResponse(): ISecResponse<any> {
    return new SecResponse().withError(
      this.data,
      this.message,
      this.code,
      this.httpStatus,
    )
  }
}
