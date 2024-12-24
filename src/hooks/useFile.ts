import { useState } from 'react';
import { Accept, DropzoneOptions } from 'react-dropzone';

function useFile({
    accept,
    multiple = false,
    max = 4,
    size = 10,
}: {
    accept: Accept;
    multiple?: boolean;
    max?: number;
    size?: number;
}) {
    const [files, setFiles] = useState<File[] | null>([]);

    const onChangeFile = (input: File[]) => {
        setFiles(input);
    };

    const dropzone: DropzoneOptions = {
        accept,
        multiple,
        maxFiles: max,
        maxSize: size * 1024 * 1024,
    };

    return { files, onChangeFile, dropzone };
}

export default useFile;

// Dùng cùng component Image
// const { files, onChangeFile, dropzone } = useFile({
//     accept: {
//         ...FileAccept.image,
//         ...FileAccept.pdf,
//     },
//     multiple: true,
//     max: 100,
// });

// return (
//     <div className="w-32">
//         <Upload dropzone={dropzone} onChangeFile={onChangeFile} />
//     </div>
// );
