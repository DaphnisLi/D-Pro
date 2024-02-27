import React, { useEffect, Children, useState, useCallback } from 'react'
import { Modal } from 'antd'
import { Sortable, ItemType } from '../../../Sortable'
import { FieldSetterCommonProps } from '../../hooks/useFieldSetter'
import { createStyles } from '../../../../styles/instance'

const useStyles = createStyles(({ css }) => {
  return {
    modalFooter: css`
      .ant-modal-footer {
        margin-top: 36px;
      }
    `,
    modalBanner: css`
      color: #878A92;
    `
  }
}, { hashPriority: 'high' })

type FieldSetterModalProps = FieldSetterCommonProps

const FieldSetterModal = (props: FieldSetterModalProps) => {
  const { visibleFields = [], setVisibleFields, visible, setVisible } = props

  const { styles, cx } = useStyles()

  const [innerFields, setInnerFields] = useState(visibleFields)

  const handleOk = useCallback(() => {
    setVisible(false)
    setVisibleFields(innerFields)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [innerFields])

  const handleClose = useCallback(() => {
    setVisible(false)
    setInnerFields(visibleFields)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibleFields])

  useEffect(() => {
    setInnerFields(visibleFields)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibleFields])

  const items = Children.map(innerFields, child => {
    return {
      key: child.props.field,
      value: child.props.label
    }
  }) as ItemType[]

  const handleSortable = (item: ItemType[]) => {
    setInnerFields(p => item.map(item => p.find(i => i.props.field === item.key)!))
  }

  return (
    <Modal
      className={cx(styles.modalFooter, 'hh-setter-modal')}
      width={912}
      open={visible}
      title="设置"
      onOk={handleOk}
      onCancel={handleClose}
      centered
    >
      <span className={cx(styles.modalBanner, 'hh-setter-banner')}>按住拖动可以调整顺序，排序靠前的筛选条件会默认外露展示，剩余筛选条件点击「展开」后展示</span>
      <div className="hh-options-field-inner">
        <Sortable
          items={items}
          onChange={handleSortable}
        />
      </div>
    </Modal>
  )
}

export default FieldSetterModal
