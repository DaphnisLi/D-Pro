import { useCallback, useState, useRef, useEffect } from 'react'
import { TableFetchParams, PaginationState, UseLinkageProps, IsomorphicResponse, TableFetchData } from './types'
import useTableFetch from './useTableFetch'
import { assign } from 'lodash-es'

const useTableData = <TList extends object = any, TFilter extends object = any, TParams extends object = any>(
  options: UseLinkageProps<TList, TFilter, TParams>
) => {
  const {
    fetch,
    params,
    debounceTime,

    defaultFilter,
    defaultList,
    defaultTotal,
    defaultPagination,
  } = options

  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState<IsomorphicResponse<TableFetchData<TList>>[0]>(null)

  const totalRef = useRef(defaultTotal ?? 0)
  const total = totalRef.current
  const setTotal = useCallback((total: number) => {
    totalRef.current = total
  }, [])

  const listRef = useRef(defaultList ?? [])
  const list = listRef.current
  const setList = useCallback((list: TList[]) => {
    listRef.current = list
  }, [])

  const [filter, setFilter] = useState<TFilter>(defaultFilter ?? ({} as TFilter))

  const [pagination, setPagination] = useState<PaginationState>({
    current: defaultPagination?.current ?? 1,
    pageSize: defaultPagination?.pageSize ?? 10,
  })

  const paginationRef = useRef(pagination)

  const [requestParams, setRequestParams] = useState<TableFetchParams<TFilter, TParams>>({
    params,
    filter,
    pagination,
  })

  const { onRequest } = useTableFetch<TList, TFilter, TParams>({
    fetch,
    requestParams,
    setList,
    setTotal,
    setResponse,
    setLoading,
    debounceTime,
  })

  useEffect(() => {
    onRequest()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params])

  const onFilterChange = useCallback((filterUpdater: Partial<TFilter> | ((oldFilter: TFilter) => TFilter)) => {
    let nextFilter: TFilter = filter

    if (typeof filterUpdater === 'function') {
      nextFilter = filterUpdater(filter)
    } else {
      nextFilter = assign({}, filter, filterUpdater)
    }

    const nextPagination = { current: 1, pageSize: pagination.pageSize }
    setFilter(nextFilter)
    setPagination(nextPagination)

    setRequestParams(r => ({ ...r, filter: nextFilter, pagination: nextPagination }))
  }, [filter, pagination])

  const onFilterReset = useCallback(() => {
    onFilterChange(() => (defaultFilter ?? ({} as TFilter)))
  }, [onFilterChange, defaultFilter])

  const onPaginationChange = useCallback((paginationUpdater: Partial<PaginationState> | ((oldPagination: PaginationState) => PaginationState)) => {
    let nextPagination: PaginationState = paginationRef.current

    if (typeof paginationUpdater === 'function') {
      nextPagination = paginationUpdater(paginationRef.current)
    } else {
      nextPagination = assign({}, paginationRef.current, paginationUpdater)
    }

    paginationRef.current = nextPagination

    setPagination(nextPagination)
    setRequestParams(r => ({ ...r, pagination: nextPagination }))
    onRequest()
  }, [onRequest])

  return {
    loading,
    total,
    list,
    filter,
    pagination,
    response,

    onRequest,
    onFilterChange,
    onFilterReset,
    onPaginationChange,
  }
}

export default useTableData
