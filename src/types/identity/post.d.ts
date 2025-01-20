import { Category } from './category';
import { Status } from './status-post';
import { TagName } from './tagname';

type Post = {
    id: string;
    slug: string;
    title: string;
    content: string;
    image: string;
    category: Category;
    status: Status;
    tagNames: TagName[];
    createdDate: string;
}