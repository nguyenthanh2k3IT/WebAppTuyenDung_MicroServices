import { memo } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

interface PageLoadingProps {
    loading?: boolean;
}

function PageLoading({ loading = false }: PageLoadingProps) {
    if (loading === false) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <ClipLoader
                color="#FFFFFF"
                size={100}
                loading={true}
                cssOverride={{
                    borderWidth: '8px',
                }}
            />
        </div>
    );
}

export default memo(PageLoading);
