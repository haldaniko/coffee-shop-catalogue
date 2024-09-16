import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { App } from './App';
import { NotFoundPage } from './modules/NotFoundPage';
import { LoginPage } from './modules/LoginPage';
import { RegistrationPage } from './modules/RegistrationPage';
import { ResetPasswordPage } from './modules/ResetPasswordPage';
import { CheckEmailPage } from './modules/CheckEmailPage';
import { CreateNewPasswordPage } from './modules/CreateNewPasswordPage';
import { CoffeeShop } from './modules/CoffeeShopPage';
import { HomePage } from './modules/HomePage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/coffee-shop/:coffee-shop-id',
        element: <CoffeeShop />,
      },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/registration',
    element: <RegistrationPage />,
  },
  {
    path: '/reset-password',
    element: <ResetPasswordPage />,
  },
  {
    path: '/check-email',
    element: <CheckEmailPage />,
  },
  {
    path: '/new-password',
    element: <CreateNewPasswordPage />,
  },
]);

export const Root = () => {
  return <RouterProvider router={router} />;
};
