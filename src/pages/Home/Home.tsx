import type { ReactElement, FunctionComponent } from 'react';
import { Card } from 'antd';
import dynamicComponent, { type LoaderReturn } from '../../router/dynamicComponent';
import Chart1Auth from './Chart1/Chart1Auth';

const Chart2: FunctionComponent = dynamicComponent((): LoaderReturn => import('./Chart2.js') as unknown as LoaderReturn);

/* 首页，模拟不同的用户展示不同的权限 */
function Home(props: {}): ReactElement {
  return (
    <div className="p-[20px]">
      <div className="flex">
        <div className="mr-[16px]">
          <Chart1Auth />
        </div>
        <div>
          <Card className="m-[16px]" styles={{ body: { width: 460 + 48 } }} title="所有人可见的图表">
            <Chart2 />
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Home;