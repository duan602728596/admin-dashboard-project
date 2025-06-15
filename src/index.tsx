import { createRoot, type Root } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { ConfigProvider, App } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import '@ant-design/v5-patch-for-react-19';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn.js';
import Routes from './router/Routes';
import './tailwindcss.css';
import './index.global.sass';

dayjs().locale('zh-cn');

const root: Root = createRoot(document.getElementById('root')!);

root.render(
  <BrowserRouter>
    <ConfigProvider locale={ zhCN }>
      <App component={ false }>
        <Routes />
      </App>
    </ConfigProvider>
  </BrowserRouter>
);