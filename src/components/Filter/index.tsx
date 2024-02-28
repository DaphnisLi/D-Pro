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
import { createStyles } from '../../styles/instance'
import FilterContent from './components/FilterContent'
import useControlledState from '../../helpers/useControlledState'
import { FilterContext } from './hooks/useFilterValue'

const useStyles = createStyles(({ css }) => {
  return {
    filter: css`
      margin-bottom: 32px;
    `,
  }
})

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
    onReset,
    ...restProps
  } = props

  const { styles, cx } = useStyles()

  const [filterValue, setFilterValue] = useControlledState(value, defaultValue, onChange)

  const onFilterValueChange = useCallback((value: Partial<T>) => {
    setFilterValue(({ ...filterValue, ...value } as T))
  }, [filterValue, setFilterValue])

  const onResetFilterValue = useCallback(() => {
    setFilterValue(defaultValue!)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <FilterContext.Provider
      value={{
        value: filterValue,
        onChange: onFilterValueChange,
      }}
    >
      <Row
        ref={ref}
        className={cx(styles.filter, 'd-pro-filter', className)}
        style={style}
        gutter={[24, 12]}
      >
        <FilterContent
          filterValue={filterValue}
          onResetFilterValue={onResetFilterValue}
          {...restProps}
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
  Filter.displayName = 'DProFilter'
}

export type {
  FilterProps,
  FieldChildProps,
  FilterFieldProps,
  FilterInputProps,
  FilterSelectProps,
  FilterDatePickerProps,
  FilterRangePickerProps
}
