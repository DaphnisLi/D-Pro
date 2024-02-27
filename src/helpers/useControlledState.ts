import { useState, useCallback, useRef } from 'react'
import { usePrevious } from 'ahooks'

const useControlledState = <T, P extends any[] = []>(
  value?: T | undefined,
  defaultValue?: T | undefined,
  onChange?: (value: T, ...args: P) => void,
) => {
  const previousValue = usePrevious(value)
  const isControlledRef = useRef(typeof value !== 'undefined')
  const [initialValue, setInitialValue] = useState(defaultValue)

  const handleChange = useCallback((value: T, ...args: P) => {
    if (typeof onChange === 'function') {
      onChange(value, ...args)
    }

    setInitialValue(value)
  }, [onChange])

  if (typeof value !== 'undefined' && typeof previousValue === 'undefined') {
    isControlledRef.current = true
  }

  if (isControlledRef.current) {
    return [value, handleChange] as const
  }

  return [initialValue, handleChange] as const
}

export default useControlledState
