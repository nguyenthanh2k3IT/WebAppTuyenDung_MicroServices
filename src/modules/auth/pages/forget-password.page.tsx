import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { AuthNavigate } from '../navigate';
import { useToast } from '@/components/ui/use-toast';
import useCaller from '@/hooks/useCaller';

function ForgetPasswordPage() {
    const { toast } = useToast();
    const { loading, callApi } = useCaller<any>();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const email = formData.get('email') as string;

        if (!email) {
            toast({
                variant: 'destructive',
                title: 'Failed',
                description: 'Email is required',
                duration: 1500,
            });
            return;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            toast({
                variant: 'destructive',
                title: 'Failed',
                description: 'Email is invalid',
                duration: 1500,
            });
            return;
        }

        const result = await callApi(
            '/identity-service/api/Auth/forget-password',
            {
                method: 'PUT',
                body: email,
            },
            'Code sent to your email, please check your email !',
        );

        if (result.succeeded) {
            setTimeout(() => {
                window.location.href = AuthNavigate.login.link;
            }, 2000);
        }
    };

    return (
        <div className="container mx-auto max-w-md p-6">
            <Card>
                <CardHeader>
                    <div className="flex justify-between mb-4 border-b">
                        <Link
                            to={AuthNavigate.register.link}
                            className="w-1/2 text-center py-2 text-sm font-medium text-gray-500 border-b-2 hover:text-gray-700"
                        >
                            REGISTER
                        </Link>
                        <Link
                            to={AuthNavigate.login.link}
                            className="w-1/2 text-center py-2 text-sm font-medium text-gray-500 border-b-2 hover:text-gray-700"
                        >
                            SIGN IN
                        </Link>
                    </div>
                    <CardTitle className="text-2xl font-bold text-center">RESET YOUR PASSWORD</CardTitle>
                    <CardDescription className="text-center">
                        Type in your email address below and we'll send you an email with instructions on how to create
                        a new password
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium">
                                EMAIL ADDRESS:
                            </label>
                            <Input type="email" id="email" name="email" required className="w-full" />
                        </div>
                        <Button type="submit" className="w-full" disabled={loading}>
                            Reset Password
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

export default ForgetPasswordPage;
