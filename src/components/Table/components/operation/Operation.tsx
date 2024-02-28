import React, { Children, CSSProperties, isValidElement, ReactElement, ReactNode, useMemo } from 'react'
import { createStyles } from '../../../../styles/instance'
import { Button, Dropdown, Tooltip, Space } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import StyledProps from '../../../../types/styledProps'
import forwardRefWithStatics from '../../../../helpers/forwardRefWithStatics'
import TableOperationItem, { TableOperationItemProps } from './Item'

const useStyles = createStyles(({ css }) => {
  return {
    item: css`
      white-space: nowrap;
    `,
  }
})

interface TableOperationsProps extends StyledProps {
  dropdownClassName?: string
  dropdownStyle?: CSSProperties
  children?: ReactNode
}

const TableOperations = forwardRefWithStatics<TableOperationsProps, HTMLDivElement, { Item: typeof TableOperationItem }>((props, ref) => {
  const { children = null, dropdownClassName, dropdownStyle, className, style } = props

  const { styles, cx } = useStyles()

  const { externals, internals } = useMemo(() => {
    const externals: any[] = []
    const internals: any[] = []

    if (!children) {
      return { externals, internals }
    }

    Children.forEach(children, (child, index) => {
      if (!isValidElement(child) || !child.type || !child.props) {
        return
      }

      const {
        key,
        props,
      } = child as ReactElement<TableOperationItemProps>

      const operationKey = `${key || index}`
      const {
        disabled = false,
        showOutside = false,
        tip,
        className,
        style,
        children,
        onClick,
        href,
        target,
      } = props || {}

      const itemProps = {
        key: operationKey,
        className: cx(
          styles.item,
          'd-pro-table-operations-item',
          {
            'd-pro-table-operations-item-link': !!href,
            'd-pro-table-operations-item-disabled': disabled,
          },
          className,
        ),
        style,
        onClick: (event: any) => !disabled && onClick?.(event),
      }

      const $item = href
        ? (
          <a {...itemProps} href={href} target={target}>{children}</a>
        )
        : (
          <a {...itemProps}>{children}</a>
        )

      if (showOutside) {
        return externals.push(
          tip
            ? (
              <Tooltip key={operationKey} title={tip} placement="left">
                {$item}
              </Tooltip>
            )
            : $item
        )
      }

      return internals.push({
        key: operationKey,
        label: (
          tip
            ? (
              <div>
                <Tooltip key={operationKey} title={tip} placement="left">
                  {$item}
                </Tooltip>
              </div>
            )
            : <div>{$item}</div>
        )
      })
    })

    return { externals, internals }
  }, [children, cx, styles.item])

  return (
    <Space ref={ref} className={cx('d-pro-table-operations', className)} style={style}>
      {externals}
      {internals.length > 0 && (
        <Dropdown
          menu={{ items: internals }}
          placement="bottom"
          trigger={['click', 'hover']}
          overlayClassName={dropdownClassName}
          overlayStyle={{ ...dropdownStyle, zIndex: 1024 }}
        >
          <Button type="text" icon={<DownOutlined />} />
        </Dropdown>
      )}
    </Space>
  )
}, {
  Item: TableOperationItem,
})

if (process.env.NODE_ENV !== 'production') {
  TableOperations.displayName = 'DProTableOperations'
}

export default TableOperations
