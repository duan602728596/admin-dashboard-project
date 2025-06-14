import { createRoot, type Root } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router';
import { ConfigProvider, App } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import Routes from './router/Routes';
import { storeFactory } from './store/store';
import './tailwindcss.css';
import './index.global.sass';

const root: Root = createRoot(document.getElementById('root')!);

root.render(
  <Provider store={ storeFactory() }>
    <BrowserRouter>
      <ConfigProvider locale={ zhCN }>
        <App component={ false }>
          <Routes />
        </App>
      </ConfigProvider>
    </BrowserRouter>
  </Provider>
);