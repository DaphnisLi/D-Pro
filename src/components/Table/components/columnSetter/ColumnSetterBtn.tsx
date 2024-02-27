import React from 'react'
import { Button } from 'antd'

interface ColumnSetterBtnProps {
  hideButton?: boolean
  setVisible?: (visible: boolean) => void
}

const ColumnSetterBtn = (props: ColumnSetterBtnProps) => {
  const { hideButton, setVisible } = props

  return hideButton ? null : <Button onClick={() => setVisible?.(true)}>列设置</Button>
}

export default ColumnSetterBtn
