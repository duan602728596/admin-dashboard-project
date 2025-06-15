import { createRoot, type Root } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { ConfigProvider, App } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import '@ant-design/v5-patch-for-react-19';
import Routes from './router/Routes';
import './tailwindcss.css';
import './index.global.sass';

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