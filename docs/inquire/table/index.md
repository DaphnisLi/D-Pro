---
title: Table
order: 3
---


# Table 表格

### 简单示例

<code src="./Base.tsx"></code>


### 可拖拽列

<code src="./Resizable.tsx"></code>

## API

### Table

| 参数                 | 说明                                                                              | 类型                                                                                            | 默认值       |
| -------------------- | --------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- | ------------ |
| `id`                 | 必填   | `React.Key`                                                                                     | -            |
| `columns`            | 列设置                                                                            | [`ColumnProps<RecordType>[]`](#columnprops)                                                 | `[]`         |
| `rowSelection`       | 行选择配置                                                                        | [`TableRowSelectionProps<RecordType>`](#tablerowselectionprops)                             | -            |
| `rowOperation`       | 表格操作区统一配置                                                                | `(record: RecordType) => ReactNode`                                                             | -            |
| `columnSetter`       | 表格列设置                                                                        | [`ColumnSetterProps<RecordType>`](#columnsetterprops)                                           | -            |
| `onColumnSizeChange` | 列宽度变化时回调                                                                  | `(columnKey: Key, width: number, event: MouseEventHandler<HTMLTableHeaderCellElement>) => void` | -            |
| `wrapCard`           | 默认会使用 Card 组件包裹 Table，如果不需要，可以将此参数设置为 `false` | `boolean`                                                                                       | `true`       |
| `renderOperationBar` | 渲染表格顶部操作栏，完整隐藏操作栏可以设置为 false                                | `false ｜ ((props: { count: number }) => ReactNode)`                                                                |  |
| `className`          | 定义 Table 的 `className`                                                       | `string`                                                                                        | -            |
| `style`              | 定义 Table 的 `style`                                                           | `React.CSSProperties`                                                                           | -            |
| `tableClassName`     | 定义表格的 `className`                                                            | `string`                                                                                        | -            |
| `tableStyle`         | 定义表格的 `style`                                                                | `React.CSSProperties`|

其他参数参考 Antd [Table](https://ant.design/components/table-cn#table)


### ColumnProps

| 参数                 | 说明                                                                              | 类型                                                                                            | 默认值       |
| -------------------- | --------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- | ------------ |
| `key`            | 选填，列的唯一键                                                                                | `React.Key`                                                                        | `dataIndex`       |
| `dataIndex`      | 列数据在数据项中对应的路径，支持通过数组查询嵌套路径 | `string ｜number` | -       |
| `plainTitle`     | 纯文本标题, 当 title 有的内容比较奇怪的时候, 可以使用此字段, 使得设置表头弹窗可以有更好的表现                | `React.ReactNode`                                                                  | -       |
| `resizable` | 支持调整宽度 | - | - |

其他参数参考 Antd [Table](https://ant.design/components/table-cn#column)


### TableRowSelectionProps

| 参数          | 说明                     | 类型      | 默认值 |
| ------------- | ------------------------ | --------- | ------ |
| `showCounter` | 展示计数器 | `boolean` | `true` |

其他参数参考 Antd [Table](https://ant.design/components/table-cn#rowselection)

### ColumnSetterProps
| 参数                     | 说明                                                                            | 类型                                                    | 默认值 |
| ------------------------ | ------------------------------------------------------------------------------- | ------------------------------------------------------- | ------ |
| `hideButton`             | 是否隐藏设置按钮,默认显示                                                           | `boolean`                                               | -  |
| `visible`                | 受控值，是否展示设置弹窗                                                        | `boolean`                                               | -      |
| `defaultVisible`         | 默认是否展示设置弹窗                                                            | `boolean`                                               | -      |
| `onVisibleChange`        | 是否展示回调                                                                    | `(visible: boolean) => void`                            | -      |
| `visibleColumns`         | 受控值，展示的列。该值的默认值通过 `column.defaultVisible` 自动推断而来 | `ColumnsType<RecordType>[]`                           | -      |
| `onVisibleColumnsChange` | 展示的列修改回调                                                                | `(visibleColumns: ColumnsType<RecordType>[]) => void` | -      |

### Table.Operations
操作区

| 参数             | 说明                     | 类型                  | 默认值 |
| ---------------- | ------------------------ | --------------------- | ------ |
| `className`      | 定义元素上的 `className` | `string`              | -      |
| `style`          | 定义元素上的 `style`     | `React.CSSProperties` | -      |
| `dropdownClassName`  | 定义菜单的 `className`   | `string`              | -      |
| `dropdownStyle`      | 定义菜单的 `style`       | `React.CSSProperties` | -      |

### Table.Operations.Item
定义操作区的操作项

| 参数          | 说明                                   | 类型                                      | 默认值 |
| ------------- | -------------------------------------- | ----------------------------------------- | ------ |
| `key`         | 必填，列的唯一键                       | `React.Key`                               | -      |
| `disabled`    | 是否禁用                               | `boolean`                                 | -      |
| `showOutside` | 是否展示在外面，默认被收起             | `boolean`                                 | -      |
| `tip`         | hover 时候提示信息，一般用于禁用态提示 | `React.ReactNode`                         | -      |
| `onClick`     | 点击回调                               | `React.MouseEventHandler<HTMLDivElement>` | -      |
| `children`    | 子元素                                 | `React.ReactNode`                         | -      |
| `className`   | 定义元素上的 `className`               | `string`                                  | -      |
| `style`       | 定义元素上的 `style`                   | `React.CSSProperties`                     | -      |
| `href`        | 打开链接                   | `string`                     | -      |
| `target`       | 链接的打开方式                   | [string](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/a#target)                     | -      |

