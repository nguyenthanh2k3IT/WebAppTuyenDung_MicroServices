import { shallowEqual, useSelector } from 'react-redux';
import { RootState } from '@/redux/root-reducers';

export function useRootSelector<TSelected = unknown>(mapper: (rootState: RootState) => TSelected) {
    return useSelector<RootState, TSelected>(mapper, shallowEqual);
}
