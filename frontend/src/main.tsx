import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import { action as authAction } from './pages/auth';
import { action as todoDeleteAction } from './pages/delete';
import ErrorPage from './pages/error-page';
import HomePage from './pages/home';
import { action as todoNewAction } from './pages/new-todo';
import { loader as todoAllAction } from './pages/home';
import RootLayout from './pages/root';

import { logoutAction, tokenLoader } from '../util/auth';
import AuthPage from './pages/auth';
import EditTodoPage from './pages/edit-todo';
import NewTodoPage from './pages/new-todo';
import { Provider } from 'react-redux';
import store from './store';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    loader: tokenLoader,
    children: [
      { index: true, element: <HomePage />, loader: todoAllAction },
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
      { path: 'logout', action: logoutAction },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
