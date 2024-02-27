import React, { CSSProperties } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { Item } from './Item'
import { SortableProps, ItemType } from '..'

type SortableItemProps = Pick<SortableProps, 'isDragOverlay' | 'renderItem' | 'wrapperStyle'> & {
  value: ItemType
  index: number
  disabled?: boolean
  onRemove?(key: ItemType['key']): void
  style?: CSSProperties
  checkbox?: boolean
  handleChecked?: (checked: boolean) => void
}

export const SortableItem = (props: SortableItemProps) => {
  const {
    disabled,
    index,
    onRemove,
    style,
    renderItem,
    isDragOverlay,
    wrapperStyle,
    value,
    checkbox,
    handleChecked,
  } = props

  const {
    attributes,
    isDragging,
    isSorting,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id: value.key,
    disabled,
  })

  return (
    <Item
      checkbox={checkbox}
      ref={setNodeRef}
      value={value.value}
      checked={value.checked}
      handleChecked={handleChecked}
      disabled={disabled}
      dragging={isDragging}
      sorting={isSorting}
      renderItem={renderItem}
      index={index}
      style={style}
      onRemove={onRemove ? () => onRemove(value.key) : undefined}
      transform={transform}
      transition={transition}
      wrapperStyle={wrapperStyle}
      listeners={listeners}
      data-index={index}
      data-id={value.key}
      dragOverlay={!isDragOverlay && isDragging}
      {...attributes}
    />
  )
}
