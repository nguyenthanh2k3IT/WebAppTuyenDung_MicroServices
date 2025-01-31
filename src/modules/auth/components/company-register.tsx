import { useState } from 'react';
import { Link } from 'react-router-dom';
import WebTitle from '@/components/label/web-title.label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

function CompanyRegister() {
    const [formData, setFormData] = useState({
        email: '',
        fullname: '',
        password: '',
        confirmPassword: '',
        phone: '',
        size: '',
        provinces: '',
    });

    const [errors, setErrors] = useState({
        email: '',
        fullname: '',
        password: '',
        confirmPassword: '',
        phone: '',
        size: '',
        provinces: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
        setErrors((prev) => ({ ...prev, [id]: '' }));
    };

    const validateForm = () => {
        let newErrors = { ...errors };

        if (!formData.email) newErrors.email = 'Email không được để trống.';
        if (!formData.fullname) newErrors.fullname = 'Tên người dùng không được để trống.';
        if (!formData.password) newErrors.password = 'Mật khẩu không được để trống.';
        if (formData.password.length < 6) newErrors.password = 'Mật khẩu phải ít nhất 6 ký tự.';
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Mật khẩu không khớp.';
        if (!formData.phone) newErrors.phone = 'Số điện thoại không được để trống.';
        if (!formData.size) newErrors.size = 'Quy mô không được để trống.';
        if (!formData.provinces) newErrors.provinces = 'Chi nhánh không được để trống.';

        setErrors(newErrors);
        return Object.values(newErrors).every((error) => !error);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            console.log('Dữ liệu hợp lệ:', formData);
        }
    };

    return (
        <div className="max-w-md mx-auto">
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
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="password">Mật khẩu:</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="Nhập mật khẩu..."
                            className="h-10"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Xác nhận mật khẩu:</Label>
                        <Input
                            id="confirmPassword"
                            type="password"
                            placeholder="Nhập lại mật khẩu..."
                            className="h-10"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                        {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="fullname">Tên doanh nghiệp:</Label>
                    <Input
                        id="fullname"
                        type="text"
                        placeholder="Nhập tên người dùng..."
                        className="h-10"
                        value={formData.fullname}
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
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                    {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="size">Quy mô:</Label>
                        <Input
                            id="size"
                            type="text"
                            placeholder="Nhập quy mô công ty..."
                            className="h-10"
                            value={formData.size}
                            onChange={handleChange}
                            required
                        />
                        {errors.size && <p className="text-red-500 text-sm">{errors.size}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="provinces">Chi nhánh:</Label>
                        <Input
                            id="provinces"
                            type="text"
                            placeholder="Nhập chi nhánh..."
                            className="h-10"
                            value={formData.provinces}
                            onChange={handleChange}
                            required
                        />
                        {errors.provinces && <p className="text-red-500 text-sm">{errors.provinces}</p>}
                    </div>
                </div>

                <Button
                    type="submit"
                    className="w-full h-12 text-base bg-app-primary hover:bg-app-primary-bold transition !mt-6"
                >
                    ĐĂNG KÝ
                </Button>
            </form>
        </div>
    );
}

export default CompanyRegister;
