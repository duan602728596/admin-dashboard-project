import { useRef, useEffect, type ReactElement, type Ref } from 'react';
// @ts-expect-error
import { use, init, type EChartsType } from 'echarts/core.js';
// @ts-expect-error
import { BarChart } from 'echarts/charts.js';
// @ts-expect-error
import { GridComponent, DatasetComponent, TransformComponent } from 'echarts/components.js';
// @ts-expect-error
import { CanvasRenderer } from 'echarts/renderers.js';

use([
  GridComponent,
  DatasetComponent,
  TransformComponent,
  BarChart,
  CanvasRenderer
]);

/* 图表2，所有用户可见 */
function Chart2(props: {}): ReactElement {
  const divRef: Ref<HTMLDivElement | null> = useRef<HTMLDivElement | null>(null);
  const echartRef: Ref<EChartsType | null> = useRef<EChartsType | null>(null);

  useEffect(function(): void | (() => void) {
    if (!divRef.current) return;

    echartRef.current = init(divRef.current);
    echartRef.current.setOption({
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar'
        }
      ]
    });

    return function(): void {
      if (!echartRef.current) return;

      echartRef.current.dispose();
    };
  }, []);

  return <div ref={ divRef } className="w-[460px] h-[400px]" />;
}

export default Chart2;