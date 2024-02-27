import { FunctionComponent, Key, MouseEventHandler, ReactNode } from 'react'
import StyledProps from '../../../../types/styledProps'

interface TableOperationItemProps extends StyledProps {
  key?: Key

  disabled?: boolean

  showOutside?: boolean

  tip?: ReactNode

  onClick?: MouseEventHandler<HTMLDivElement>

  children?: ReactNode

  href?: string

  // 打开方式 https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/a#target
  target?: '_self' | '_blank' | '_parent' | '_top'
}

const TableOperationItem: FunctionComponent<TableOperationItemProps> = () => null

export default TableOperationItem

export type {
  TableOperationItemProps
}
