import { createInstance } from 'antd-style'
import type { BaseReturnType, ClassNameGeneratorOption, ReturnStyles, CreateStylesUtils, ThemeProviderProps } from 'antd-style'
import { ReactElement } from 'react'

interface DefaultToken {
  primaryColor: string
  secondaryColor: string
  greyColor: string
  textColor: string
  whiteColor: string
}

const styleInstance = createInstance<DefaultToken>({
  // **** 样式生成相关 **** //

  key: 'd-pro', // 类前缀, d-pro-**
  hashPriority: 'low', // 降低权重

  // ***** 主题相关 ***** //
  // 配置默认传给 ThemeProvider 的 props，而该 Provider 同样可以被外部覆盖 props
  // 配置后的值也会成为相关方法消费的默认值，这样一来不需要包裹 ThemeProvider 即可消费到默认值

  customToken: {
    primaryColor: '#1D43FE',
    secondaryColor: '#575B66',
    greyColor: '#ECEDEE',
    textColor: '#101626',
    whiteColor: '#FFFFFF',
  }, // 公共 token
})

export const {
  // **** 核心样式方法 **** //
  createStyles,
  createStylish,
  createGlobalStyle,

  // **** 基础样式方法 **** //
  cx,
  css,

  // **** 样式表管理 **** //
  styleManager,

  // **** 数据容器 **** //
  useTheme,
  StyleProvider,
  ThemeProvider,
} = styleInstance as Omit<typeof styleInstance, 'createStyles' | 'ThemeProvider'> & {
  createStyles: CreateStyles
  ThemeProvider: <T_1 = any, S = any>(props: ThemeProviderProps<T_1, S>) => ReactElement
}

export interface CoverCreateStylesUtils extends Omit<CreateStylesUtils, 'token'> {
  token: CreateStylesUtils['token'] & DefaultToken
}

type GetStyleFn<Input extends BaseReturnType, Props> = (utils: CoverCreateStylesUtils, props: Props) => Input

type StyleOrGetStyleFn<Input extends BaseReturnType, Props> = Input | GetStyleFn<Input, Props>

type CreateStyles = <Props, Input extends BaseReturnType = BaseReturnType>(styleOrGetStyle: StyleOrGetStyleFn<Input, Props>, options?: ClassNameGeneratorOption | undefined) => (props?: Props | undefined) => ReturnStyles<Input>
