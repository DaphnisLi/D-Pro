import React, { Children, isValidElement, useCallback, useMemo, useRef, cloneElement, useState } from 'react'
import { FilterProps } from '..'
import { Button, Space, Col, Flex, Grid } from 'antd'
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons'
import { createStyles } from '../../../styles/instance'
import { noop } from '../../../helpers/lib'
import { get, findKey } from 'lodash-es'
import colSpan from '../../../helpers/layout'

const { useBreakpoint } = Grid

const useStyles = createStyles(({ css }) => {
  return {
    col: css`
      margin-left: auto;
    `,
    expand: css`
      white-space: nowrap;
    `,
    ellipsis: css`
      padding: 4px 8px;
    `,
  }
}, { hashPriority: 'high' })

interface Props<T> extends Pick<FilterProps, 'maxShow' | 'onFilterExpandChange' | 'showReset' | 'labelCol' | 'wrapperCol' | 'colon' | 'labelAlign' | 'onReset' | 'children'> {
  filterValue?: T
  onFilterValueChange?: (value: Partial<T>) => void
  onResetFilterValue?: () => void
  onRequest?: () => void
}

const maxShowCountMap = {
  xxl: 7,
  xl: 7,
  lg: 5,
  md: 5,
  sm: 3,
  xs: 2,
}

const FilterContent = <T extends object = any>(props: Props<T>) => {
  const {
    showReset = true,

    onFilterExpandChange = noop,
    onResetFilterValue,
    onRequest,

    colon = false,
    labelAlign = 'right',

    maxShow,
    labelCol,
    wrapperCol,
    onReset,
    children,
  } = props

  const { styles, cx } = useStyles()

  const screens = useBreakpoint()

  const enableExpandSwitcher = useRef(false)
  const [filterExpand, setFilterExpand] = useState(false)

  const handleSearch = useCallback(() => {
    onRequest?.()
  }, [onRequest])

  const handleReset = useCallback(() => {
    if (typeof onReset === 'function') {
      onReset()
    } else {
      onResetFilterValue?.()
    }
    handleSearch()
  }, [onReset, handleSearch, onResetFilterValue])

  const $children = useMemo(() => {
    let showCount = 0
    const maxShowCount: number = maxShow || get(maxShowCountMap, findKey(maxShowCountMap, (value, key) => (screens as any)[key])!)

    let total = 0

    const $children = Children.map(children ?? [], (child) => {
      if (!isValidElement(child) || !child.type || !child.props) {
        return null
      }

      if (typeof child.type === 'string') {
        return child
      }

      total++

      if (maxShowCount && maxShowCount > 0 && showCount >= maxShowCount && !filterExpand) {
        return null
      }

      showCount++
      return cloneElement(child as any, { labelCol, wrapperCol, colon, labelAlign })
    })

    if (total > showCount) {
      enableExpandSwitcher.current = true
    }

    return $children
  }, [maxShow, children, screens, filterExpand, labelCol, wrapperCol, colon, labelAlign])

  return (
    <>
      {$children}

      <Col {...colSpan} className={styles.col}>
        <Flex justify="end">
          <Space size={12}>
            {
              enableExpandSwitcher.current && (
                <a
                  className={cx(styles.expand, 'd-pro-filter-footer-expand')}
                  onClick={() => {
                    onFilterExpandChange && onFilterExpandChange(!filterExpand)
                    setFilterExpand(!filterExpand)
                  }}
                >
                  <Space size={2}>
                    <span>{`${filterExpand ? '收起' : '展开'}`}</span>
                    {filterExpand ? <CaretUpOutlined /> : <CaretDownOutlined />}
                  </Space>
                </a>
              )
            }

            <Button className="d-pro-filter-footer-inquire" type="primary" onClick={handleSearch}>查询</Button>

            {showReset && (
              <Button className="d-pro-filter-footer-reset" onClick={handleReset}>清空</Button>
            )}
          </Space>
        </Flex>
      </Col>
    </>
  )
}

export default FilterContent
