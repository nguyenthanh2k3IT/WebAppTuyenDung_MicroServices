import WebTitle from '@/components/label/web-title.label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';

import React from 'react';

function CompanyRegister() {
    return (
        <Fragment>
            <Link to="/" className="text-center">
                <WebTitle className="py-2" />
            </Link>
            <form className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="email">Tên đăng nhập:</Label>
                    <Input id="username" type="text" placeholder="Nhập tên đăng nhập..." className="h-12" required />
                </div>

                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <Label htmlFor="password">Mật khẩu</Label>
                        <Link to="/auth/quen-mat-khau" className="text-sm text-app-primary hover:underline">
                            Quên mật khẩu?
                        </Link>
                    </div>
                    <Input id="password" type="password" placeholder="Nhập mật khẩu..." className="h-12" required />
                </div>

                <Button type="submit" className="w-full h-12 text-base bg-app-primary hover:bg-app-primary-hover">
                    ĐĂNG KÝ
                </Button>
            </form>
        </Fragment>
    );
}

export default CompanyRegister;
