import { AuthNavigate } from '../navigate';
import AuthLayout from '../layout/auth.layout';
import { LoginPage, RegistrationPage, ForgetPasswordPage } from '../pages';

export const AuthRoutes: Route[] = [
    {
        path: AuthNavigate.login.link,
        title: AuthNavigate.login.title,
        page: LoginPage,
        layout: AuthLayout,
    },
    {
        path: AuthNavigate.register.link,
        title: AuthNavigate.register.title,
        page: RegistrationPage,
        layout: AuthLayout,
    },
    {
        path: AuthNavigate.forgetPassword.link,
        title: AuthNavigate.forgetPassword.title,
        page: ForgetPasswordPage,
        layout: AuthLayout,
    },
];
