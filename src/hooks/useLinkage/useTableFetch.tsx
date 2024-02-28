import { useCallback, useRef, useState } from 'react'
import { useDebounceEffect } from 'ahooks'
import { message } from 'antd'
import { noop } from '../../helpers/lib'
import { TableFetchParams, IsomorphicResponse, TableFetchData, UseTableFetch } from './types'
import { cloneDeep } from 'lodash-es'

const debugInfo = (scope: string) => {
  return (message: string, extraLink?: string) => {
    if (process.env.NODE_ENV === 'production') {
      return
    }

    console.error(`[d-pro/${scope}] ${message}`, extraLink ?? '')
  }
}

const debug = debugInfo('hooks/useTableData')

const useTableFetch = <
  TList extends object = any,
  TFilter extends object = any,
  TParams extends object = any,
>(props: UseTableFetch<TList, TFilter, TParams>) => {
  const {
    fetch = noop,
    requestParams,
    setList,
    setTotal,
    setResponse,
    setLoading,
    debounceTime = 200,
  } = props

  // request flag
  const [rFlag, setRFlag] = useState(true)

  const REQ_LOCK = useRef(0)

  const getData = useCallback(async (requestParams: TableFetchParams<TFilter, TParams>) => {
    if (typeof fetch !== 'function') {
      return
    }

    const reqLock = REQ_LOCK.current = REQ_LOCK.current + 1
    setLoading(true)

    let response: IsomorphicResponse<TableFetchData<TList>>[0] = null
    let error: any = null
    try {
      const rawRes = await fetch(cloneDeep(requestParams))

      if (reqLock !== REQ_LOCK.current || !rawRes) {
        return
      }

      if (!Array.isArray(rawRes) || rawRes.length !== 2) {
        debug('useLinkage 的 fetch 参数返回值需为 [res, err] 结构, 请检查代码.')
        return
      }

      const [res, err] = rawRes

      if (err) {
        error = err
      }

      response = res ?? null
    } catch (err) {
      error = err
    }

    if (error) {
      setList([])
      setTotal(0)
      setResponse(error.response)
      setLoading(false)

      message.error(`请求数据失败 ${error?.message || ''}`)
      return
    }

    let total = response?.data?.total ?? 0
    let list = response?.data?.list ?? []

    if (!Array.isArray(list)) {
      debug('fetch 返回的数据不符合 { total: number, list: any[] } 的格式')
      list = []
    }

    if (isNaN(+total) || total < 0) {
      debug('fetch 返回的数据不符合 { total: number, list: any[] } 的格式')
      total = 0
    }

    setResponse(response)
    setList(list)
    setTotal(total)
    setLoading(false)
  }, [fetch, setList, setResponse, setTotal, setLoading, REQ_LOCK])

  useDebounceEffect(
    () => {
      getData(requestParams)
    },
    [rFlag],
    {
      wait: debounceTime,
    }
  )

  const onRequest = useCallback(() => {
    setRFlag(rFlag => !rFlag)
  }, [])

  return {
    onRequest
  }
}

export default useTableFetch
