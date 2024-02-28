import React from 'react'
import { Table } from '@daphnis/d-pro'
import { data } from '../page/request'

export default () => {
  const columns = [
    {
      title: '山峰名称',
      dataIndex: 'peakName',
      width: 200,
    },
    {
      title: '海拔高度',
      dataIndex: 'elevation',
      width: 200,
    },
    {
      title: '所在国家',
      dataIndex: 'country',
      width: 200,
    },
    {
      title: '所在大洲',
      dataIndex: 'continent',
      width: 200,
    },
    {
      title: '爬山难度',
      dataIndex: 'difficulty',
      width: 200,
    },
    {
      title: '详细描述',
      dataIndex: 'description',
      width: 200,
    },
    {
      title: '爬山耗时',
      dataIndex: 'duration',
      width: 200,
    },
    {
      title: '推荐季节',
      dataIndex: 'season',
      width: 200,
    },
    {
      title: '风景指数',
      dataIndex: 'sceneryRating',
      width: 200,
    },
    {
      title: '时间',
      dataIndex: 'time',
      width: 200,
    },
  ]

  return (
    <Table
      id="table"
      columns={columns}
      dataSource={data}
    />
  )
}
