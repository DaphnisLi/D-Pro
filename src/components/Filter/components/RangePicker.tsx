import React, { forwardRef, Component } from 'react'
import { DatePicker } from 'antd'
import type { RangePickerProps as AntdRangePickerProps } from 'antd/lib/date-picker'
import type { RangePickerDateProps } from 'antd/es/date-picker/generatePicker'
import type { CommonPickerMethods } from 'antd/lib/date-picker/generatePicker/interface'
import FilterField, { FilterFieldProps } from './Field'
import { useFieldProps } from '../hooks/useFieldProps'
import { createStyles } from '../../../styles/instance'
import dayjs, { Dayjs } from 'dayjs'

const useStyles = createStyles(({ css }) => {
  return {
    rangePicker: css`
      &.antd5-picker {
        width: 100%;
      }
    `,
  }
})

type RangePickerProps = AntdRangePickerProps & {
  showTime?: boolean | RangePickerDateProps<Dayjs>['showTime']
}

type FilterRangePickerProps = FilterFieldProps & RangePickerProps

const RangePicker = forwardRef<Component<AntdRangePickerProps> & CommonPickerMethods, RangePickerProps>((props, ref) => {
  const { value, onChange, ...restProps } = props

  const { styles, cx } = useStyles()

  return (
    <DatePicker.RangePicker
      value={value ? [dayjs(value[0]), dayjs(value[1])] : undefined}
      onChange={onChange}
      ref={ref}
      placeholder={['开始', '结束']}
      {...restProps}
      className={cx(styles.rangePicker, 'hh-filter-range-picker', restProps.className)}
    />
  )
})

const FilterRangePicker = forwardRef<Component<RangePickerProps> & CommonPickerMethods, FilterRangePickerProps>((props, ref) => {
  const { fieldProps, restProps } = useFieldProps(props)

  return (
    <FilterField {...fieldProps}>
      <RangePicker {...restProps} ref={ref} />
    </FilterField>
  )
})

if (process.env.NODE_ENV !== 'production') {
  FilterRangePicker.displayName = 'HhFilterRangePicker'
}

export default FilterRangePicker

export type {
  FilterRangePickerProps,
}
