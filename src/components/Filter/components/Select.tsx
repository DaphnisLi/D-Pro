import React, { Key, ReactElement, Ref, RefAttributes } from 'react'
import { Select, SelectProps, RefSelectProps } from 'antd'
import forwardRefWithStatics from '../../../helpers/forwardRefWithStatics'
import FilterField, { FilterFieldProps } from './Field'
import { useFieldProps } from '../hooks/useFieldProps'
import ForwardRefFC from '../../../types/forwardRefFc'
import { cx } from '../../../styles/instance'

type FilterSelectProps = FilterFieldProps & Omit<SelectProps<Key>, 'defaultValue' | 'value' | 'onChange'>

type FilterSelectFn = ForwardRefFC<{
  (props: FilterSelectProps & RefAttributes<RefSelectProps>, ref: Ref<RefSelectProps>): ReactElement | null
}> & {
  Option: typeof Select.Option
  OptGroup: typeof Select.OptGroup
}

const FilterSelect = (forwardRefWithStatics<FilterSelectProps, RefSelectProps>((props, ref) => {
  const { fieldProps, restProps } = useFieldProps(props)

  return (
    <FilterField {...fieldProps}>
      <Select
        ref={ref}
        placeholder="请选择"
        {...restProps}
        className={cx('d-pro-filter-select', restProps.className)}
      />
    </FilterField>
  )
}, {
  Option: Select.Option,
  OptGroup: Select.OptGroup,
}) as FilterSelectFn)

if (process.env.NODE_ENV !== 'production') {
  FilterSelect.displayName = 'DProFilterSelect'
}

export default FilterSelect

export type {
  FilterSelectProps,
}
