import React, { ReactElement, ReactNode, useCallback, useMemo, Children, cloneElement } from 'react'
import { Col, Form } from 'antd'
import { createStyles } from '../../../styles/instance'
import type { FormItemProps } from 'antd'
import colSpan from '../../../helpers/layout'
import StyledProps from '../../../types/styledProps'
import { useFilterValue } from '../hooks/useFilterValue'

const useStyles = createStyles(({ css }) => {
  return {
    formItem: css`
      margin-bottom: 0;
    `,
  }
}, { hashPriority: 'high' })

interface FieldChildProps<V = any> {
  value: V
  onChange: (e: any) => void
}

type FilterFieldFn = <T extends any>(props: FilterFieldProps<T>) => ReactElement

interface FilterItemCommonProps extends Pick<FormItemProps, 'tooltip' | 'wrapperCol' | 'labelCol' | 'colon' | 'labelAlign' | 'label'> {
  // 所属 key
  field: string

  // 不进行 Form.Item 封装
  compact?: boolean

  // 提示消息
  tip?: ReactNode
}

interface FilterFieldProps<V = any> extends Omit<FilterItemCommonProps, 'fieldClassName' | 'fieldStyle'>, StyledProps {
  // 原始组件，设置为 true 不代理
  pureChildren?: boolean

  // 子元素
  children?: ReactElement | ((controlledProps: FieldChildProps<V>) => ReactNode)
}

const FilterField = (<V extends any>(props: FilterFieldProps<V>) => {
  const {
    compact = false,
    field,
    pureChildren,
    children,
    className,
    style,
    ...restProps
  } = props

  const { styles, cx } = useStyles()

  const { value, onChange } = useFilterValue(field)

  const onValueChange = useCallback(async (e: any) => {
    const value = (e && e.target) ? e.target.value : e

    if (!value) {
      onChange(undefined)
      return
    }

    if (Array.isArray(value) && value.filter(Boolean).length === 0) {
      onChange(undefined)
      return
    }

    onChange(value)
  }, [onChange])

  const realChildren = useMemo(() => {
    if (pureChildren || !children) {
      return children
    }

    if (typeof children === 'function') {
      return children({ value, onChange: onValueChange })
    }

    Children.only(children)

    return cloneElement(children, { value, onChange: onValueChange })
  }, [value, onValueChange, pureChildren, children])

  if (compact) {
    return realChildren
  }

  return (
    <Col {...colSpan} style={style} className={cx('d-pro-filter-item-wrap', className)}>
      <Form.Item
        {...restProps}
        className={cx(styles.formItem, 'd-pro-filter-item')}
      >
        {realChildren}
      </Form.Item>
    </Col>
  )
}) as FilterFieldFn

export default FilterField

export type {
  FieldChildProps,
  FilterFieldProps,
}
