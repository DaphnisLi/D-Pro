import React from 'react'
import { createStyles } from '../../../../styles/instance'

interface ColumnSetterBtnProps {
  hideButton?: boolean
  setVisible?: (visible: boolean) => void
}

const useStyles = createStyles(({ css }) => {
  return {
    fieldSetterBtn: css`
      width: 100%;
    `,
  }
})

const FieldSetterBtn = (props: ColumnSetterBtnProps) => {
  const { hideButton, setVisible } = props
  const { styles, cx } = useStyles()

  return hideButton ? null : <div className={cx(styles.fieldSetterBtn, 'field-setter-btn')} onClick={() => setVisible?.(true)}>设置</div>
}

export default FieldSetterBtn
