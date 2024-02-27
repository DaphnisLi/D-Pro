import React, { Key, ReactNode, Ref, useCallback, RefAttributes, ReactElement } from 'react'
import { Row } from 'antd'
import type { FormItemProps } from 'antd'
import StyledProps from '../../types/styledProps'
import ForwardRefFC from '../../types/forwardRefFc'
import forwardRefWithStatics from '../../helpers/forwardRefWithStatics'
import FilterField, { FieldChildProps, FilterFieldProps } from './components/Field'
import FilterInput, { FilterInputProps } from './components/Input'
import FilterSelect, { FilterSelectProps } from './components/Select'
import FilterDatePicker, { FilterDatePickerProps } from './components/DatePicker'
import FilterRangePicker, { FilterRangePickerProps } from './components/RangePicker'
import { cx } from '../../styles/instance'
import useFieldSetter from './hooks/useFieldSetter'
import FilterContent from './components/FilterContent'
import useControlledState from '../../helpers/useControlledState'
import { FilterContext } from './hooks/useFilterValue'

type FieldSetterProps = {
  hideButton?: boolean

  defaultVisible?: boolean
  visible?: boolean
  onVisibleChange?: (visible: boolean) => void

  visibleFields?: ReactNode
  onVisibleFieldsChange?: (visibleFields: ReactNode) => void
}

interface FilterProps<TFilter extends object = any> extends StyledProps, Pick<FormItemProps, 'wrapperCol' | 'labelCol' | 'colon' | 'labelAlign'> {
  id: Key
  value?: TFilter
  defaultValue?: TFilter
  onChange?: (value: TFilter) => void

  maxShow?: number

  onFilterExpandChange?: (isExpand: boolean) => void

  showReset?: boolean
  onReset?: () => void

  onRequest?: () => void

  children?: ReactNode

  visibleSnapshot?: boolean
  addSnapshotItem?: (item: TFilter, title: string) => void
  checkSnapshotItem?: (title: string) => {
    isPass: boolean
    message: string
  }

  fieldSetter?: FieldSetterProps

  inquireRender?: (props: { search: () => void }) => ReactNode
}

type FilterFn = ForwardRefFC<{
  <T extends object = any>(props: FilterProps<T> & RefAttributes<HTMLDivElement>, ref: Ref<HTMLDivElement>): ReactElement | null
}> & {
  Field: typeof FilterField
  Input: typeof FilterInput
  Select: typeof FilterSelect
  DatePicker: typeof FilterDatePicker
  RangePicker: typeof FilterRangePicker
}

export const Filter = forwardRefWithStatics(<T extends object = {}>(
  props: FilterProps<T>,
  ref: Ref<HTMLDivElement>,
) => {
  const {
    id,
    value,
    defaultValue,
    onChange,
    className,
    style,
    fieldSetter,
    children,
    onReset,
    ...restProps
  } = props

  const [filterValue, setFilterValue] = useControlledState(value, defaultValue, onChange)

  // 值变化回调
  const onFilterValueChange = useCallback((value: Partial<T>) => {
    setFilterValue(({ ...filterValue, ...value } as T))
  }, [filterValue, setFilterValue])

  // 默认重置 filter 回调
  const onResetFilterValue = useCallback(() => {
    setFilterValue(defaultValue!)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fieldSetterCommonProps = useFieldSetter(id, children as ReactElement[], fieldSetter)

  return (
    <FilterContext.Provider
      value={{
        value: filterValue,
        onChange: onFilterValueChange,
      }}
    >
      <Row
        ref={ref}
        className={cx('hh-component-filter', className)}
        style={style}
        gutter={[24, 12]}
      >
        <FilterContent
          filterValue={filterValue}
          onResetFilterValue={onResetFilterValue}
          {...restProps}
          {...fieldSetterCommonProps}
        />
      </Row>
    </FilterContext.Provider>
  )
}, {
  Field: FilterField,
  Input: FilterInput,
  Select: FilterSelect,
  DatePicker: FilterDatePicker,
  RangePicker: FilterRangePicker,
}) as FilterFn

if (process.env.NODE_ENV !== 'production') {
  Filter.displayName = 'HhFilter'
}

export type {
  FilterProps,
  FieldSetterProps,
  FieldChildProps,
  FilterFieldProps,
  FilterInputProps,
  FilterSelectProps,
  FilterDatePickerProps,
  FilterRangePickerProps
}
