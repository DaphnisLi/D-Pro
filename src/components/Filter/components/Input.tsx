import React, { forwardRef } from 'react'
import { Input, InputProps, InputRef } from 'antd'
import FilterField, { FilterFieldProps } from './Field'
import { useFieldProps } from '../hooks/useFieldProps'
import { cx } from '../../../styles/instance'

type FilterInputProps = FilterFieldProps & Omit<InputProps, 'defaultValue' | 'value' | 'onChange'>

const FilterInput = forwardRef<InputRef, FilterInputProps>((props, ref) => {
  const { fieldProps, restProps } = useFieldProps(props)

  return (
    <FilterField {...fieldProps}>
      <Input
        style={{ width: '100%' }}
        ref={ref}
        placeholder="请输入"
        {...restProps}
        className={cx('d-pro-filter-input', restProps.className)}
      />
    </FilterField>
  )
})

if (process.env.NODE_ENV !== 'production') {
  FilterInput.displayName = 'DProFilterInput'
}

export default FilterInput

export type {
  FilterInputProps,
}
