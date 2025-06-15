import { useRef, useEffect, type ReactElement, type Ref } from 'react';
// @ts-expect-error
import { use, init, type EChartsType } from 'echarts/core.js';
// @ts-expect-error
import { PieChart } from 'echarts/charts.js';
// @ts-expect-error
import { GridComponent, DatasetComponent, TransformComponent } from 'echarts/components.js';
// @ts-expect-error
import { CanvasRenderer } from 'echarts/renderers.js';

use([
  GridComponent,
  DatasetComponent,
  TransformComponent,
  PieChart,
  CanvasRenderer
]);

/* 图表1，仅admin用户可见 */
function Chart1(props: {}): ReactElement {
  const divRef: Ref<HTMLDivElement | null> = useRef<HTMLDivElement | null>(null);
  const echartRef: Ref<EChartsType | null> = useRef<EChartsType | null>(null);

  useEffect(function(): void | (() => void) {
    if (!divRef.current) return;

    echartRef.current = init(divRef.current);
    echartRef.current.setOption({
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: '50%',
          data: [
            { value: 1048, name: 'Search Engine' },
            { value: 735, name: 'Direct' },
            { value: 580, name: 'Email' },
            { value: 484, name: 'Union Ads' },
            { value: 300, name: 'Video Ads' }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
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

export default Chart1;