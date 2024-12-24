import SheetContainer from '@/components/container/sheet.container';
import { SheetType } from '@/enums/sheet.enum';
import useSheetContext from '@/hooks/useSheet';
import { memo, useEffect, useState } from 'react';
import CommentService from '../../services/comment.service';
import CommentCard from '../card/comment.card';
import CommentSkeleton from '../skeleton/comment.skeleton';
import EmptyComment from '@/assets/images/empty-comment.png';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';
import useProfile from '@/hooks/useProfile';
import { Link } from 'react-router-dom';

function CommentSheet() {
    const { profile } = useProfile();
    const [input, setInput] = useState<string>('');
    const [data, setData] = useState<ProductComment[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const { sheets, closeSheet } = useSheetContext();
    const state = sheets[SheetType.CommentSheet];

    useEffect(() => {
        const fetchData = async (id: string) => {
            setLoading(true);
            const res = await CommentService.getAll(id);
            setTimeout(() => {
                setData(res);
                setLoading(false);
            }, 1200);
        };

        if (state.data) {
            fetchData(state.data);
        }
    }, [state]);

    const handleCreateComment = async () => {
        try {
            if (!state || !state.data || !profile || input === '') {
                return;
            }
            const res = await CommentService.create(state.data, profile?.id, input);
            if (res) {
                setData((prevData) => [res, ...prevData]);
            }
        } catch (ex) {
            console.log(ex);
        }
    };

    return (
        <SheetContainer
            title="REVIEWS"
            description="Share us your though here"
            open={state.visible}
            onClose={() => closeSheet(SheetType.CommentSheet)}
            className="px-0 py-0"
            headerStyle="bg-[#f8f8f8] px-4 py-5 border-b-2 border-gray-300"
            side="right"
        >
            <div className="grid grid-rows-14 h-full">
                <div className="row-span-11 pl-4 py-2">
                    <div className="overflow-y-scroll h-full">
                        {data.map((item, index) => (
                            <CommentCard
                                url={item.user.avatar}
                                content={item.content}
                                date="20-12-2024 15:20"
                                name={item.user.fullname}
                                key={index}
                            />
                        ))}
                        {loading &&
                            Array(6)
                                .fill(null)
                                .map((_, index) => <CommentSkeleton key={index} />)}
                        {!loading && data.length === 0 && <img src={EmptyComment} />}
                    </div>
                </div>

                {profile && (
                    <div className="row-span-3 h-full w-full bg-gray-100 grid grid-cols-12 pt-1 border-t-2 border-gray-300">
                        <Input
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleCreateComment();
                                }
                            }}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="col-span-11 text-lg border-none focus:outline-none focus:ring-0 focus-visible:ring-0"
                            placeholder="Type your comment..."
                        />
                        <Send
                            onClick={handleCreateComment}
                            className="cursor-pointer mt-1 col-span-1 hover:opacity-80"
                        />
                    </div>
                )}
                {!profile && (
                    <div className="row-span-2 h-full w-full bg-gray-100 border-t-2 border-gray-300 px-4 pt-2 text-xl tracking-wider">
                        <Link to={'/auth/login'} className="mr-2 font-bold underline cursor-pointer hover:opacity-80">
                            Login
                        </Link>
                        <span>to share us your thought</span>
                    </div>
                )}
            </div>
        </SheetContainer>
    );
}

export default memo(CommentSheet);
