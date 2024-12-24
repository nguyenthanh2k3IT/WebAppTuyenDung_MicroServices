import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { AdminNavigate } from '../../navigate';
import useCaller from '@/hooks/useCaller';
import { setToken } from '@/helpers/storage.helper';
import LoadingButton from '@/components/ui/loading-button';

function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({ email: '', password: '' });
    const { loading, callApi } = useCaller<Authentication>();

    const navigate = useNavigate();

    const validateForm = () => {
        let isValid = true;
        const newErrors = { email: '', password: '' };

        if (!email) {
            newErrors.email = 'Email is required';
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
            '/identity-service/api/Auth/admin/login',
            {
                method: 'POST',
                body: { email, password },
            },
            'Login Success',
        );

        if (result.data) {
            setToken(result.data);
            setTimeout(() => {
                navigate(AdminNavigate.dashboard.link);
            }, 1500);
        }
    };

    return (
        <Card className="w-full max-w-md">
            <CardHeader>
                <h2 className="text-2xl font-bold text-center">Admin Login</h2>
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
                <LoadingButton className="w-full" onClick={handleLogin} isLoading={loading} loadingText="Logging in...">
                    SIGN IN
                </LoadingButton>
            </CardFooter>
        </Card>
    );
}

export default AdminLogin;
