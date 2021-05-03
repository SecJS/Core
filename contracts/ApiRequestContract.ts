export interface ApiRequestContract {
  isInternRequest?: boolean
  where?: WhereContract
  orderBy?: OrderByContract
  includes?: IncludesContract[]
}

export interface IncludesContract {
  relation?: any
  where?: WhereContract
  orderBy?: OrderByContract
  includes?: IncludesContract[]
}

export interface WhereContract {
  [key: string]: string | number | boolean | object
}

export interface OrderByContract {
  [key: string]: 'ASC' | 'DESC'
}
