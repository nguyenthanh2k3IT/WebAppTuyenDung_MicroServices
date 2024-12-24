import React, { memo, useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { Trash2 } from 'lucide-react';
import { useToast } from '../ui/use-toast';

type ImageUploadProps = {
    maxFiles?: number;
    onChangeFiles?: (files: File[]) => void;
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
};

function ImageUpload({ size = 'full', maxFiles = 1, onChangeFiles }: ImageUploadProps) {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [files, setFiles] = useState<File[]>([]);
    const { toast } = useToast();

    useEffect(() => {
        if (onChangeFiles) onChangeFiles(files);
    }, [files, onChangeFiles]);

    const getWidth = useCallback((size: string) => {
        switch (size) {
            case 'sm':
                return '8rem';
            case 'md':
                return '16rem';
            case 'lg':
                return '32rem';
            case 'xl':
                return '64rem';
            default:
                return '100%';
        }
    }, []);

    const getDisplay = useCallback((size: string) => {
        return size === 'sm' || size === 'md' ? 'flex' : 'block';
    }, []);

    const handleFileChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const newFiles = Array.from(event.target.files || []);
            const invalidFiles = newFiles.filter((file) => !file.type.startsWith('image/'));

            if (invalidFiles.length > 0) {
                toast({
                    variant: 'destructive',
                    title: 'Invalid File',
                    description: 'Only image files are allowed.',
                    duration: 2000,
                });
                return;
            }

            if (newFiles.length + files.length > maxFiles) {
                toast({
                    variant: 'destructive',
                    title: 'Failed',
                    description: `You only can upload ${maxFiles} files.`,
                    duration: 2000,
                });
                return;
            }

            setFiles((prevFiles) => [...prevFiles, ...newFiles]);
        },
        [files, maxFiles, toast],
    );

    const handleRemoveFile = useCallback(
        (index: number) => {
            setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
            const newFiles = [...files];
            newFiles.splice(index, 1);
            setFiles(newFiles);

            const dataTransfer = new DataTransfer();
            newFiles.forEach((file) => {
                dataTransfer.items.add(file);
            });
            if (fileInputRef.current) {
                fileInputRef.current.files = dataTransfer.files;
            }
        },
        [files],
    );

    const renderPreview = useCallback(
        (file: File, index: number) => {
            const url = URL.createObjectURL(file);
            return (
                <div key={file.name} className="relative group flex items-center justify-center w-32 h-36">
                    <img
                        src={url}
                        alt="Preview"
                        className="h-full w-full object-cover rounded-md border border-gray-300 transition-transform duration-200 transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black rounded-md opacity-0 group-hover:opacity-50 transition-opacity duration-200" />
                    <button
                        onClick={() => handleRemoveFile(index)}
                        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    >
                        <Trash2 size={30} className="text-white" />
                    </button>
                </div>
            );
        },
        [handleRemoveFile],
    );

    const previewContainer = useMemo(() => {
        return (
            files.length > 0 && (
                <div
                    style={{
                        width: getWidth(size),
                        marginTop: '0px',
                    }}
                    className="flex items-center flex-wrap justify-center gap-2 h-44 overflow-y-auto border border-gray-300 p-2"
                >
                    {files.map((file, index) => renderPreview(file, index))}
                </div>
            )
        );
    }, [files, getWidth, renderPreview, size]);

    return (
        <div
            className="relative space-y-1"
            style={{
                display: getDisplay(size),
            }}
        >
            <label className="block">
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple={maxFiles > 1}
                    onChange={handleFileChange}
                    className="hidden"
                />
                <div
                    style={{
                        width: getWidth(size),
                    }}
                    className="h-44 text-center flex flex-col items-center justify-center border-2 border-dashed border-gray-300 p-4 w-full cursor-pointer rounded-md hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                >
                    <div className="text-blue-500 mb-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-10 w-10"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 16.5V21h18v-4.5M12 3v12m0 0l-3-3m3 3l3-3"
                            />
                        </svg>
                    </div>
                    <span className="text-lg font-semibold text-blue-500">Select</span>
                    <span className="text-sm text-gray-500">OR DROP FILES HERE</span>
                </div>
            </label>
            {previewContainer}
        </div>
    );
}

export default memo(ImageUpload);
