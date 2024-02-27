import { useMemo, ReactNode, MouseEventHandler } from 'react'
import { TableProps } from '..'
import type { ColumnProps } from 'antd/lib/table/Column'

export type ColumnWidthChangeHandler = (dataIndex: DataIndex, width: number, event: MouseEventHandler<HTMLTableHeaderCellElement>) => void

type DataIndex = string | number

type ColumnsType<RecordType> = Omit<ColumnProps<RecordType>, 'dataIndex' | 'fixed'> & {
  dataIndex: DataIndex
  plainTitle?: ReactNode
  resizable?: boolean
  allowHidden?: boolean
}

interface Props<RecordType> {
  columns?: ColumnsType<RecordType>[]
  rowOperation: TableProps<RecordType>['rowOperation']
  onColumnSizeChange?: ColumnWidthChangeHandler
}

export const OPERATION_COLUMN_KEY = 'hhTableOperation'

const useColumn = <RecordType>(props: Props<RecordType>) => {
  const { columns, rowOperation, onColumnSizeChange } = props

  const renderColumns = useMemo<any[]>(() => {
    if (!columns || !Array.isArray(columns)) {
      return []
    }

    return columns.map(column => {
      const { dataIndex, title, resizable } = column

      return {
        align: 'center',

        allowHidden: false,

        plainTitle: title,

        key: dataIndex,

        ...column,

        onHeaderCell: (column: ColumnsType<RecordType>) => ({
          width: column.width || 100,
          resizable,
          onResize: (e: any, props: any) => {
            return onColumnSizeChange?.(dataIndex, props?.size?.width, e)
          },
        } as any),
      }
    })
  }, [columns, onColumnSizeChange])

  return useMemo<ColumnsType<RecordType>[]>(() => {
    if (!rowOperation || typeof rowOperation !== 'function') {
      return renderColumns
    }

    return renderColumns.concat({
      dataIndex: OPERATION_COLUMN_KEY,
      key: OPERATION_COLUMN_KEY,
      fixed: 'right',
      align: 'center',
      title: '操作',
      plainTitle: '操作',
      width: 100,
      render: (text: any, record: any) => rowOperation(record),
    })
  }, [renderColumns, rowOperation])
}

export default useColumn

export type {
  ColumnsType,
}
