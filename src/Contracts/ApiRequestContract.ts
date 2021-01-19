export interface ApiRequestContract {
  where?: WhereContract[]
  orderBy?: OrderByContract[]
  includes?: IncludesContract[]
}

export interface IncludesContract {
  relation: any
  where?: WhereContract[]
  orderBy?: OrderByContract[]
  includes?: IncludesContract[]
}

export interface WhereContract {
  key: string
  value: string | number | boolean
}

export interface OrderByContract {
  key: string
  ordenation: 'ASC' | 'DESC'
}
