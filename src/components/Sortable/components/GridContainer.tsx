import React from 'react'
import { Space } from 'antd'
import { createStyles } from '../../../styles/instance'

const useStyles = createStyles(({ css }) => {
  return {
    gridContainer: css`
      margin-top: 16px;
    `,
  }
})

interface Props {
  children: React.ReactNode
}

export const GridContainer = (props: Props) => {
  const { children } = props
  const { styles, cx } = useStyles()
  return (
    <Space
      size={16}
      wrap
      className={cx(styles.gridContainer, 'sortable-grid-container')}
    >
      {children}
    </Space>
  )
}
