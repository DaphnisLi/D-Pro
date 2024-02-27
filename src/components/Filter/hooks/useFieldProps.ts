import StyledProps from '../../../types/styledProps'
import { FilterFieldProps } from '../components/Field'

type FieldProps<T> = FilterFieldProps<T> & StyledProps

export const useFieldProps = <T extends object = any>(props: FilterFieldProps<T> & StyledProps & T): { fieldProps: FieldProps<T>, restProps: T } => {
  const {
    label,
    compact = false,
    tooltip,
    labelCol,
    wrapperCol,
    colon,
    labelAlign,
    style,
    className,
    field,
    ...restProps
  } = props

  delete (restProps as any).value
  delete (restProps as any).defaultValue
  delete (restProps as any).onChange

  return {
    fieldProps: {
      compact,
      label,
      labelCol,
      wrapperCol,
      colon,
      labelAlign,
      style,
      className,
      tooltip,
      field,
    },
    restProps: restProps as T,
  }
}
