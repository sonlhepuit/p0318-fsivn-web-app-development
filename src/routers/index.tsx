import { lazy } from 'react';

import { createBrowserRouter } from 'react-router-dom';

import AuthPage from './../components/pages/AuthPage/AuthPage';
import { NotFound } from './../components/pages/NotFound';
import ProtectedRoute from '../assets/middleware/ProtectedRoute';
import Login from '../components/pages/Login/Login';
const Home = lazy(() => import('./../components/pages/Home'));

export const router = createBrowserRouter([
    {
        path: '/',
        children: [
            {
                path: 'sign-in',
                element: <Login />,
            },
            {
                path: 'home',
                element: (
                    <ProtectedRoute>
                        <Home />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'auth/:authType',
                element: <AuthPage />,
            },
            {
                path: '*',
                element: <NotFound />,
            },
        ],
    },
]);
