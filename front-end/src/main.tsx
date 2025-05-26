import './index.css'
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { NextUIProvider } from '@nextui-org/react'
import { Toaster } from 'react-hot-toast';
import { Layout, Loading } from "./modules/core/components";
import { AuthContext, AuthProvider } from "./modules/auth/context";
import { Home } from "./modules/dashboard/pages";
import { Login, Profile } from "./modules/auth/pages";
import { TransportList, NewTransport, EditTransport } from "./modules/transaction/pages";
import { ErrorPage } from "./error-page";
import Intercom from '@intercom/messenger-js-sdk';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        element: <Home />
      },
      {
        path: '/trucks-list',
        element: <TransportList />
      },
      {
        path: '/trucks-list/new',
        element: <NewTransport />
      },
      {
        path: '/trucks-list/edit',
        element: <EditTransport />
      },
      {
        path: '/profile',
        element: <Profile />
      },
    ]
  }
]);

const Navigation = () => {

  const { status } = React.useContext(AuthContext);

  switch (status) {
    case 'checking':
      return <Loading />

    case 'not-authenticated':
      return <Login />;

    case 'authenticated':
      return <Authenticated />
  }
};

const Authenticated = () => {

  const { user } = React.useContext(AuthContext);
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);

    return () => {
      setIsMounted(false);
    }
  }, []);

  React.useEffect(() => {
    if (isMounted) {
      Intercom({
        app_id: 'x03vdqtn1',
        user_id: user?._id,
        name: `${user?.firstname} ${user?.lastname}`,
        email: user?.email,
      });
    }
  }, [isMounted]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
};

const documentRoot: any = document.getElementById('root');
ReactDOM.createRoot(documentRoot).render(
  <React.StrictMode>
    <NextUIProvider>
      <main>
        <AuthProvider>
            <Navigation />
        </AuthProvider>
        <Toaster />
      </main>
    </NextUIProvider>
  </React.StrictMode>
);