import { ReactElement } from 'react';

type WrapperRouteComponent = {
    titleId: string;
    children: ReactElement;
};
export default function WrapperRouteComponent({ titleId, children }: WrapperRouteComponent) {
    if (titleId) {
        document.title = titleId;
    }

    return children;
}
