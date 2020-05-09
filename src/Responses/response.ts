import { IMakeResponse } from './types'

export class MakeResponse {
  withCollection<TData = any>(
    dataObj: Array<TData>,
    message?: string,
  ): IMakeResponse<TData> {
    return {
      status: 'success',
      message,
      data: dataObj,
    }
  }

  withOne<TData = object>(
    dataObj: object,
    message?: string,
  ): IMakeResponse<TData> {
    return {
      status: 'success',
      message,
      data: dataObj,
    }
  }

  withoutBody<TData = any>(message?: string): IMakeResponse<TData> {
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
  ): IMakeResponse<TData> {
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

  withValidationError<TData = any>(
    dataObj?: any,
    validation?: any,
    message?: string,
    code?: string,
    httpStatus?: number,
  ): IMakeResponse<TData> {
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
