import { Dispatch, Key, SetStateAction, useCallback } from 'react'
import { FilterProps } from '../../components/Filter'

interface Props<TFilter extends object = any> {
  id: Key
  filter: TFilter
  onFilterChange: Dispatch<SetStateAction<TFilter>>
  onFilterReset: () => void
  onRequest: () => void
  defaultFilter?: TFilter
}

const useFilterProps = <TFilter extends object = any>(props: Props<TFilter>): FilterProps<TFilter> => {
  const {
    id,
    filter,
    onFilterChange,
    onFilterReset,
    onRequest,
    defaultFilter,
  } = props

  return {
    id,
    value: filter,
    defaultValue: defaultFilter,
    onReset: onFilterReset,
    onChange: useCallback((filter: TFilter) => {
      onFilterChange(() => filter)
    }, [onFilterChange]),
    onRequest,
  }
}

export default useFilterProps
