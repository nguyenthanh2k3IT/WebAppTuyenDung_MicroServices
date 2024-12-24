import { FileUploader, FileUploaderContent, FileUploaderItem, FileInput } from '@/components/extensions/file-uploader';

import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { DropzoneOptions } from 'react-dropzone';
import Popover from '../popover';
import { Label } from '../ui/label';

type UploadProps = {
    dropzone: DropzoneOptions;
    label?: string;
    variant?: Varinant;
    onChangeFile?: (files: File[]) => void;
};

function Upload({ dropzone, label = 'Nhấn để tải tệp', variant = 'outline', onChangeFile }: UploadProps) {
    const [files, setFiles] = useState<File[] | null>([]);

    useEffect(() => {
        if (files && onChangeFile) onChangeFile(files);
    }, [files]);

    const content = (name: string) => {
        return <Label>{name}</Label>;
    };

    return (
        <FileUploader value={files} onValueChange={setFiles} dropzoneOptions={dropzone} className="relative space-y-1">
            <FileInput className="border border-dashed border-gray-500">
                <Button variant={variant} className="w-full">
                    {label}
                </Button>
            </FileInput>
            <FileUploaderContent className="h-48">
                {files?.map((item, index) => {
                    return (
                        <FileUploaderItem key={item.name + index} index={index}>
                            <Popover content={content(item.name)} type="hover" className="w-full">
                                <div className="truncate max-w-[90%]">{item.name}</div>
                            </Popover>
                        </FileUploaderItem>
                    );
                })}
            </FileUploaderContent>
        </FileUploader>
    );
}

export default Upload;
