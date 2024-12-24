import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { AuthNavigate } from '../navigate';
import useCaller from '@/hooks/useCaller';
import { setToken } from '@/helpers/storage.helper';
import LoadingButton from '@/components/ui/loading-button';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({ email: '', password: '' });
    const { loading, callApi } = useCaller<Authentication>();

    const validateForm = () => {
        let isValid = true;
        const newErrors = { email: '', password: '' };

        if (!email) {
            newErrors.email = 'Email is required';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email is invalid';
            isValid = false;
        }

        if (!password) {
            newErrors.password = 'Password is required';
            isValid = false;
        } else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleLogin = async () => {
        if (!validateForm()) return;

        const result = await callApi(
            '/identity-service/api/Auth/login',
            {
                method: 'POST',
                body: { email, password },
            },
            'Login Success',
        );

        if (result.data) {
            setToken(result.data);
            setTimeout(() => {
                window.location.href = '/';
            }, 1500);
        }
    };

    return (
        <Card className="w-full max-w-md">
            <CardHeader>
                <div className="flex justify-between mb-4 border-b">
                    <Link
                        to={AuthNavigate.register.link}
                        className="w-1/2 text-center py-2 text-sm font-medium text-gray-500 hover:text-gray-700"
                    >
                        REGISTER
                    </Link>
                    <div className="w-1/2 text-center py-2 text-sm font-medium text-gray-900 border-b-2 border-blue-500">
                        SIGN IN
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                        EMAIL ADDRESS:
                    </label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
                </div>
                <div className="space-y-2">
                    <label htmlFor="password" className="text-sm font-medium">
                        PASSWORD:
                    </label>
                    <Input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleLogin();
                            }
                        }}
                    />
                    {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
                </div>
            </CardContent>
            <CardFooter className="flex flex-col items-center">
                <LoadingButton
                    className="w-full"
                    onClick={handleLogin}
                    isLoading={loading}
                    loadingText="Please wait a few minutes ..."
                >
                    SIGN IN
                </LoadingButton>
                <Link to={AuthNavigate.forgetPassword.link} className="text-sm text-blue-600 hover:underline mt-4">
                    Forgot password?
                </Link>
            </CardFooter>
        </Card>
    );
}

export default LoginPage;
