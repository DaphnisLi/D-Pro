import React, { forwardRef, useCallback } from 'react'
import { Space, Flex, Modal } from 'antd'
import { omit } from 'lodash-es'
import Tag from './Tag'
import { createStyles } from '../../styles/instance'
import StyledProps from '../../types/styledProps'

const useStyles = createStyles(({ css, token }) => {
  return {
    wrapper: css`
      margin-top: 24px;
      margin-bottom: 36px;
    `,
    prefix: css`
      font-size: 14px;
      color: ${token.secondaryColor};
      font-weight: 400;
      white-space: nowrap;
    `
  }
})

interface FilterSnapshotProps extends StyledProps {
  value?: {
    id: string
    snapshotTitle: string
  }[]
  remove?: (id: string) => void
  setFilter?: (value: any) => void
  handleSearch?: () => void
}

export const FilterSnapshot = forwardRef((props: FilterSnapshotProps, ref: React.ForwardedRef<HTMLDivElement>) => {
  const { value = [], remove, setFilter, className, style, handleSearch } = props
  const { styles, cx } = useStyles()

  const [modal, contextHolder] = Modal.useModal()

  const onClose = useCallback((title: string, id: string) => {
    modal.confirm({
      title: `确定删除"${title}", 此条模板?`,
      onOk: () => { remove?.(id) },
    })
  }, [remove, modal])

  return (
    <Flex
      className={cx(styles.wrapper, 'hh-filter-snapshot', className)}
      gap={20}
    >
      <span className={cx(styles.prefix, 'hh-filter-snapshot-prefix')}>查询模版</span>
      <Space
        ref={ref}
        style={style}
        size={[16, 12]}
        wrap
        className="hh-filter-snapshot-content"
      >
        {value.map(item => (
          <Tag
            className="hh-filter-snapshot-tag"
            onClose={() => onClose(item?.snapshotTitle, item.id)}
            key={item.id}
            onClick={() => {
              setFilter?.(omit(item, ['id', 'snapshotTitle']))
              handleSearch?.()
            }}
          >
            {item?.snapshotTitle}
          </Tag>
        ))}
      </Space>
      {contextHolder}
    </Flex>
  )
})

if (process.env.NODE_ENV !== 'production') {
  FilterSnapshot.displayName = 'HhFilterSnapshot'
}

export type {
  FilterSnapshotProps
}
