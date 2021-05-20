import { PaginationLinksContract, PaginationMetaContract } from './PaginationContract'

export interface ApiResponseContract {
  code: string
  path: string
  method: string
  status: number
  data: any
}

export interface PaginatedResponse<TModel> {
  data: TModel[]
  meta: PaginationMetaContract
  links: PaginationLinksContract
}


