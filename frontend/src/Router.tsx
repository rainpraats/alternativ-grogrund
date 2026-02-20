import { createBrowserRouter } from 'react-router';
import Layout from './pages/Layout';
import Home from './pages/Home';
import Account from './pages/Account';
import ManageUsers from './pages/ManageUsers';
import PageNotFound from './pages/PageNotFound';
import Login from './pages/Login';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/account', element: <Account /> },
      { path: '/manage-users', element: <ManageUsers /> },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  // {
  //   path: '/signup',
  //   element: <Signup />,
  // },
  { path: '/*', element: <PageNotFound /> },
]);
