import React from 'react'
import { Filter } from '@daphnis/d-pro'
import { countryList, continentList, difficultyList } from '../page/request'

export default () => {
  return (
    <Filter
      labelCol={{ span: 7 }} wrapperCol={{ span: 17 }}
      id="base"
      onChange={value => console.log(value)}
    >
      <Filter.Input allowClear field="duration" label="爬山耗时" />
      <Filter.Input allowClear field="peakName" label="山峰名称" />
      <Filter.Input allowClear field="elevation" label="海拔高度" />
      <Filter.Select allowClear field="country" label="所在国家" options={countryList} />
      <Filter.Select allowClear field="continent" label="所在大洲" options={continentList} />
      <Filter.Select allowClear field="difficulty" label="爬山难度" options={difficultyList} />
      <Filter.Input allowClear field="sceneryRating" label="风景指数" />
      <Filter.RangePicker field="time" label="时间" showTime />
    </Filter>
  )
}
