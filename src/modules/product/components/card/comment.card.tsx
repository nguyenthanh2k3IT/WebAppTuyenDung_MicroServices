import Image from '@/components/image';

interface CommentCardProps {
    url: string;
    name: string;
    date: string;
    content: string;
}

function CommentCard({ url, name, date, content }: CommentCardProps) {
    return (
        <div className="mb-4">
            <div className="flex space-x-2 items-center">
                <Image src={url} alt="avatar" shape="circle" className="w-10 h-10" />
                <div className="flex flex-col">
                    <span className="font-bold">{name}</span>
                    <span className="text-xs opacity-80">{date}</span>
                </div>
            </div>
            <p>{content}</p>
        </div>
    );
}

export default CommentCard;
