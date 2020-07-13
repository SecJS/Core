export interface ISecResponse<TData = any> {
  status?: 'success' | 'error'
  message?: string
  data?: TData[] | TData | object
  error?: IError
}

export interface IError {
  code?: string
  httpStatus?: number
  validation?: IValidation
  stack?: any
}

export interface IValidation {
  message: string
  field: string
  validation: string
}
