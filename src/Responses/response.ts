import { ISecResponse } from './types'

export class SecResponse {
  withCollection<TData = any>(
    dataObj: Array<TData>,
    message?: string,
  ): ISecResponse<TData> {
    return {
      status: 'success',
      message,
      data: dataObj,
    }
  }

  withOne<TData = object>(
    dataObj: object,
    message?: string,
  ): ISecResponse<TData> {
    return {
      status: 'success',
      message,
      data: dataObj,
    }
  }

  withCreated<TData = object>(
    dataObj: object,
    message?: string,
  ): ISecResponse<TData> {
    return {
      status: 'success',
      message,
      data: dataObj,
    }
  }

  withUpdated<TData = object>(
    dataObj: object,
    message?: string,
  ): ISecResponse<TData> {
    return {
      status: 'success',
      message,
      data: dataObj,
    }
  }

  withDeleted<TData = any>(message?: string): ISecResponse<TData> {
    return {
      status: 'success',
      message,
    }
  }

  withoutBody<TData = any>(message?: string): ISecResponse<TData> {
    return {
      status: 'success',
      message,
    }
  }

  withError<TData = any>(
    dataObj?: any,
    message?: string,
    code?: string,
    httpStatus?: number,
    exception?: any,
  ): ISecResponse<TData> {
    let stack = null

    if (process.env.API_DEBUG && exception) {
      stack = exception.stack
    }

    return {
      data: dataObj || null,
      status: 'error',
      message,
      error: {
        code,
        httpStatus,
        stack,
      },
    }
  }

  withValidationError<TData = any>(
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
