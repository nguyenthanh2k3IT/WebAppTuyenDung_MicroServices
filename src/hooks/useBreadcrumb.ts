import { buildNavigationArray } from '@/helpers/object.helper';
import { setBreadcrumbItemsAction } from '@/redux/slicers/breadcrumb.slice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

function useBreadcrumb(navigate: NavigateType, key: BreadcrumbItem) {
    const dispatch = useDispatch();

    useEffect(() => {
        const arr = buildNavigationArray(navigate, key);
        dispatch(setBreadcrumbItemsAction(arr));
    }, []);
}

export default useBreadcrumb;
