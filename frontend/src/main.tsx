import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import HomePage from './pages/home';
import ErrorPage from './pages/error-page';
import RootLayout from './pages/root';
import { action as todoDeleteAction } from './pages/delete';
import { action as authAction } from './pages/auth';
import { action as todoNewAction } from './pages/new-todo';

import AuthPage from './pages/auth';
import NewTodoPage from './pages/new-todo';
import EditTodoPage from './pages/edit-todo';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: 'todos',
        children: [
          {
            path: ':todoId',
            children: [
              { path: 'delete', action: todoDeleteAction },
              { path: 'complete' },
              { path: 'edit', element: <EditTodoPage /> },
            ],
          },
          { path: 'new', element: <NewTodoPage />, action: todoNewAction },
        ],
      },
      { path: 'auth', element: <AuthPage />, action: authAction },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
