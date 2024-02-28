---
title: Filter
order: 2
---

# Filter 筛选器

### 简单示例

<code src="./Base.tsx"></code>

## API
### Filter


| 参数                        | 说明                                   | 类型                                           | 默认值  | 版本 |
| --------------------------- | -------------------------------------- | ---------------------------------------------- | ------- | ---- |
| `id`                        | 必填                         | `React.Key`                                    | -       |      |
| `value`                     | 值                                     | `T extends object`                         | `{}`    |      |
| `defaultValue`              | 默认值                                 | `T extends object`                         | -       |      |
| `onChange`                  | 值变更回调                             | `(value: <T>) => void`              | -       |      |
| `maxShow`                   | 最大展示的数，超过则折叠             | `number`                                       | `3`     |      |
| `showReset`                 | 是否展示重置的按钮                     | `boolean`                                      | `true`  |      |
| `onReset`                   | 重置时的回调，第一参数为默认的重置函数 | `() => void`                | -       |      |
| `onFilterExpandChange`        | 展开筛选项变更回调                       | `(isExpand: boolean) => void` | -       |      |
| `className`                 | 定义元素上的 `className`               | `string`                                       | -       |      |
| `style`                     | 定义元素上的 `style`                   | `React.CSSProperties`                          | -       |      |
| `onRequest`                     | 请求函数                   | `() => void`                          | -       |      |


### 子组件

除了 `Filter` 外, 本库还为你提供了更多的表单子组件，自动绑定值在 `Filter` 上，使你可以摆脱繁琐的值绑定过程，如下是组件对应表：

| 原 antd 组件         |             封装            |
| ------------------- | -------------------------- |
| `<Input />`         | `<Filter.Input />`       |
| `<Select />`        | `<Filter.Select />`      |
| `<DatePicker />`    | `<Filter.DatePicker />`  |
| `<RangePicker />`   | `<Filter.RangePicker />` |


并在 antd 对应的基础组件的参数上新增了如下公共参数，用于做特殊的扩展：

| 参数             | 说明                                                                   | 类型                  | 默认值  | 版本 |
| --------------------- | ------------------------------------------------------ | --------------------- | ------- | ---- |
| `field`          | 该表单项的值所对应的 `value` 中的字段名                                | `string`              | -       |      |
| `label`          | 表单文案                                                               | `string`              | -       |      |
| `className` | 复写 `Field` 组件上的 `className`                                      | `string`              | -       |      |
| `style`     | 复写 `Field` 组件上的 `style`                                          | `React.CSSProperties` | -       |      |
| `tooltip`            | 表单项提示                                                             | `React.ReactNode`     | -       |      |
| `labelCol`            | label 标签布局，同 `<Col>` 组件，设置 span offset 值，如 {span: 3, offset: 12} 或 sm: {span: 3, offset: 12} ,优先级高于 Filter                                                            |[object](https://ant-design.antgroup.com/components/grid-cn#col)     | -       |      |
| `wrapperCol`            | 需要为输入控件设置布局样式时，使用该属性，用法同 labelCol, 优先级高于 Filter                                                            |[object](https://ant-design.antgroup.com/components/grid-cn#col)     | -       |      |
| `colon`            | 表示是否显示 label 后面的冒号                                                             | `boolean`     | false      |      |
| `labelAlign`            | label 标签的文本对齐方式                                                             | `left ｜ right`     | right       |      |

除了以上参数外，其他参数和 antd 对应组件参数一致。

### Filter.Field

如果预设的组件无法满足你的需要, 那么你需要自定义组件, 为此提供了 `Filter.Field`

```jsx | pure
<Filter onChange={value => /* 这里的 value: { field1: '' } */}>
  <Filter.Field label="Field1" field="field1">
    <YourComponent />
  </Filter.Field>
</Filter>
```

通过如上这种方法，`Field` 会自动代理 `YourComponent` 组件的 `value` 和 `onChange`，为你自动绑定值到 `field1` 字段上。

如果你想要更加灵活的处理绑定，可以直接通过函数自行处理绑定关系：

```jsx | pure
<Filter onChange={value => /* 这里的 value: { field1: '' } */}>
  <Filter.Field label="Field1" field="field1">
    {({ value, onChange }) => (
      <>
        <YourComponent value={value} onChange={onChange} />
        <p>{value}</p>
      </>
    )}
  </Filter.Field>
</Filter>
```
