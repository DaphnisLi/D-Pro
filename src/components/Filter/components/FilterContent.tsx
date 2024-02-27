import React, { Children, isValidElement, useCallback, useMemo, useRef, cloneElement, useState } from 'react'
import { FilterProps } from '..'
import { Button, Space, Dropdown, Col, Flex, Grid } from 'antd'
import type { ItemType } from 'antd/es/menu/hooks/useItems'
import { CaretUpOutlined, CaretDownOutlined, EllipsisOutlined } from '@ant-design/icons'
import { createStyles } from '../../../styles/instance'
import { noop } from '../../../helpers/lib'
import { get, findKey, isEmpty } from 'lodash-es'
import FieldSetterBtn from './fieldSetter/FieldSetterBtn'
import FieldSetterModal from './fieldSetter/FieldSetterModal'
import { FieldSetterCommonProps } from '../hooks/useFieldSetter'
import colSpan from '../../../helpers/layout'
import SaveSnapshotBtn from '../../FilterSnapshot/SaveSnapshotBtn'
import { useFilterValue } from '../hooks/useFilterValue'

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

interface Props<T> extends FieldSetterCommonProps, Pick<FilterProps, 'maxShow' | 'onFilterExpandChange' | 'showReset' | 'labelCol' | 'wrapperCol' | 'colon' | 'labelAlign' | 'addSnapshotItem' | 'checkSnapshotItem' | 'inquireRender' | 'visibleSnapshot'> {
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
    filterValue,
    onResetFilterValue,
    onRequest,

    visibleSnapshot = true,
    addSnapshotItem,
    checkSnapshotItem,

    colon = false,
    labelAlign = 'right',

    maxShow,
    labelCol,
    wrapperCol,

    hideButton,

    visible,
    setVisible,

    visibleFields,
    setVisibleFields,
    inquireRender,
  } = props

  const { styles, cx } = useStyles()

  const screens = useBreakpoint()

  const enableExpandSwitcher = useRef(false)
  const { value } = useFilterValue()
  const [filterExpand, setFilterExpand] = useState(false)

  const handleSearch = useCallback(() => {
    onRequest?.()
  }, [onRequest])

  const handleReset = useCallback(() => {
    onResetFilterValue?.()
    handleSearch()
  }, [onResetFilterValue, handleSearch])

  const handleSaveSnapshot = useCallback((title: string) => {
    addSnapshotItem?.(filterValue!, title)
  }, [filterValue, addSnapshotItem])

  const $children = useMemo(() => {
    let showCount = 0
    const maxShowCount: number = maxShow || get(maxShowCountMap, findKey(maxShowCountMap, (value, key) => (screens as any)[key])!)

    let total = 0

    const $children = Children.map(visibleFields ?? [], (child) => {
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
  }, [screens, visibleFields, filterExpand, labelCol, wrapperCol, colon, labelAlign, maxShow])

  const dropdownOption = useCallback(() => {
    const items: ItemType[] = [
      {
        key: 2,
        label: <FieldSetterBtn hideButton={hideButton} setVisible={setVisible} />
      }
    ]

    if (visibleSnapshot) {
      items.unshift({
        key: 1,
        label: <SaveSnapshotBtn save={handleSaveSnapshot} checkSnapshotItem={checkSnapshotItem} disabled={isEmpty(value)} />,
        disabled: isEmpty(value)
      })
    }
    return items
  }, [checkSnapshotItem, handleSaveSnapshot, hideButton, setVisible, value, visibleSnapshot])

  return (
    <>
      {$children}

      <Col {...colSpan} className={styles.col}>
        <Flex justify="end">
          <Space size={12}>
            {
              enableExpandSwitcher.current && (
                <a
                  className={cx(styles.expand, 'hh-filter-footer-expand')}
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

            {inquireRender ? inquireRender({ search: handleSearch }) : <Button className="hh-filter-footer-inquire" type="primary" onClick={handleSearch}>查询</Button>}

            {showReset && (
              <Button className="hh-filter-footer-reset" onClick={handleReset}>清空</Button>
            )}
            <Dropdown menu={{ items: dropdownOption() }}
            >
              <Button className={cx(styles.ellipsis, 'hh-filter-footer-ellipsis')}><EllipsisOutlined /></Button>
            </Dropdown>
          </Space>
        </Flex>
      </Col>

      <FieldSetterModal
        hideButton={hideButton}
        visible={visible}
        setVisible={setVisible}
        visibleFields={visibleFields}
        setVisibleFields={setVisibleFields}
      />
    </>
  )
}

export default FilterContent
