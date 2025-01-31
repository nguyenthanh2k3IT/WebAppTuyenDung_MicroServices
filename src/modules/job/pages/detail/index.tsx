import AppButton from '@/components/button/app.button';
import Image from '@/components/image';
import { Card, CardContent } from '@/components/ui/card';
import {
    AlarmClock,
    BriefcaseBusiness,
    CircleDollarSign,
    Clock,
    Hourglass,
    MapPinIcon,
    Package,
    Send,
    User,
    Users,
} from 'lucide-react';

function JobDetailPage() {
    return (
        <div className="wrapper pb-12 content-padding">
            <div className="grid grid-cols-10 gap-6 pt-10">
                <div className="col-span-7 space-y-6">
                    <Card>
                        <CardContent className="py-4 space-y-6">
                            <h1 className="text-xl font-semibold tracking-wider">Tech Lead/CTO</h1>
                            <div className="grid grid-cols-3">
                                <div className="flex items-center gap-4">
                                    <CircleDollarSign className="w-10 h-10 text-app-primary-bold" />
                                    <div>
                                        <p className="text-sm text-gray-600">Mức lương</p>
                                        <p className="text-base font-semibold">Thỏa thuận</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <MapPinIcon className="w-10 h-10 text-app-primary-bold" />
                                    <div>
                                        <p className="text-sm text-gray-600">Địa điểm</p>
                                        <p className="text-base font-semibold">TP. Hồ Chí Minh</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Hourglass className="w-10 h-10 text-app-primary-bold" />
                                    <div>
                                        <p className="text-sm text-gray-600">Kinh nghiệm</p>
                                        <p className="text-base font-semibold">5 năm</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 bg-gray-200 w-fit p-2 rounded-md text-sm tracking-wider">
                                <Clock />
                                <p className="text-gray-700 ">Hạn nộp hồ sơ: </p>
                                <p className="text-gray-900 font-semibold">03/03/2025</p>
                            </div>
                            <AppButton className="flex items-center gap-2 w-full justify-center">
                                <Send /> Ứng tuyển ngay
                            </AppButton>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="py-4 space-y-4">
                            <h1 className="border-l-8 border-app-primary pl-2 text-xl font-semibold">
                                Chi tiết tuyển dụng
                            </h1>
                            <div>
                                <h1 className="font-semibold text-lg mb-1">Mô tả công việc</h1>
                                <p>
                                    As a Tech Lead at XNO, you will be responsible for leading and managing the
                                    engineering team to develop a modern stock trading platform using cutting-edge
                                    technologies such as AI, Machine Learning, and Big Data. This role requires a
                                    combination of strong technical skills and leadership abilities to build a scalable,
                                    secure, and high-performance system.
                                </p>
                                <p>
                                    1. Technical Leadership • Design the system architecture and technical solutions in
                                    alignment with XNO’s product strategy. • Make key technology decisions regarding
                                    programming languages, frameworks, tools, and deployment methods. • Oversee code
                                    quality, development processes, and mentor the development team.
                                </p>
                            </div>
                            <div>
                                <h1 className="font-semibold text-lg mb-1">Mô tả công việc</h1>
                                <p>
                                    As a Tech Lead at XNO, you will be responsible for leading and managing the
                                    engineering team to develop a modern stock trading platform using cutting-edge
                                    technologies such as AI, Machine Learning, and Big Data. This role requires a
                                    combination of strong technical skills and leadership abilities to build a scalable,
                                    secure, and high-performance system.
                                </p>
                                <p>
                                    1. Technical Leadership • Design the system architecture and technical solutions in
                                    alignment with XNO’s product strategy. • Make key technology decisions regarding
                                    programming languages, frameworks, tools, and deployment methods. • Oversee code
                                    quality, development processes, and mentor the development team.
                                </p>
                            </div>
                            <div>
                                <h1 className="font-semibold text-lg mb-1">Mô tả công việc</h1>
                                <p>
                                    As a Tech Lead at XNO, you will be responsible for leading and managing the
                                    engineering team to develop a modern stock trading platform using cutting-edge
                                    technologies such as AI, Machine Learning, and Big Data. This role requires a
                                    combination of strong technical skills and leadership abilities to build a scalable,
                                    secure, and high-performance system.
                                </p>
                                <p>
                                    1. Technical Leadership • Design the system architecture and technical solutions in
                                    alignment with XNO’s product strategy. • Make key technology decisions regarding
                                    programming languages, frameworks, tools, and deployment methods. • Oversee code
                                    quality, development processes, and mentor the development team.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div className="col-span-3 space-y-4 sticky top-20 self-start">
                    <Card>
                        <CardContent className="py-4 space-y-3">
                            <div className="flex items-center gap-2">
                                <Image
                                    src="https://cdn-new.topcv.vn/unsafe/150x/https://static.topcv.vn/company_logos/IY6cZZgoPicaUFbVESOmtsPM58gnYddY_1667546652____20e2ee8f27e064dfaf8b40ace41350c9.png"
                                    alt="img"
                                    shape="square"
                                    className="w-12 h-12 border-2 border-gray-200"
                                />
                                <p className="font-semibold">CÔNG TY TNHH CÔNG NGHỆ ĐẦU TƯ VIỆT NAM</p>
                            </div>
                            <div className="space-y-1">
                                <div className="grid grid-cols-6">
                                    <div className="flex items-center gap-2 col-span-2">
                                        <Users className="w-4 h-4" />
                                        <p className="text-sm font-semibold text-gray-500">Quy mô:</p>
                                    </div>
                                    <p className="col-span-4">25-99 nhân viên</p>
                                </div>
                                <div className="grid grid-cols-6">
                                    <div className="flex items-center gap-2 col-span-2">
                                        <Package className="w-4 h-4" />
                                        <p className="text-sm font-semibold text-gray-500">Lĩnh vực:</p>
                                    </div>
                                    <p className="col-span-4">IT - Phần mềm</p>
                                </div>
                                <div className="grid grid-cols-6">
                                    <div className="flex items-center gap-2 col-span-2">
                                        <MapPinIcon className="w-4 h-4" />
                                        <p className="text-sm font-semibold text-gray-500">Địa điểm:</p>
                                    </div>
                                    <p className="col-span-4 truncate">
                                        8 đường D21, Phường Phước Long B, Thành phố Thủ Đức, Thành phố Hồ Chí Minh, Việt
                                    </p>
                                </div>
                            </div>
                            <h2 className="uppercase cursor-pointer font-semibold text-center text-app-primary hover:text-app-primary-bold transition hover:underline">
                                Xem trang công ty
                            </h2>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="py-4 space-y-4">
                            <h1 className="text-xl font-semibold">Thông tin chung</h1>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <BriefcaseBusiness className="w-8 h-8 text-app-primary-bold" />
                                    <div>
                                        <p className="text-sm text-gray-600">Cấp bậc</p>
                                        <p className="text-base font-semibold">Quản lý / Giám sát</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <MapPinIcon className="w-8 h-8 text-app-primary-bold" />
                                    <div>
                                        <p className="text-sm text-gray-600">Học vấn</p>
                                        <p className="text-base font-semibold">Đại Học trở lên</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Users className="w-8 h-8 text-app-primary-bold" />
                                    <div>
                                        <p className="text-sm text-gray-600">Số lượng tuyển</p>
                                        <p className="text-base font-semibold">1 người</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <AlarmClock className="w-8 h-8 text-app-primary-bold" />
                                    <div>
                                        <p className="text-sm text-gray-600">Hình thức làm việc</p>
                                        <p className="text-base font-semibold">Toàn thời gian</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <User className="w-8 h-8 text-app-primary-bold" />
                                    <div>
                                        <p className="text-sm text-gray-600">Giới tính</p>
                                        <p className="text-base font-semibold">Nam</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default JobDetailPage;
