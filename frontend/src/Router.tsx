import { createBrowserRouter } from 'react-router';
import Layout from './pages/Layout';
import Home from './pages/Home';
import Account from './pages/Account';
import ManageUsers from './pages/ManageUsers';
import PageNotFound from './pages/PageNotFound';
import Login from './pages/Login';
import EmailMembers from './pages/EmailMembers';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/profil', element: <Account /> },
      { path: '/medlemmar', element: <ManageUsers /> },
      { path: '/maila', element: <EmailMembers /> },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  // {
  //   path: '/bli-medlem',
  //   element: <Signup />,
  // },
  { path: '/*', element: <PageNotFound /> },
]);
