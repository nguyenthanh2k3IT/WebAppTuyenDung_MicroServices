import { Card, CardContent } from '@/components/ui/card';
import Image from '@/components/image';
import { Separator } from '@/components/ui/separator';
import AppButton from '@/components/button/app.button';
import { BriefcaseBusiness, CircleDollarSign, Clock, MapPin } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

function JobInfo() {
    return (
        <Card className="hidden xl:block py-4 bg-white shadow-md rounded-lg col-span-6 sticky top-20 self-start ">
            <CardContent className="h-[calc(100vh-8rem)] flex flex-col !py-0">
                <div>
                    <div className="flex gap-4">
                        <Image
                            src="https://cdn-new.topcv.vn/unsafe/150x/https://static.topcv.vn/company_logos/IY6cZZgoPicaUFbVESOmtsPM58gnYddY_1667546652____20e2ee8f27e064dfaf8b40ace41350c9.png"
                            alt="img"
                            shape="square"
                            className="w-24 h-24 border-2 border-gray-200"
                        />
                        <div className="flex flex-col justify-between pb-1">
                            <h1 className="font-semibold tracking-wider text-lg">
                                [HAN] C#/.Net Technical Leader | Upto 2000
                            </h1>
                            <h2 className="text-base">Hybrid Technologies</h2>
                            <div className="flex items-center gap-1">
                                <CircleDollarSign className="w-5 h-5" />
                                <p className="font-semibold opacity-85 underline cursor-pointer">
                                    Sign in to view salary
                                </p>
                            </div>
                        </div>
                    </div>
                    <AppButton className="tracking-wider mt-4 w-full">Ứng tuyển ngay</AppButton>
                    <Separator className="w-full h-[1.5px] my-4" />
                </div>
                <ScrollArea className="w-full flex-1">
                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <MapPin />
                            <p>Center Point, Tower C, 219 Trung Kinh, Yen Hoa , Cau Giay, Ha Noi</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <BriefcaseBusiness />
                            <p>Full-time</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Clock />
                            <p>11 hours ago</p>
                        </div>
                    </div>
                    <Separator className="w-full h-[1.5px] my-4" />
                </ScrollArea>
            </CardContent>
        </Card>
    );
}

export default JobInfo;
