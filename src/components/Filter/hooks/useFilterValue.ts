import { createContext, Key, useCallback, useContext } from 'react'
import { noop } from '../../../helpers/lib'

type FilterContextValue<T extends object = any> = {
  value: T
  onChange: (value: Partial<T>) => void
}

export const FilterContext = createContext<FilterContextValue>({
  value: {},
  onChange: noop,
})

export const useFilterValue = <T extends object = any>(key?: Key) => {
  const { value, onChange } = useContext<FilterContextValue<T>>(FilterContext)
  const realValue = key ? (value ? (value as any)[key] : undefined) : value

  const realOnChange = useCallback((v: any) => {
    onChange(key ? ({ [key]: v }) : ({ ...v }))
  }, [onChange, key])

  return { value: realValue, onChange: realOnChange }
}
