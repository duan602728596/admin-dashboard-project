import type { ReactElement, FunctionComponent } from 'react';
import { Card } from 'antd';
import dynamicComponent, { type LoaderReturn } from '../../../router/dynamicComponent';
import auth from '../../../components/basic/auth/auth';
import { Permissions } from '../../../enum/permissions.enum';

const Chart1: FunctionComponent = dynamicComponent((): LoaderReturn => import('./Chart1.js') as unknown as LoaderReturn);

/* 组件的权限包装 */
function Chart1Auth(props: {}): ReactElement {
  return (
    <Card className="m-[16px]" styles={{ body: { width: 460 + 48 } }} title="仅Admin用户可见的图表">
      <Chart1 />
    </Card>
  );
}

export default auth([Permissions.Admin])(Chart1Auth);