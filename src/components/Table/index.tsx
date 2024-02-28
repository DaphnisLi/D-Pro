import React, { CSSProperties, Key, ReactElement, ReactNode, Ref, RefAttributes, useMemo } from 'react'
import { Table as AntdTable, TableProps as AntdTableProps, Flex } from 'antd'
import forwardRefWithStatics from '../../helpers/forwardRefWithStatics'
import StyledProps from '../../types/styledProps'
import ForwardRefFC from '../../types/forwardRefFc'
import ColumnSetterModal from './components/columnSetter/ColumnSetterModal'
import ResizableHeaderCell from './components/ResizableHeaderCell'
import useColumn, { ColumnsType, ColumnWidthChangeHandler } from './hook/useColumn'
import useRowSelection, { TableRowSelectionProps } from './hook/useRowSelection'
import useColumnSetter from './hook/useColumnSetter'
import ColumnSetterBtn from './components/columnSetter/ColumnSetterBtn'
import TableOperations from './components/operation/Operation'
import { createStyles } from '../../styles/instance'

const useStyles = createStyles(({ css }) => {
  return {
    operation: css`
      margin-bottom: 20px;
    `,
  }
})

type ScrollConfig = {
  index?: number
  key?: Key
  top?: number
}

type Reference = {
  nativeElement: HTMLDivElement
  scrollTo: (config: ScrollConfig) => void
}

type TableFn = ForwardRefFC<{
  <RecordType extends object = any>(props: TableProps<RecordType> & RefAttributes<HTMLDivElement>, ref: Ref<HTMLDivElement>): ReactElement | null
}> & {
  Operations: typeof TableOperations
}

type ColumnSetterProps<RecordType> = null | {
  hideButton?: boolean

  defaultVisible?: boolean
  visible?: boolean
  onVisibleChange?: (visible: boolean) => void

  visibleColumns?: ColumnsType<RecordType>[]
  onVisibleColumnsChange?: (visibleColumns: ColumnsType<RecordType>[]) => void
}

interface TableProps<RecordType> extends StyledProps, Omit<AntdTableProps<RecordType>, 'id' | 'columns' | 'rowSelection'> {
  id: Key

  columns?: ColumnsType<RecordType>[]

  rowSelection?: TableRowSelectionProps<RecordType>

  renderOperationBar?: () => ReactNode

  columnSetter?: ColumnSetterProps<RecordType>

  rowOperation?: (record: RecordType) => ReactNode

  tableClassName?: string

  tableStyle?: CSSProperties

  onColumnSizeChange?: ColumnWidthChangeHandler
}

const tableComponents = {
  header: {
    cell: ResizableHeaderCell,
  },
}

export const Table = forwardRefWithStatics(<RecordType extends object = any>(props: TableProps<RecordType>, ref: Ref<Reference>) => {
  const {
    id,
    renderOperationBar,
    columns: propsColumns,
    rowOperation,
    columnSetter,
    dataSource,
    rowSelection,
    className,
    style,
    tableClassName,
    tableStyle,
    onColumnSizeChange,
    ...restProps
  } = props

  const { styles, cx } = useStyles()

  const columns = useColumn<RecordType>({
    columns: propsColumns,
    rowOperation,
    onColumnSizeChange,
  })

  const rawRowSelection = useRowSelection<RecordType>(rowSelection)

  const columnSetterCommonProps = useColumnSetter<RecordType>(id, columns, columnSetter)

  const operationBar = useMemo(() => (
    <div className={cx(styles.operation, 'd-pro-table-operation-bar')}>
      <Flex gap={12} justify="flex-end">
        {renderOperationBar?.()}
        <ColumnSetterBtn
          hideButton={columnSetterCommonProps.hideButton}
          setVisible={columnSetterCommonProps.setVisible}
        />
      </Flex>
    </div>
  ), [renderOperationBar, columnSetterCommonProps.hideButton, columnSetterCommonProps.setVisible, cx, styles])

  return (
    <div className={cx('d-pro-table', className)} style={style}>
      {operationBar}

      <AntdTable
        ref={ref}
        dataSource={dataSource}
        components={tableComponents}
        rowSelection={rawRowSelection}
        columns={columnSetterCommonProps.visibleColumns.filter(c => !c.allowHidden)}
        className={tableClassName}
        style={tableStyle}
        size="small"
        {...restProps}
      />

      <ColumnSetterModal {...columnSetterCommonProps} />
    </div>
  )
}, {
  Operations: TableOperations,
}
) as unknown as TableFn

if (process.env.NODE_ENV !== 'production') {
  Table.displayName = 'DProTable'
}

export type {
  TableProps,
  ColumnsType,
  ColumnSetterProps
}
