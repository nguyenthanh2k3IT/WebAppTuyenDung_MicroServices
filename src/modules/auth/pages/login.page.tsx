import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import background from '@/assets/images/auth.png';
import logo from '@/assets/images/logo.png';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import WebTitle from '@/components/label/web-title.label';

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle login logic here
    };

    return (
        <div className="w-full max-w-[480px] bg-white rounded-2xl p-8 shadow-lg z-10">
            <Link to="/" className=" mb-8 text-center">
                <WebTitle />
            </Link>
            <div className="text-center mb-8 mt-4">
                <p className="text-gray-600">Vui lòng nhập tên tài khoản và mật khẩu để tiếp tục.</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="email">Tên đăng nhập:</Label>
                    <Input
                        id="username"
                        type="text"
                        placeholder="Nhập tên đăng nhập..."
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="h-12"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <Label htmlFor="password">Mật khẩu</Label>
                        <Link to="/auth/quen-mat-khau" className="text-sm text-app-primary hover:underline">
                            Quên mật khẩu?
                        </Link>
                    </div>
                    <Input
                        id="password"
                        type="password"
                        placeholder="Nhập mật khẩu..."
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="h-12"
                        required
                    />
                </div>

                <div className="flex items-center space-x-2">
                    <Checkbox
                        id="remember"
                        checked={rememberMe}
                        onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                    />
                    <label
                        htmlFor="remember"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Ghi nhớ tôi
                    </label>
                </div>

                <Button type="submit" className="w-full h-12 text-base bg-app-primary hover:bg-app-primary-hover">
                    ĐĂNG NHẬP
                </Button>
                <div className="text-base flex items-center gap-1 justify-center">
                    <p>Chưa có tài khoản?</p>
                    <Link
                        to="/auth/dang-ky"
                        className="font-semibold text-gray-700 hover:text-black transition cursor-pointer"
                    >
                        Đăng ký ngay
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default LoginPage;
