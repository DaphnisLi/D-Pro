import { useCallback, useRef } from 'react'

const STORAGE: Storage = window.localStorage

const useStorage = <T extends object | any[] | null>(key: string) => {
  const valueRef = useRef<T | null>((() => {
    try {
      const rawValue = STORAGE.getItem(key)
      return rawValue ? JSON.parse(rawValue) : undefined
    } catch (error) {
      return undefined
    }
  })())

  const getValue = useCallback<(() => (T | null))>(() => valueRef.current, [valueRef])
  const setValue = useCallback((value: T | null) => {
    valueRef.current = value
    STORAGE.setItem(key, JSON.stringify(value))
  }, [key, valueRef])

  return { getValue, setValue }
}

export default useStorage
