---
title: useLinkage
order: 4
---

# useLinkage

虽然组件提供了很多能力, 但是如果要拼装出一个页面, 还需要将各个组件串联起来, 所以需要将请求、筛选/表格状态管理都统一管理起来，并通过 `useLinkage` 这个 Hook 进行控制。

## 参数

`useLinkage` 的参数如下:

| 参数                            | 说明                                                                                                   | 类型                                                                                                              | 默认值                                                             |
| ------------------------------- | ------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| `key`                           | 页面标识, 需确保唯一, 不提供检测机制                                                                                 | `React.Key`                                                                                                       | -                                                                  |
| `params`                        | 额外参数, 注意, 需要使用 `useMemo` 或其他措施来保证不会多次变化                                        | `TParams`                                                                                                         | -                                                                  |
| `defaultFilter`                 | 默认过滤器的值                                                                                         | `TFilter`                                                                                                         | `{}`                                                               |
| `defaultTotal`                  | 默认总数                                                                                               | `number`                                                                                                          | `0`                                                                |
| `defaultList`                   | 默认列表                                                                                               | `TList[]`                                                                                                       | `[]`                                                               |
| `defaultPagination`             | 默认分页器的值                                                                                         | `Partial<PaginationState>`                                                                                   | -                                                                  |
| `paginationConfigs`             | 分页控制参数                                                                                           | `PaginationConfigs` |
| `fetch`                         | 请求函数，返回必须为形如 `[res, err]` 元组                                                             | `TableFetcher<TList, TFilter, TParams>`                                                                         | -                                                                  |
| `debounceTime`                  | 请求防抖时间                                                             | `number`                                                                         |  `200ms`                                                                   |


### 请求函数

`useLinkage` 接管了对表格数据的状态管理，所以需要你通过 `fetch` 参数定义请求的逻辑。当每次执行 `onRequest` 时都会触发 `fetch` 请求新的数据，`fetch` 方法需要返回一个形如 `[res, err]` 的元组。第一个值代表数据，第二个值代表错误。`useLinkage` 会根据 `err` 参数判断请求是否成功，如果失败，将会弹出提示。

同时，为了 `useLinkage` 能正确的获取列表数组和总数，你需要保证 `res` 的类型为 `{ list: any[], total: number }`。

下面是 `requestApi` 常见的实现方法, D-Pro 并不会 export requestApi, 因为不同业务, 其响应结构未必相同, 需要开发者根据业务情况自行实现

```typescript | pure
import axios, { AxiosRequestConfig } from 'axios'

const http = axios.create()

interface RequestApi {
  url: string
  params?: any
  config?: AxiosRequestConfig
}

export const requestApi = <T extends any>(params: RequestApi): Promise<[null, CommonError] | [CommonSuccess<T>, null]> => {
  return http.post(params).then(res => {
    if ((res?.errCode) !== 200) {
      return [{
        data: res.data,
        code: res?.errCode,
        message: res?.msg,
        traceId: res?.traceId,
      }, null]
    } else {
      return [null, {
        code: res?.errCode,
        message: res?.msg,
        traceId: res?.traceId,
      }]
    }
  })
}
```

综上所述，完整的 `fetch` 方法定义如下：

```typescript | pure
// fetch 方法的参数
export type TableFetchParams<TFilter extends object = any, TParams extends any = void> = {
  filter: TFilter
  pagination: PaginationState
  params?: TParams
}

// fetch 返回值定义
export type IsomorphicResponse<TData = any> = [CommonSuccess<TData> | null, CommonError | null]

// 响应类型定义
export type TableFetchData<TList extends object = any> = { total: number, list: TList[] }

// fetch 方法定义
export type TableFetcher<
  TList extends object = any,
  TFilter extends object = any,
  TParams extends object = any,
> = (options: TableFetchParams<TFilter, TParams>) => IsomorphicResponse<TableFetchData<TList>> | Promise<IsomorphicResponse<TableFetchData<TList>>> | null
```

##### 如下为常见的 `fetch` 实现

1. 配合 `requestApi` 使用

  ```typescript | pure
  import { useLinkage } from '@daphnis/d-pro'

  function ComA () {
    useLinkage({
      // ... 其他参数
      async fetch ({ filter, pagination, params }) {
        return requestApi<TList>('url', { ...filter, ...pagination, ...params })
      }
    })

    return null
  }
  ```
### 额外参数

