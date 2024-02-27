import { Key, useCallback, useMemo, useState } from 'react'
import { ColumnsType, ColumnSetterProps } from '..'
import { noop } from '../../../helpers/lib'
import useControlledState from '../../../helpers/useControlledState'
import useStorage from '../../../helpers/useStorage'
import { uniq, find, pick } from 'lodash-es'

const isPresent = <T>(t: T | undefined | null | void): t is T => {
  return t !== undefined && t !== null
}

type ColumnSetterCommonProps<RecordType> = {
  hideButton?: boolean

  defaultVisible?: boolean
  visible: boolean
  setVisible: (visible: boolean) => void

  visibleColumns: ColumnsType<RecordType>[]
  setVisibleColumns: (visibleColumns: ColumnsType<RecordType>[]) => void
}

const getDefaultVisibleColumns = <RecordType extends object = any>(
  columns: ColumnsType<RecordType>[] = [],
  savedVisibleColumn: { key: Key, allowHidden: boolean }[] = [],
) => {
  const shouldCalSaved = Array.isArray(savedVisibleColumn) && savedVisibleColumn.length > 0
  const defaultColumns = (columns || []).filter(isPresent)

  if (!shouldCalSaved) {
    return defaultColumns
  }

  if (!Array.isArray(columns)) {
    return []
  }

  const defaultColumnKeys = defaultColumns.map(c => c.key!)

  const extraVisibleColumnKeys = savedVisibleColumn.filter(item => defaultColumnKeys.includes(item.key)).map(item => item.key)

  return uniq(extraVisibleColumnKeys.concat(defaultColumnKeys))
    .map(key => ({ ...find(columns, { key }), ...find(savedVisibleColumn, { key }) }))
    .filter(isPresent) as ColumnsType<RecordType>[]
}

const useColumnSetter = <RecordType extends object = any>(
  tableId: Key,
  columns: ColumnsType<RecordType>[],
  columnSetterProps?: ColumnSetterProps<RecordType>,
): ColumnSetterCommonProps<RecordType> => {
  const { getValue, setValue } = useStorage<{ key: Key, allowHidden: boolean }[]>(`hh-table-column-id:${tableId}`)
  const [renderFlag, setRenderFlag] = useState(true)

  const props = useMemo(() => {
    const visibleColumns = getValue() ?? []

    if (!columnSetterProps) {
      return {
        hideButton: false,
        defaultVisible: false,
        visibleColumns: getDefaultVisibleColumns<RecordType>(columns, visibleColumns ?? []),
      }
    }

    return {
      hideButton: columnSetterProps?.hideButton ?? false,

      defaultVisible: false,
      visible: columnSetterProps?.visible ?? undefined,
      onVisibleChange: columnSetterProps.onVisibleChange || noop,

      defaultVisibleColumns: [],
      visibleColumns: columnSetterProps?.visibleColumns ?? getDefaultVisibleColumns<RecordType>(columns, visibleColumns ?? []) ?? undefined,
      onVisibleColumnsChange: columnSetterProps.onVisibleColumnsChange || noop,
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columnSetterProps, columns, getValue, renderFlag])

  const [visibleColumns, setVisibleColumns] = useControlledState(props.visibleColumns, props.defaultVisibleColumns, props.onVisibleColumnsChange)

  const [visible, setVisible] = useControlledState(props.visible, props.defaultVisible, props.onVisibleChange)

  const onVisibleColumnsChange = useCallback((newColumns: ColumnsType<RecordType>[]) => {
    setValue(newColumns.map(c => pick(c, ['key', 'allowHidden'])) as any)

    setVisibleColumns(newColumns)

    setRenderFlag(p => !p)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    hideButton: props.hideButton,

    visible: visible!,
    setVisible,

    visibleColumns: visibleColumns!,
    setVisibleColumns: onVisibleColumnsChange,
  }
}

export default useColumnSetter

export type {
  ColumnSetterCommonProps
}
