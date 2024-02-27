import React, { useEffect, forwardRef, ReactNode, Ref, CSSProperties, ReactElement } from 'react'
import type { DraggableSyntheticListeners } from '@dnd-kit/core'
import type { Transform } from '@dnd-kit/utilities'
import { Checkbox } from 'antd'
import { useStyles } from './style'

interface ItemProps {
  value: ReactNode
  disabled?: boolean
  dragging?: boolean
  sorting?: boolean
  index?: number
  style?: CSSProperties
  onRemove?: () => void
  transform?: Transform | null
  transition?: string | null
  wrapperStyle?: CSSProperties
  listeners?: DraggableSyntheticListeners
  dragOverlay?: boolean
  renderItem?: RenderItem
  checkbox?: boolean
  checked?: boolean
  handleChecked?: (checked: boolean) => void
}

interface RenderItemProps {
  dragOverlay: boolean
  dragging: boolean
  sorting: boolean
  index: number | undefined
  listeners: DraggableSyntheticListeners
  ref: Ref<HTMLElement>
  style: CSSProperties | undefined
  transform: ItemProps['transform']
  transition: ItemProps['transition']
  value: ItemProps['value']
}

type RenderItem = (args: RenderItemProps) => ReactElement

export const Item = forwardRef<HTMLLIElement, ItemProps>((props, ref) => {
  const {
    value,
    disabled,
    dragging,
    sorting,
    index,
    style,
    onRemove,
    transform,
    transition,
    wrapperStyle,
    listeners,
    dragOverlay,
    renderItem,
    checkbox,
    checked,
    handleChecked,
    ...restProps
  } = props

  const { styles, cx } = useStyles()

  useEffect(() => {
    if (!dragOverlay) {
      return
    }

    document.body.style.cursor = 'grabbing'

    return () => {
      document.body.style.cursor = ''
    }
  }, [dragOverlay])

  return renderItem ? (
    renderItem({
      dragOverlay: Boolean(dragOverlay),
      dragging: Boolean(dragging),
      sorting: Boolean(sorting),
      index,
      listeners,
      ref,
      style,
      transform,
      transition,
      value,
    })
  ) : (
    <li
      className={cx(
        styles.wrapper,
        'wrapper',
        dragOverlay && styles.wrapperDragOverlay,
      )}
      style={
        {
          ...wrapperStyle,
          transition: [transition, wrapperStyle?.transition]
            .filter(Boolean)
            .join(', '),
          '--translate-x': transform
            ? `${Math.round(transform.x)}px`
            : undefined,
          '--translate-y': transform
            ? `${Math.round(transform.y)}px`
            : undefined,
          '--scale-x': transform?.scaleX
            ? `${transform.scaleX}`
            : undefined,
          '--scale-y': transform?.scaleY
            ? `${transform.scaleY}`
            : undefined,
          '--index': index,
        } as CSSProperties
      }
      ref={ref}
    >
      {checkbox && <Checkbox className={cx(styles.checkbox, 'checkbox')} checked={checked} onChange={(e) => handleChecked?.(e.target.checked)} />}
      <div
        className={cx(
          styles.item,
          'item',
          dragging && styles.dragging,
          dragOverlay && styles.itemDragOverlay,
          disabled && styles.disabled,
        )}
        style={style}
        data-cypress="draggable-item"
        {...listeners}
        {...restProps}
        tabIndex={0}
      >
        {value}
      </div>
    </li>
  )
})

export type {
  RenderItem,
}
