import { useMemo } from 'react'
import useTableData from './useTableData'
import useTablePagination from './useTablePagination'
import useFilterProps from './useFilterProps'
import { UseLinkageProps } from './types'
import { TableProps } from '../../components/Table'
import useFilterSnapshot from './useFilterSnapshot'

export const useLinkage = <
  TList extends object = any,
  TFilter extends object = any,
  TParams extends object = any,
>(options: UseLinkageProps<TList, TFilter, TParams>) => {
  const { key, paginationConfigs, snapshotQuota } = options ?? {}

  const {
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
  } = useTableData<TList, TFilter, TParams>(options)

  const [snapshotValue, addSnapshotItem, removeSnapshotItem, checkSnapshotItem] = useFilterSnapshot<TFilter>(key, snapshotQuota)

  const filterProps = useFilterProps({
    id: key,
    filter,
    defaultFilter: options.defaultFilter,
    onFilterChange,
    onFilterReset,
    onRequest,
    addSnapshotItem,
    checkSnapshotItem,
  })

  const filterSnapshotProps = useMemo(() => ({
    value: snapshotValue!,
    remove: removeSnapshotItem,
    setFilter: (filter: TFilter) => {
      onFilterChange(() => filter)
    },
    handleSearch: onRequest
  }), [snapshotValue, removeSnapshotItem, onRequest, onFilterChange])

  const paginationProps = useTablePagination(
    total,
    pagination.current,
    pagination.pageSize,
    paginationConfigs ?? {},
    onPaginationChange,
  )

  const tableProps = useMemo<TableProps<TList>>(() => ({
    id: key,
    loading,
    dataSource: list,
    pagination: paginationProps,
  }), [key, loading, list, paginationProps])

  return {
    loading,
    total,
    list,
    filter,
    pagination,
    response,

    tableProps,
    filterProps,
    filterSnapshotProps,

    reload: onRequest,
    onFilterChange,
    onPaginationChange,
  }
}

export * from './types'
