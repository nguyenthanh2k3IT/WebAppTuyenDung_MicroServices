import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Link, useNavigate } from 'react-router-dom';
import { AuthNavigate } from '../navigate';
import { useState } from 'react';
import useCaller from '@/hooks/useCaller';
import ValidatorHelper from '@/helpers/validator.helper';

interface RegisterForm {
    email: string;
    password: string;
    phone: string;
    fullname: string;
    address: string;
}

function RegisterPage() {
    const navigate = useNavigate();
    const { callApi, loading } = useCaller<any>();
    const [data, setData] = useState<RegisterForm>({
        email: '',
        password: '',
        phone: '',
        fullname: '',
        address: '',
    });
    const [errors, setErrors] = useState({ email: '', password: '', phone: '', fullname: '', address: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const validate = (): boolean => {
        let isValid = true;
        const newErrors = { email: '', password: '', phone: '', fullname: '', address: '' };

        if (!data.email) {
            newErrors.email = 'Email is required';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(data.email)) {
            newErrors.email = 'Email is invalid';
            isValid = false;
        }

        if (!data.password) {
            newErrors.password = 'Password is required';
            isValid = false;
        } else if (data.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
            isValid = false;
        }

        if (!data.fullname) {
            newErrors.fullname = 'Fullname is required';
            isValid = false;
        }

        if (!data.phone) {
            newErrors.phone = 'Phone is required';
            isValid = false;
        } else {
            const result = ValidatorHelper.isValidPhone(data.phone);
            if (!result) {
                newErrors.phone = 'Phone is in valid';
                isValid = false;
            }
        }

        if (!data.address) {
            newErrors.address = 'Address is required';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async () => {
        if (!validate()) return;

        const result = await callApi(
            `/identity-service/api/Auth/register`,
            {
                method: 'POST',
                body: data,
            },
            'Account register successfully',
        );
        if (result.succeeded) {
            navigate('/auth/login');
        }
    };

    return (
        <Card className="w-full max-w-md">
            <CardHeader>
                <div className="flex justify-between mb-4 border-b">
                    <div className="w-1/2 text-center py-2 text-sm font-medium text-gray-900 border-b-2 border-blue-500">
                        REGISTER
                    </div>
                    <Link
                        to={AuthNavigate.login.link}
                        className="w-1/2 text-center py-2 text-sm font-medium text-gray-500 hover:text-gray-700"
                    >
                        SIGN IN
                    </Link>
                </div>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                            EMAIL:
                        </label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            onChange={handleChange}
                            value={data.email}
                        />
                        <p className="text-xs text-gray-500">We'll send your code confirmation here</p>
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
                            onChange={handleChange}
                            value={data.password}
                        />
                        <p className="text-xs text-gray-500">Must be 10 or more characters</p>
                        {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="fullname" className="text-sm font-medium">
                            FULL NAME:
                        </label>
                        <Input
                            id="fullname"
                            type="text"
                            placeholder="Enter your full name"
                            onChange={handleChange}
                            value={data.fullname}
                        />
                        {errors.fullname && <p className="text-red-500 text-xs">{errors.fullname}</p>}
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="phone" className="text-sm font-medium">
                            PHONE NUMBER:
                        </label>
                        <Input
                            id="phone"
                            type="tel"
                            placeholder="Enter your phone number"
                            onChange={handleChange}
                            value={data.phone}
                        />
                        {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="address" className="text-sm font-medium">
                            Address:
                        </label>
                        <Input
                            id="address"
                            type="text"
                            placeholder="Enter your address"
                            onChange={handleChange}
                            value={data.address}
                        />
                        {errors.address && <p className="text-red-500 text-xs">{errors.address}</p>}
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col items-center">
                    <Button className="w-full" disabled={loading} onClick={handleSubmit}>
                        JOIN ASOS
                    </Button>
                </CardFooter>
            </CardHeader>
        </Card>
    );
}

export default RegisterPage;
