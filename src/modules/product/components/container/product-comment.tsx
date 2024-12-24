import { Button } from '@/components/ui/button';
import { Fragment } from 'react/jsx-runtime';
import CommentCard from '../card/comment.card';
import { useEffect, useState } from 'react';
import CommentService from '../../services/comment.service';
import CommentSkeleton from '../skeleton/comment.skeleton';
import EmptyComment from '@/assets/images/empty-comment.png';
import useSheetContext from '@/hooks/useSheet';
import { SheetType } from '@/enums/sheet.enum';

interface ProductCommentProps {
    id: string;
}

function ProductComment({ id }: ProductCommentProps) {
    const { openSheet } = useSheetContext();
    const [comments, setComments] = useState<ProductComment[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const res = await CommentService.getRecent(id, 3);
            setTimeout(() => {
                setComments(res);
                setLoading(false);
            }, 1200);
        };

        fetchData();
    }, [id]);

    const renderComments = (data: ProductComment[]) => {
        return (
            <Fragment>
                {data.map((item, index) => (
                    <CommentCard
                        url={item.user.avatar}
                        content={item.content}
                        date="20-12-2024 15:20"
                        name={item.user.fullname}
                        key={index}
                    />
                ))}
                <Button
                    onClick={() => openSheet(SheetType.CommentSheet, id)}
                    className="w-full h-14 text-base tracking-wider mt-4 font-bold bg-white text-black hover:bg-black hover:text-white border-2 border-gray-400 hover:border-black"
                >
                    VIEW ALL COMMENTS
                </Button>
            </Fragment>
        );
    };

    const renderLoading = () => {
        return (
            <Fragment>
                {Array(3)
                    .fill(null)
                    .map((_, index) => (
                        <CommentSkeleton key={index} />
                    ))}
            </Fragment>
        );
    };

    return (
        <Fragment>
            <div className="pl-10">
                <h2 className="tracking-wider text-base font-bold mb-4">MOST RECENT COMMENT</h2>
                {!loading && comments.length > 0 && renderComments(comments)}
                {loading && renderLoading()}
                {!loading && comments.length === 0 && (
                    <div>
                        <img src={EmptyComment} />
                        <Button
                            onClick={() => openSheet(SheetType.CommentSheet, id)}
                            className="w-full h-14 text-base tracking-wider mt-4 font-bold bg-white text-black hover:bg-black hover:text-white border-2 border-gray-400 hover:border-black"
                        >
                            SHARE US YOUR THOUGHT
                        </Button>
                    </div>
                )}
            </div>
        </Fragment>
    );
}

export default ProductComment;
