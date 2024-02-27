import React, { useCallback, useState } from 'react'
import { Modal, Input, Form, Tooltip } from 'antd'

const SaveSnapshotBtn = (props: {
  save?: (title: string) => void
  checkSnapshotItem?: (title: string) => {
    isPass: boolean
    message: string
  }
  disabled?: boolean
}) => {
  const { save, checkSnapshotItem, disabled } = props
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [form] = Form.useForm()
  const title = Form.useWatch('title', form)

  const { validateFields, getFieldValue, resetFields } = form

  const handleOk = useCallback(() => {
    validateFields({ validateOnly: true }).then(
      () => {
        save?.(getFieldValue('title'))
        setIsModalOpen(false)
        resetFields(['title'])
      },
    )
  }, [save, validateFields, getFieldValue, resetFields])

  const handleCancel = useCallback(() => {
    setIsModalOpen(false)
    resetFields(['title'])
  }, [resetFields])

  return (
    <>
      {disabled ? (
        <Tooltip title="请选择至少一个筛选条件后再存为模板">
          <div className="save-snapshot-btn">存为模版</div>
        </Tooltip>
      ) : (
        <div className="save-snapshot-btn" onClick={() => setIsModalOpen(true)}>存为模版</div>
      )}
      <Modal
        width={456}
        title="存为模版"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{ disabled: !title }}
      >
        <Form form={form}>
          <Form.Item
            label="模版名称"
            name="title"
            required
            rules={[
              { required: true, message: '不得为空!' },
              {
                validator: (_, value) => {
                  const { isPass, message } = checkSnapshotItem?.(value)!
                  if (isPass) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error(message))
                }
              }
            ]}
          >
            <Input.TextArea
              rows={4}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default SaveSnapshotBtn
