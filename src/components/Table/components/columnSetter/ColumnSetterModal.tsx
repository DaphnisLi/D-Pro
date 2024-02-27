import React, { useCallback, useState, useEffect } from 'react'
import { Modal, Flex, Button, Checkbox } from 'antd'
import { ColumnSetterCommonProps } from '../../hook/useColumnSetter'
import { Sortable, ItemType } from '../../../Sortable'
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

type ColumnSetterModalProps<RecordType> = Pick<ColumnSetterCommonProps<RecordType>, 'visible' | 'setVisible' | 'visibleColumns' | 'setVisibleColumns'>

const ColumnSetterModal = <RecordType extends object = any>(props: ColumnSetterModalProps<RecordType>) => {
  const { visible, setVisible, visibleColumns = [], setVisibleColumns } = props

  const { styles, cx } = useStyles()

  const [innerColumns, setInnerColumns] = useState(visibleColumns)

  const handleOk = useCallback(() => {
    setVisible(false)
    setVisibleColumns(innerColumns)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [innerColumns])

  const handleClose = useCallback(() => {
    setVisible(false)
    setInnerColumns(visibleColumns)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibleColumns])

  useEffect(() => {
    setInnerColumns(visibleColumns)
  }, [visibleColumns])

  const items = innerColumns.map(item => ({
    key: item.key,
    value: item.plainTitle,
    checked: !item.allowHidden,
  })) as ItemType[]

  const handleSortable = (item: ItemType[]) => {
    setInnerColumns(p => item.map(item => ({ ...p.find(i => i.key === item.key)!, allowHidden: !item.checked })))
  }

  const handleSelectAll = useCallback((checked: boolean) => {
    setInnerColumns(innerColumns.map(c => ({ ...c, allowHidden: !checked })))
  }, [innerColumns, setInnerColumns])

  return (
    <Modal
      className={cx(styles.modalFooter, 'hh-setter-modal')}
      width={912}
      open={visible}
      title="列设置"
      onCancel={handleClose}
      centered
      footer={(
        <Flex justify="space-between" align="center">
          <Checkbox
            checked={innerColumns.every(item => !item.allowHidden)}
            onChange={(e) => handleSelectAll(e.target.checked)}
          >
            全选
          </Checkbox>
          <div>
            <Button onClick={handleClose}>
              取消
            </Button>
            <Button type="primary" onClick={handleOk}>
              确定
            </Button>
          </div>
        </Flex>
      )}
    >
      <span className={cx(styles.modalBanner, 'hh-setter-banner')}>按住选项拖动可以调整表头顺序, 勾选/取消勾选可以设置表头字段展示/隐藏</span>
      <div className="hh-options-column-inner">
        <Sortable
          checkbox
          items={items}
          onChange={handleSortable}
        />
      </div>
    </Modal>
  )
}

export default ColumnSetterModal
