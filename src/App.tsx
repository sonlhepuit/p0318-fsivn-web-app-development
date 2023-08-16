import React from 'react';

import { ConfigProvider } from 'antd';
import { Provider } from 'mobx-react';
import { RouterProvider } from 'react-router-dom';

import './index.css';
import './index.scss';
import theme from './assets/theme';
import { router } from './routers';
import store from './stores/rootStore';

export const App: React.FC = () => (
    <React.StrictMode>
        <Provider {...store} >
            <ConfigProvider theme={theme}>
                <RouterProvider router={router} />
            </ConfigProvider>
        </Provider>
    </React.StrictMode>
);
