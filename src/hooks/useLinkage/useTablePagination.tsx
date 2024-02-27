import { useCallback, useMemo } from 'react'
import { PaginationProps } from 'antd'
import { PaginationConfigs, PaginationState } from './types'

export const PAGE_SIZE_OPTIONS = [10, 20, 50, 100]

const useTablePagination = (
  total: number,
  current: number,
  pageSize: number,
  paginationConfigs: PaginationConfigs,
  onPaginationChange: (pagination: Partial<PaginationState>) => void
): PaginationProps => {
  const onPageChange = useCallback(() => {
    return (page: number, pageSize: number) => {
      onPaginationChange({ current: page, pageSize })
    }
  }, [onPaginationChange])

  return {
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: (total) => `共${total}条`,
    current,
    pageSize,
    total,
    pageSizeOptions: PAGE_SIZE_OPTIONS,
    ...paginationConfigs,
    onChange: useMemo(() => onPageChange(), [onPageChange]),
    size: 'small',
  }
}

export default useTablePagination
