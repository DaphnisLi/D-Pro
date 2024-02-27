import { Key, useCallback } from 'react'
import useStorage from '../../helpers/useStorage'
import { cloneDeep } from 'lodash-es'
import useControlledState from '../../helpers/useControlledState'
import { nanoid } from 'nanoid'

const useFilterSnapshot = <TFilter>(key: Key, snapshotQuota: number = 10) => {
  const { getValue, setValue } = useStorage<({ id: string, snapshotTitle: string } & TFilter)[]>(`hh-filter-history-id:${key}`)
  const [storageValue, setStorageValue] = useControlledState(getValue(), [], setValue)

  const addStorage = useCallback((item: TFilter, title:string) => {
    const value = cloneDeep(storageValue!)
    value.unshift({
      ...item,
      id: nanoid(),
      snapshotTitle: title
    })
    if (value.length > snapshotQuota) {
      value.pop()
    }
    setStorageValue(value)
  }, [snapshotQuota, storageValue, setStorageValue])

  const removeStorage = useCallback((id: string) => {
    const value = cloneDeep(storageValue!)

    setStorageValue(value.filter((i) => i.id !== id))
  }, [storageValue, setStorageValue])

  const checkSnapshotItem = useCallback((title: string) => {
    let isPass = true
    let message = ''
    const value = cloneDeep(storageValue!)
    if (/^\s*$/.test(title)) {
      isPass = false
      message = '输入不能全是空格!'
    }
    if (title.length >= 10) {
      isPass = false
      message = '模板名称字数限制10个字!'
    }
    if (value.some(v => v.snapshotTitle === title)) {
      isPass = false
      message = '此模板名称已存在, 换个名称吧!'
    }
    if (value.length >= 10) {
      isPass = false
      message = '当前模板数达到上限, 请删除部分后再保存!'
    }
    return {
      isPass,
      message
    }
  }, [storageValue])

  return [storageValue, addStorage, removeStorage, checkSnapshotItem] as const
}

export default useFilterSnapshot
