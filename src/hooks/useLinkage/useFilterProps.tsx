import { Dispatch, Key, SetStateAction, useCallback } from 'react'
import { FilterProps } from '../../components/Filter'

interface Props<TFilter extends object = any> {
  id: Key
  filter: TFilter
  onFilterChange: Dispatch<SetStateAction<TFilter>>
  onFilterReset: () => void
  onRequest: () => void
  addSnapshotItem: (item: TFilter, title: string) => void
  checkSnapshotItem: (title: string) => {
    isPass: boolean
    message: string
  }
  defaultFilter?: TFilter
}

const useFilterProps = <TFilter extends object = any>(props: Props<TFilter>): FilterProps<TFilter> => {
  const {
    id,
    filter,
    onFilterChange,
    onFilterReset,
    onRequest,
    addSnapshotItem,
    checkSnapshotItem,
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
    addSnapshotItem,
    checkSnapshotItem,
  }
}

export default useFilterProps
