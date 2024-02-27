import React, { forwardRef, HTMLAttributes, MouseEvent, ReactNode, useState } from 'react'
import { CloseCircleFilled } from '@ant-design/icons'
import { createStyles } from '../../styles/instance'

const useStyles = createStyles(({ css, token }) => {
  const { greyColor, secondaryColor, primaryColor } = token
  return {
    tag: css`
      opacity: 0.7;
      background: ${greyColor};
      border-radius: 4px;
      height: 24px;
      line-height: 24px;
      font-size: 12px;
      font-weight: 400;
      text-align: center;
      padding: 0 8px;
      position: relative;
    `,
    tagSelected: css`
      background: #F5F7FF;
  `,
    text: css`
      color: ${secondaryColor};
    `,
    textSelected: css`
      color: ${primaryColor};
      cursor: pointer;
    `,
    icon: css`
      color: #989A9C;
      position: absolute;
      top: -12px;
      right: -8px;
      width: 16px;
      height: 16px;
      cursor: pointer;
    `
  }
})

interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  closable?: boolean

  closeIcon?: ReactNode

  onClose?: (event: MouseEvent<HTMLElement>) => void
}

const Tag = forwardRef<HTMLDivElement, TagProps>((props, ref) => {
  const {
    children,
    className,
    closable = true,
    closeIcon,
    onClose,
    onClick,
    ...restProps
  } = props
  const { styles, cx } = useStyles()

  const [isMouseEnter, setIsMouseEnter] = useState(false)

  return (
    <div
      ref={ref}
      {...restProps}
      className={
        cx(
          styles.tag,
          !!closable && 'hh-tag-closable',
          'hh-tag',
          className,
          isMouseEnter && styles.tagSelected
        )
      }
      onMouseEnter={(e) => {
        setIsMouseEnter(true)
        restProps?.onMouseEnter?.(e)
      }}
      onMouseLeave={(e) => {
        setIsMouseEnter(false)
        restProps?.onMouseLeave?.(e)
      }}
    >
      <div
        className={
          cx(
            isMouseEnter ? styles.textSelected : styles.text,
            'hh-tag-txt'
          )
        }
        onClick={onClick}
      >
        {children}
      </div>
      {isMouseEnter && closable && (
        <div
          className={
            cx(
              styles.icon,
              'hh-tag-closable-icon'
            )
          }
          onClick={onClose}
        >
          {closeIcon || <CloseCircleFilled />}
        </div>
      )}
    </div>
  )
})

Tag.displayName = 'HhTag'

export default Tag