有时候我们可能需要在请求的时候依赖 URL 或者其他地方获取到的参数，当这些参数变化的时候，我们希望能够带着最新的参数值重新请求。`useLinkage` 为此提供了 `params` 参数来实现这个能力。

由于 `params` 会被当成请求的依赖，当 `params` 变化的时候重新请求，所以你得保证该值**仅在必要的时候更新**，否则可能导致页面 **Stack Overflow**。

常见情况下，我们会取 URL 中的参数作为值传入：

```typescript | pure
import { useParams } from 'react-router-dom'
import { useLinkage } from '@daphnis/d-pro'

function ComA () {
  const { id } = useParams<{ id?: string }>()

  useLinkage({
    // ... 其他参数

    params: id,

    async fetch ({ filter, pagination, params }) {
      // 这里的 params 就是 id，当 id 变化时，会重新调用这个函数
    }
  })

  return null
}
```

同样，上面这个例子里，`params` 也可以传入 `object` 等引用对象，但你需要保证**仅在必要的时候更新**：

```typescript | pure
import { useParams } from 'react-router-dom'
import { useLinkage } from '@daphnis/d-pro'

function ComA () {
  const { id, name } = useParams<{ id?: string, name?: string }>()

  // 用 useMemo 保证仅在 id, name 变化的时候，params 会更新
  const params = useMemo(() => ({ id, name }), [id, name])

  useLinkage({
    // ... 其他参数

    params,

    async fetch ({ filter, pagination, params }) {
      // 这里的 params 就是 { id, name }
    }
  })

  return null
}
```

## 返回值

上面提到，`useLinkage` 用于将列表页面的许多组件的逻辑进行整合的，那么它的返回值就天然为了这些组件而进行了适配：


| 参数                 | 说明                                                          | 类型                                                    |
| -------------------- | ------------------------------------------------------------- | ------------------------------------------------------- |
| `loading`            | 数据是否加载中                                                | `boolean`                                               |
| `total`              | 数据总条数                                                    | `number`                                                |
| `list`               | 表格数据                                                      | `TRecord[]`                                             |
| `filter`             | 筛选器数据                                                    | `TFilter`                                               |
| `pagination`         | 翻页器数据                                                    | `PaginationState`                                       |
| `response`          | 响应的原始结果                                                      | `CommonSuccess<TableFetchData<TList>> ｜ null`            |
| `tableProps`         | 表格参数                                                      | [`TableProps`](/@daphnis/d-pro/table#table)          |
| `filterProps`        | 过滤器参数                                                    | [`FilterProps`](/@daphnis/d-pro/filter#filter)        |
| `filterSnapshotProps`        | 保存模版参数                                                    | [`FilterSnapshotProps`](/@daphnis/d-pro/filter-snapshot#filtersnapshot)        |
| `reload`             | 重新请求函数，调用该函数会触发重新请求                        | `() => void`                                            |
| `onFilterChange`     | `filter` 修改回调，可以调用该函数手动设置 `filter` 值         | `(filterUpdater: Partial<TFilter> ｜ ((oldFilter: TFilter) => TFilter)) => void`         |
| `onFilterReset`     | 表单 reset         | `() => void`         |

| `onPaginationChange` | `pagination` 修改回调，可以调用该函数手动设置 `pagination` 值 | `(paginationUpdater: Partial<PaginationState> ｜ ((oldPagination: PaginationState) => PaginationState)) => void` |

`useLinkage` 的返回值直接封装了 `tableProps` 和 `filterProps`，你可以直接将这两个值传递给 `Table` 和 `Filter`，使之可以控制表格和过滤器：

```tsx | pure
import { Table, Filter, useLinkage } from '@daphnis/d-pro'

function ComA () {
  const { tableProps, filterProps } = useLinkage({
    // ...
  })

  return (
    <>
      <Filter {...filterProps} />
      <Table {...tableProps} />
    </>
  )
}
```

除此以外，你也可以在传递给 `Table` 和 `Filter` 之前，修改或者复写 `tableProps` 和 `filterProps`，自定义你的参数和逻辑：

```tsx | pure
import { Table, Filter, useLinkage } from '@daphnis/d-pro'

function ComA () {
  const { tableProps, filterProps } = useLinkage({
    // ...
  })

  return (
    <>
      <Filter {...filterProps} />
      {/* 自定义 className */}
      <Table {...tableProps} className="custom-className" />
    </>
  )
}
```
