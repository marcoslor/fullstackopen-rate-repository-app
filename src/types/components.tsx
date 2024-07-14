import type {
  ComponentPropsWithRef,
  JSXElementConstructor,
  PropsWithChildren,
} from 'react';

export type ExtendedComponent<TComponent extends JSXElementConstructor<any>> =
  PropsWithChildren<ComponentPropsWithRef<TComponent>>;
