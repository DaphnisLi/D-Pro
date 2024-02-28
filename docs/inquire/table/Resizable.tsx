import React, { useCallback, useState } from 'react'
import { Table } from '@daphnis/d-pro'
import { data } from '../page/request'

export default () => {
  const [columns, setColumns] = useState(
    [
      {
        title: '山峰名称',
        dataIndex: 'peakName',
        resizable: true,
        width: 200,
      },
      {
        title: '海拔高度',
        dataIndex: 'elevation',
        resizable: true,
        width: 200,
      },
      {
        title: '所在国家',
        dataIndex: 'country',
        resizable: true,
        width: 200,
      },
      {
        title: '所在大洲',
        dataIndex: 'continent',
        resizable: true,
        width: 200,
      },
      {
        title: '爬山难度',
        dataIndex: 'difficulty',
        resizable: true,
        width: 200,
      },
    ])

  const handleColumnSizeChange = useCallback((dataIndex, width) => {
    console.log(dataIndex, width)
    setColumns(
      columns.map(c => c.dataIndex !== dataIndex ? c : {
        ...c,
        width,
      })
    )
  }, [columns, setColumns])

  return (
    <Table
      onColumnSizeChange={handleColumnSizeChange}
      id="table"
      columns={columns}
      dataSource={data}
    />
  )
}
