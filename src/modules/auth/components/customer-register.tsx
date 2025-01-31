import WebTitle from '@/components/label/web-title.label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

interface FormValues {
    email: string;
    password: string;
    confirmPassword: string;
    fullname: string;
    phone: string;
}

function CustomerRegister() {
    const [formValues, setFormValues] = useState<FormValues>({
        email: '',
        password: '',
        confirmPassword: '',
        fullname: '',
        phone: '',
    });

    const [errors, setErrors] = useState<Partial<FormValues>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormValues({ ...formValues, [id]: value });
    };

    const validate = () => {
        let tempErrors: Partial<FormValues> = {};
        if (!formValues.email) tempErrors.email = 'Email là bắt buộc';
        if (!formValues.password) tempErrors.password = 'Mật khẩu là bắt buộc';
        if (formValues.password !== formValues.confirmPassword) tempErrors.confirmPassword = 'Mật khẩu không khớp';
        if (!formValues.fullname) tempErrors.fullname = 'Tên người dùng là bắt buộc';
        if (!formValues.phone) tempErrors.phone = 'Số điện thoại là bắt buộc';
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            console.log('Form submitted', formValues);
        }
    };

    return (
        <Fragment>
            <Link to="/" className="text-center">
                <WebTitle className="py-2" />
            </Link>
            <form className="space-y-3" onSubmit={handleSubmit}>
                <div className="space-y-2">
                    <Label htmlFor="email">Email:</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="Nhập email..."
                        className="h-10"
                        value={formValues.email}
                        onChange={handleChange}
                        required
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>

                <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-2">
                        <Label htmlFor="password">Mật khẩu</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="Nhập mật khẩu..."
                            className="h-10"
                            value={formValues.password}
                            onChange={handleChange}
                            required
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Xác nhận mật khẩu</Label>
                        <Input
                            id="confirmPassword"
                            type="password"
                            placeholder="Nhập lại mật khẩu..."
                            className="h-10"
                            value={formValues.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                        {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="fullname">Tên người dùng:</Label>
                    <Input
                        id="fullname"
                        type="text"
                        placeholder="Nhập tên người dùng..."
                        className="h-10"
                        value={formValues.fullname}
                        onChange={handleChange}
                        required
                    />
                    {errors.fullname && <p className="text-red-500 text-sm">{errors.fullname}</p>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="phone">Số điện thoại:</Label>
                    <Input
                        id="phone"
                        type="text"
                        placeholder="Nhập số điện thoại..."
                        className="h-10"
                        value={formValues.phone}
                        onChange={handleChange}
                        required
                    />
                    {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                </div>
                <Button
                    type="submit"
                    className="w-full h-12 text-base bg-app-primary hover:bg-app-primary-bold transition !mt-6"
                >
                    ĐĂNG KÝ
                </Button>
            </form>
        </Fragment>
    );
}

export default CustomerRegister;
