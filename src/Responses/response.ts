import { ISecResponse } from './types'

export class SecResponse {
  public withCollection<TData = any>(
    dataObj: Array<TData>,
    message?: string,
  ): ISecResponse<TData> {
    return {
      status: 'success',
      message,
      data: dataObj,
    }
  }

  public withOne<TData = object>(
    dataObj: object,
    message?: string,
  ): ISecResponse<TData> {
    return {
      status: 'success',
      message,
      data: dataObj,
    }
  }

  public withoutBody<TData = any>(message?: string): ISecResponse<TData> {
    return {
      status: 'success',
      message,
    }
  }

  public withError<TData = any>(
    dataObj?: any,
    message?: string,
    code?: string,
    httpStatus?: number,
  ): ISecResponse<TData> {
    return {
      data: dataObj || null,
      status: 'error',
      message,
      error: {
        code,
        httpStatus,
      },
    }
  }

  public withValidationError<TData = any>(
    dataObj?: any,
    validation?: any,
    message?: string,
    code?: string,
    httpStatus?: number,
  ): ISecResponse<TData> {
    return {
      data: dataObj || null,
      status: 'error',
      message,
      error: {
        code,
        httpStatus,
        validation: validation || null,
      },
    }
  }
}
