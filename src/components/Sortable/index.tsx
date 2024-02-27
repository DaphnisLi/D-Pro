import React, { useState, CSSProperties, ReactNode, ReactElement, Key, forwardRef } from 'react'
import { createPortal } from 'react-dom'
import {
  DndContext,
  UniqueIdentifier,
  DragOverlay,
  DropAnimation,
  defaultDropAnimationSideEffects,
} from '@dnd-kit/core'
import {
  SortableContext,
  SortingStrategy,
  rectSortingStrategy,
} from '@dnd-kit/sortable'
import { Item, RenderItem } from './components/Item'
import { Wrapper } from './components/Wrapper'
import { SortableItem } from './components/SortableItem'
import { arrayMove } from '../../helpers/lib'
import { GridContainer } from './components/GridContainer'

interface ItemType {
  key: Key
  value: UniqueIdentifier
  checked?: boolean
}

interface SortableProps {
  /** 容器 */
  Container?: (props: { children: ReactNode }) => ReactElement
  /** 外层容器 style */
  style?: CSSProperties
  /** item 包裹元素 style */
  wrapperStyle?: CSSProperties
  onChange?: (item: SortableProps['items']) => void
  /** 元素 */
  items: ItemType[]
  /** 元素 style */
  itemStyles?: CSSProperties
  /** 禁用元素 */
  isDisabled?(key: UniqueIdentifier): boolean
  /** 可删除 */
  removable?: boolean
  /** 自定义 item */
  renderItem?: RenderItem
  /** 元素交换算法 */
  reorderItems?: typeof arrayMove
  /** 排序策略 */
  strategy?: SortingStrategy
  /** 是否拖动叠加, 即背景板 */
  isDragOverlay?: boolean
  /** 掉落动画 */
  dropAnimation?: DropAnimation | null
  adjustScale?: boolean
  checkbox?: boolean
}

const dropAnimationConfig: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: '0.5',
      },
    },
  }),
}

export const Sortable = forwardRef<HTMLDivElement, SortableProps>((props, ref) => {
  const {
    Container = GridContainer,
    style,
    wrapperStyle,
    onChange,
    items,
    itemStyles,
    isDisabled = () => false,
    removable = false,
    renderItem,
    reorderItems = arrayMove,
    strategy = rectSortingStrategy,
    isDragOverlay = true,
    adjustScale = true,
    dropAnimation = dropAnimationConfig,
    checkbox,
  } = props

  const keys = items.map(item => item.key)

  const getIndex = (key: UniqueIdentifier) => items.findIndex(item => item.key === key)

  const [activeKey, setActiveKey] = useState<UniqueIdentifier | null>(null)

  const activeIndex = activeKey ? getIndex(activeKey) : -1

  const handleRemove = removable
    ? (id: UniqueIdentifier) =>
      onChange?.(items.filter((item) => item.key !== id))
    : undefined

  const handleChecked = (checked: boolean, key: Key) => {
    onChange?.(items.map(item => ({ ...item, checked: item.key === key ? checked : item.checked })))
  }

  return (
    <div ref={ref}>
      <DndContext
        onDragStart={({ active }) => {
          if (!active) {
            return
          }
          setActiveKey(active.id)
        }}
        onDragEnd={({ over }) => {
          setActiveKey(null)
          if (over) {
            const overIndex = getIndex(over.id)
            if (activeIndex !== overIndex) {
              onChange?.(reorderItems(items, activeIndex, overIndex))
            }
          }
        }}
        onDragCancel={() => setActiveKey(null)}
      >
        <Wrapper style={style}>
          <SortableContext items={keys} strategy={strategy}>
            <Container>
              {items.map((value, index) => (
                <SortableItem
                  checkbox={checkbox}
                  handleChecked={(checked) => handleChecked(checked, value.key)}
                  key={value.key}
                  value={value}
                  index={index}
                  style={itemStyles}
                  wrapperStyle={wrapperStyle}
                  disabled={isDisabled(value.key)}
                  renderItem={renderItem}
                  onRemove={handleRemove}
                  isDragOverlay={isDragOverlay}
                />
              ))}
            </Container>
          </SortableContext>
        </Wrapper>
        {isDragOverlay
          ? createPortal(
            <DragOverlay
              adjustScale={adjustScale}
              dropAnimation={dropAnimation}
            >
              {activeKey ? (
                <Item
                  value={items[activeIndex].value}
                  renderItem={renderItem}
                  wrapperStyle={wrapperStyle}
                  style={itemStyles}
                  dragOverlay
                />
              ) : null}
            </DragOverlay>,
            document.body
          )
          : null}
      </DndContext>
    </div>
  )
})

if (process.env.NODE_ENV !== 'production') {
  Sortable.displayName = 'HhSortable'
}

export type {
  ItemType,
  SortableProps
}
