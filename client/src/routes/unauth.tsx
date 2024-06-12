import { siteConfig } from '@/configs/site';
import { ForgotPasswordPage, LoginPage, ResetPasswordPage, SignupPage } from '@/pages';

export const unauthRoutes = [
  {
    path: siteConfig.paths.login(),
    element: <LoginPage />,
  },
  {
    path: siteConfig.paths.signup(),
    element: <SignupPage />,
  },
  {
    path: siteConfig.paths.forgotPassword(),
    element: <ForgotPasswordPage />,
  },
  {
    path: siteConfig.paths.resetPassword(),
    element: <ResetPasswordPage />,
  }
];