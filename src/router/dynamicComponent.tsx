import { lazy, Suspense, type ReactElement, type LazyExoticComponent, type ComponentType, type FunctionComponent } from 'react';
import { Spin } from 'antd';

export type LoaderReturn<T = any> = Promise<{ default: ComponentType<T> }>
type Loader<T = any> = () => LoaderReturn<T>;

const Loading: ReactElement = (
  <div className="py-[100px] text-center">
    <Spin size="large" />
  </div>
);

/**
 * 异步加载、注入模块和reducer
 * @param { Loader } loader - 需要异步注入的模块
 * @param { boolean } displayFallback - 是否显示loading
 */
function dynamicComponent<T = any>(loader: Loader<T>, displayFallback: boolean = true): FunctionComponent {
  const Component: any = lazy(loader) as LazyExoticComponent<ComponentType<T>>;

  return function(props: Record<string, any>): ReactElement {
    return (
      <Suspense fallback={ displayFallback ? Loading : null }>
        <Component { ...props } />
      </Suspense>
    );
  };
}

export default dynamicComponent;