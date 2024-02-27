import React from 'react'
import { Flex } from 'antd'

interface Props {
  children: React.ReactNode
  style?: React.CSSProperties
}

export const Wrapper = (props: Props) => {
  const { children, style } = props
  return (
    <Flex
      className="wrapper"
      style={style}
    >
      {children}
    </Flex>
  )
}
