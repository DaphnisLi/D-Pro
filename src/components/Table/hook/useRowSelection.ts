import { useMemo } from 'react'
import type { TableRowSelection } from 'antd/lib/table/interface'

type TableRowSelectionProps<RecordType> = TableRowSelection<RecordType>

const useRowSelection = <RecordType>(rowSelection?: TableRowSelectionProps<RecordType>) => {
  const rawRowSelection = useMemo<TableRowSelection<RecordType> | undefined>(() => {
    if (!rowSelection) {
      return rowSelection
    }

    const { onChange, ...restProps } = rowSelection

    const handleChange: TableRowSelection<RecordType>['onChange'] = (selectedRowKeys, selectedRows, info) => {
      if (typeof onChange === 'function') {
        onChange(selectedRowKeys, selectedRows, info)
      }
    }

    return {
      ...restProps,
      onChange: handleChange,
    }
  }, [rowSelection])

  return rawRowSelection
}

export default useRowSelection

export type {
  TableRowSelectionProps
}
