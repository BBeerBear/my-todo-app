import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import HomePage from './pages/home';
import ErrorPage from './pages/error-page';
import RootLayout from './pages/root';
import { action as todoDeleteAction } from './pages/delete';
import AuthPage from './pages/auth';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: 'todos/:todoId/delete',
        action: todoDeleteAction,
      },
    ],
  },
  { path: '/auth', element: <AuthPage /> },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
