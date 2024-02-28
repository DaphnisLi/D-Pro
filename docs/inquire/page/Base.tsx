import React, { useState } from 'react'
import { Table, ColumnsType, Filter, useLinkage } from '@daphnis/d-pro'
import { requestApi, countryList, continentList, difficultyList } from './request'
import { Button, Dropdown } from 'antd'
import type { MenuProps } from 'antd'

interface ListType {
  peakName: string
  elevation: number
  country: string
  continent: string
  difficulty: string
  description: string
  duration: number
  season: string
  sceneryRating: number
  time: string
}

type FieldType = Partial<ListType>

const columns: ColumnsType<ListType>[] = [
  {
    title: '山峰名称',
    dataIndex: 'peakName',
  },
  {
    title: '海拔高度',
    dataIndex: 'elevation',
  },
  {
    title: '所在国家',
    dataIndex: 'country',
  },
  {
    title: '所在大洲',
    dataIndex: 'continent',
  },
  {
    title: '爬山难度',
    dataIndex: 'difficulty',
  },
  {
    title: '详细描述',
    dataIndex: 'description',
  },
  {
    title: '爬山耗时',
    dataIndex: 'duration',
  },
  {
    title: '推荐季节',
    dataIndex: 'season',
  },
  {
    title: '风景指数',
    dataIndex: 'sceneryRating',
  },
  {
    title: '时间',
    dataIndex: 'time',
  },
]

const items: MenuProps['items'] = [
  {
    key: '1',
    label: '批量操作1',
  },
  {
    key: '2',
    label: '批量操作2',
  },
  {
    key: '3',
    label: '批量操作3',
  },
]

export default () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])

  const { filterProps, tableProps } = useLinkage<ListType, FieldType>({
    key: 'hh-demo-1', // 注意修改

    fetch: async ({ params, filter, pagination }) => {
      return requestApi('api', { ...params, ...filter, ...pagination })
    },
  })

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys)
    console.log(newSelectedRowKeys)
    setSelectedRowKeys(newSelectedRowKeys)
  }

  const onClick = () => {
    console.log(selectedRowKeys)
  }

  const renderOperationBar = () => {
    return (
      <>
        <Button onClick={onClick}>新建</Button>
        <Dropdown menu={{ items, onClick }}>
          <Button>批量操作</Button>
        </Dropdown>
        <Button onClick={onClick}>导出</Button>
      </>
    )
  }

  return (
    <>
      <Filter {...filterProps} labelCol={{ span: 7 }} wrapperCol={{ span: 17 }}>
        <Filter.Input allowClear field="duration" label="爬山耗时" />
        <Filter.Input allowClear field="peakName" label="山峰名称" />
        <Filter.Input allowClear field="elevation" label="海拔高度" />
        <Filter.Select allowClear field="country" label="所在国家" options={countryList} />
        <Filter.Select allowClear field="continent" label="所在大洲" options={continentList} />
        <Filter.Select allowClear field="difficulty" label="爬山难度" options={difficultyList} />
        <Filter.Input allowClear field="sceneryRating" label="风景指数" />
        <Filter.RangePicker field="time" label="时间" showTime />
      </Filter>
      <Table
        {...tableProps}
        scroll={{ x: 1300 }}
        columns={columns}
        rowOperation={() => (
          <Table.Operations>
            <Table.Operations.Item showOutside>
              操作
            </Table.Operations.Item>
            <Table.Operations.Item>
              查看
            </Table.Operations.Item>
            <Table.Operations.Item>
              编辑
            </Table.Operations.Item>
          </Table.Operations>
        )}
        rowSelection={{
          selectedRowKeys,
          onChange: onSelectChange,
        }}
        rowKey={(record) => record.peakName}
        renderOperationBar={renderOperationBar}
      />
    </>
  )
}
