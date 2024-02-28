import React, { forwardRef, Component } from 'react'
import { DatePicker as AntdDatePicker, DatePickerProps } from 'antd'
import type { CommonPickerMethods } from 'antd/lib/date-picker/generatePicker/interface'
import FilterField, { FilterFieldProps } from './Field'
import { useFieldProps } from '../hooks/useFieldProps'
import { createStyles } from '../../../styles/instance'
import dayjs from 'dayjs'

const useStyles = createStyles(({ css }) => {
  return {
    datePicker: css`
      &.antd5-picker {
        width: 100%;
      }
  `,
  }
})

type FilterDatePickerProps = FilterFieldProps & DatePickerProps

const DatePicker = forwardRef<Component<DatePickerProps> & CommonPickerMethods, DatePickerProps>((props, ref) => {
  const { value, onChange, ...restProps } = props

  const { styles, cx } = useStyles()

  return (
    <AntdDatePicker
      value={value ? dayjs(value) : undefined}
      onChange={onChange}
      ref={ref}
      placeholder="请选择时间"
      {...restProps}
      className={cx(styles.datePicker, 'd-pro-filter-date-picker', restProps.className)}
    />
  )
})

const FilterDatePicker = forwardRef<Component<DatePickerProps> & CommonPickerMethods, FilterDatePickerProps>((props, ref) => {
  const { fieldProps, restProps } = useFieldProps(props)

  return (
    <FilterField {...fieldProps}>
      <DatePicker {...restProps} ref={ref} />
    </FilterField>
  )
})

if (process.env.NODE_ENV !== 'production') {
  FilterDatePicker.displayName = 'DProFilterDatePicker'
}

export default FilterDatePicker

export type {
  FilterDatePickerProps,
}
