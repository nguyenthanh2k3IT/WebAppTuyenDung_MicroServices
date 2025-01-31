import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CustomerRegister from '../components/customer-register';
import CompanyRegister from '../components/company-register';

function RegisterPage() {
    return (
        <Tabs defaultValue="jobseeker" className="w-full max-w-[480px] bg-white rounded-2xl p-8 shadow-lg z-10">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="jobseeker">Người tìm việc</TabsTrigger>
                <TabsTrigger value="company">Doanh nghiệp</TabsTrigger>
            </TabsList>
            <TabsContent value="jobseeker">
                <CustomerRegister />
            </TabsContent>
            <TabsContent value="company">
                <CompanyRegister />
            </TabsContent>
            <div className="text-base flex items-center gap-1 justify-center mt-4">
                <p>Đã có tài khoản?</p>
                <Link
                    to="/auth/dang-ki"
                    className="font-semibold text-gray-700 hover:text-black transition cursor-pointer"
                >
                    Đăng nhập ngay
                </Link>
            </div>
        </Tabs>
    );
}

export default RegisterPage;
