import { Key } from 'react'
import { PaginationProps } from 'antd'

export interface CommonResponse {
  /** 业务返回码 */
  code?: number
  /** 业务信息 */
  message: string
  /** 链路追踪 id */
  traceId?: string
}

export type CommonError = CommonResponse & Partial<Error>

export interface CommonSuccess<T> extends CommonResponse {
  /** 数据 */
  data: T
}

export type PaginationConfigs = Pick<PaginationProps, 'disabled' | 'size' | 'pageSizeOptions' | 'showSizeChanger' | 'showQuickJumper'>

export interface PaginationState {
  current: number

  pageSize: number
}

export type TableFetchParams<TFilter extends object = any, TParams extends object = any> = {
  filter: TFilter
  pagination: PaginationState
  params?: TParams
}

export type TableFetchData<TList extends object = any> = { total: number, list: TList[] }

export type IsomorphicResponse<TData = any> = [CommonSuccess<TData> | null, CommonError | null]

export type TableFetcher<
  TList extends object = any,
  TFilter extends object = any,
  TParams extends object = any,
> = (options: TableFetchParams<TFilter, TParams>) => IsomorphicResponse<TableFetchData<TList>> | Promise<IsomorphicResponse<TableFetchData<TList>>> | null

export interface UseTableFetch<TList extends object = any, TFilter extends object = any, TParams extends object = any> {
  fetch: UseLinkageProps<TList, TFilter, TParams>['fetch']
  requestParams: TableFetchParams<TFilter, TParams>
  setList: (list: TList[]) => void
  setTotal: (total: number) => void
  setResponse: (response: IsomorphicResponse<TableFetchData<TList>>[0]) => void
  setLoading: (loading: boolean) => void
  debounceTime?: number
}

export interface UseLinkageProps<
  TList extends object = any,
  TFilter extends object = any,
  TParams extends object = any,
> {
  key: Key

  params?: TParams

  defaultFilter?: TFilter
  defaultTotal?: number
  defaultList?: TList[]
  defaultPagination?: Partial<PaginationState>

  paginationConfigs?: PaginationConfigs

  fetch?: TableFetcher<TList, TFilter, TParams>
  // 请求防抖时间, 默认 200ms
  debounceTime?: number

  // 保存模版的最大缓存量
  snapshotQuota?: number
}
