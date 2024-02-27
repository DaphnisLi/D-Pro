import { Key, useCallback, ReactElement, Children, isValidElement, useState, useMemo } from 'react'
import { noop } from '../../../helpers/lib'
import useControlledState from '../../../helpers/useControlledState'
import useStorage from '../../../helpers/useStorage'
import { uniq, find } from 'lodash-es'
import { FieldSetterProps } from '..'

type FieldSetterCommonProps = {
  hideButton?: boolean

  defaultVisible?: boolean
  visible: boolean
  setVisible: (visible: boolean) => void

  visibleFields: ReactElement[]
  setVisibleFields: (visibleFields: ReactElement[]) => void
}

const getDefaultVisibleFields = (fields: ReactElement[], savedVisibleFieldsKeys: Key[] = []): ReactElement[] => {
  const shouldCalSaved = Array.isArray(savedVisibleFieldsKeys) && savedVisibleFieldsKeys.length > 0
  const defaultFields = Children.toArray(fields).filter(isValidElement)

  if (!shouldCalSaved) {
    return defaultFields
  }

  if (!Array.isArray(defaultFields)) {
    return []
  }

  const defaultFieldKeys = Children.map(defaultFields, (child: ReactElement) => child.props.field)

  const extraVisibleFieldKeys = savedVisibleFieldsKeys.filter(item => defaultFieldKeys.includes(item))

  return uniq(extraVisibleFieldKeys.concat(defaultFieldKeys))
    .map(key => find(Children.toArray(fields), (f: ReactElement) => f.props.field === key))
    .filter(isValidElement)
}

const useFieldSetter = (filterId: Key, fields: ReactElement[], fieldSetterProps?: FieldSetterProps): FieldSetterCommonProps => {
  const { getValue, setValue } = useStorage<Key[]>(`hh-filter-field-id:${filterId}`)
  const [renderFlag, setRenderFlag] = useState(true)

  const props = useMemo(() => {
    const visibleFields = getValue() ?? []

    if (!fieldSetterProps) {
      return {
        hideButton: false,
        defaultVisible: false,
        visibleFields: getDefaultVisibleFields(fields, visibleFields ?? []),
      }
    }

    return {
      hideButton: fieldSetterProps?.hideButton ?? false,

      defaultVisible: false,
      visible: fieldSetterProps?.visible ?? undefined,
      onVisibleChange: fieldSetterProps.onVisibleChange || noop,

      defaultVisibleFields: [],
      visibleFields: fieldSetterProps?.visibleFields ?? getDefaultVisibleFields(fields, visibleFields ?? []) ?? undefined,
      onVisibleFieldsChange: fieldSetterProps.onVisibleFieldsChange || noop,
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fieldSetterProps, fields, getValue, renderFlag])

  const [visibleFields, setVisibleColumns] = useControlledState(props.visibleFields, props.defaultVisible, props.onVisibleFieldsChange)

  const [visible, setVisible] = useControlledState(props.visible, props.defaultVisible, props.onVisibleChange)

  const onVisibleFieldsChange = useCallback((newFields: ReactElement[]) => {
    setValue(Children.map(newFields, child => child?.props?.field))

    setVisibleColumns(newFields)

    setRenderFlag(p => !p)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    hideButton: props.hideButton,

    visible: visible!,
    setVisible,

    visibleFields: visibleFields as ReactElement[],
    setVisibleFields: onVisibleFieldsChange,
  }
}

export default useFieldSetter

export type {
  FieldSetterCommonProps
}
