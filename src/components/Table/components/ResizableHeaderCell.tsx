import React, { useMemo } from 'react'
import { createStyles } from '../../../styles/instance'
import { Resizable, ResizeCallbackData } from 'react-resizable'
import { noop } from '../../../helpers/lib'

const useStyles = createStyles(({ css }) => {
  return {
    resizableHandle: css`
      position: absolute;
      right: -5px;
      bottom: 0;
      z-index: 1;
      width: 10px;
      height: 100%;
      cursor: col-resize;
  `,
  }
})

type ResizeCallback = (e: React.SyntheticEvent<Element, Event>, data: ResizeCallbackData) => any

type ResizableHeaderCellProps = {
  resizable: boolean
  width: number
  onResize: ResizeCallback
  className: string
  [key: string]: any
}

const ResizableHeaderCell = (props: ResizableHeaderCellProps) => {
  const { resizable = false, width, className: propsClassName, onResize = noop, ...restProps } = props

  const { styles, cx } = useStyles()

  const className = useMemo(() => cx(propsClassName, resizable && 'd-pro-table-cell-resizable'), [resizable, propsClassName, cx])

  if (!resizable) {
    return <th className={className} {...restProps} />
  }

  return (
    <Resizable
      width={width}
      height={0}
      className={className}
      onResize={onResize}
      draggableOpts={{ enableUserSelectHack: false }}
      handle={
        <span
          className={cx(styles.resizableHandle, 'd-pro-table-cell-resizable-handle')}
          onClick={(e) => {
            e.stopPropagation()
          }}
        />
      }
    >
      <th {...restProps} />
    </Resizable>
  )
}

export default ResizableHeaderCell
