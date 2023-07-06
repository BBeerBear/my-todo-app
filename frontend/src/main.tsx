import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import { action as authAction } from './pages/auth';
import { todoDeleteAction } from '../util/todo';
import ErrorPage from './pages/error-page';
import HomePage from './pages/home';
import { action as todoNewAction } from './pages/new-todo';
import { loader as todoAllLoader } from './pages/home';
import {
  action as todoEditAction,
  loader as todoEditLoader,
} from './pages/edit-todo';
import RootLayout from './pages/root';

import {
  logoutAction,
  checkAuthLoaderInHome,
  checkAuthLoaderInAuth,
} from '../util/auth';
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
    loader: checkAuthLoaderInHome,
    children: [
      { index: true, element: <HomePage />, loader: todoAllLoader },
      {
        path: 'todos',
        children: [
          {
            path: ':todoId',
            children: [
              { path: 'delete', action: todoDeleteAction },
              { path: 'complete' },
              {
                path: 'edit',
                element: <EditTodoPage />,
                loader: todoEditLoader,
                action: todoEditAction,
              },
            ],
          },
          { path: 'new', element: <NewTodoPage />, action: todoNewAction },
        ],
      },
      { path: 'logout', action: logoutAction },
    ],
  },
  {
    path: 'auth',
    element: <AuthPage />,
    loader: checkAuthLoaderInAuth,
    action: authAction,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
