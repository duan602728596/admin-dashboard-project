import type { ReactElement } from 'react';
import { Result } from 'antd';

/* 404页 */
function PageNotFound(props: {}): ReactElement {
  return <Result status="404" title="404" subTitle="对不起，当前页面不存在" />;
}

export default PageNotFound;