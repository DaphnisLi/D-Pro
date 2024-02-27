import { RefAttributes, forwardRef, ForwardRefRenderFunction, ComponentType, FunctionComponent } from 'react'
import hoistNonReactStatics from 'hoist-non-react-statics'

const componentWithStatics = <P, S = {}>(component: ComponentType<P>, statics?: S): FunctionComponent<P> & S => hoistNonReactStatics(component, statics as any) as any

const forwardRefWithStatics = <P, T = any, S = {}>(component: ForwardRefRenderFunction<T, P>, statics?: S) => componentWithStatics<P & RefAttributes<T>, S>(forwardRef(component) as any, statics as any)

export default forwardRefWithStatics
