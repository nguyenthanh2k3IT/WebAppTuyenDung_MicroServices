import { Card } from '@/components/ui/card';
import LoadingButton from '@/components/ui/loading-button';
import useObjectState from '@/hooks/useObjectState';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import ImageUpload from '@/components/upload/image-upload';
import AddProductBreadcrumb from './components/product-add.breadcrumb';
import { useEffect, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import AppSwitch from '@/components/switch';
import APIEndpoint from '@/utils/api.endpoint';
import useCaller from '@/hooks/useCaller';
import useSelect from '@/hooks/useSelect';
import SingleSelect from '@/components/select';
import ValidatorHelper from '@/helpers/validator.helper';
import { useToast } from '@/components/ui/use-toast';
import { uploadImage } from '@/services/storage.service';
import { useNavigate } from 'react-router-dom';
import { AdminNavigate } from '../../navigate';
import GeneratorHelper from '@/helpers/generator.helper';
import ErrorMessage from '@/helpers/error-message.helper';

const initialValue: Product = {
    id: GeneratorHelper.newGuid(),
    slug: '',
    name: '',
    description: '',
    sizeAndFit: '',
    image: '',
    originalPrice: 0,
    salePrice: 0,
    isSale: false,
    categoryId: null,
    brandId: null,
    genderId: null,
    averageRating: 0,
    bought: 0,
    category: null,
    brand: null,
    gender: null,
};

function ProductAddPage() {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [image, setImage] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [category, setCategory] = useState<SelectOption[]>([]);
    const [brand, setBrand] = useState<SelectOption[]>([]);
    const [gender, setGender] = useState<SelectOption[]>([]);
    const { loading, setLoading, callApi } = useCaller<any>();
    const { transformSelect } = useSelect({
        initialValue: [],
    });
    const [product, setKeyValue, , handleObjectChange] = useObjectState<Product>(initialValue);

    useEffect(() => {
        const getGenderData = async () => {
            const { data } = await callApi(
                APIEndpoint.genderRoot,
                {
                    method: 'GET',
                },
                '',
                false,
            );
            if (data) {
                let tmp: Category[] = data;
                const transfer = transformSelect(tmp, 'id', 'name');
                setGender(transfer);
            }
        };

        const getBrandData = async () => {
            const { data } = await callApi(
                APIEndpoint.brandRoot,
                {
                    method: 'GET',
                },
                '',
                false,
            );
            if (data) {
                let tmp: Brand[] = data;
                const transfer = transformSelect(tmp, 'id', 'name');
                setBrand(transfer);
            }
        };

        const fetchData = async () => {
            await Promise.all([getGenderData(), getBrandData()]);
        };

        fetchData();
    }, []);

    useEffect(() => {
        const getCategoryData = async () => {
            const { data } = await callApi(
                APIEndpoint.categoryByGender(product.genderId!),
                {
                    method: 'GET',
                },
                '',
                false,
            );
            if (data) {
                let tmp: Category[] = data;
                const transfer = transformSelect(tmp, 'id', 'name');
                setCategory(transfer);
            }
        };

        if (product.genderId) {
            getCategoryData();
        }
    }, [product.genderId]);

    const handleChanngeFile = (files: File[]) => {
        if (files && files.length > 0) {
            setFile(files[0]);
            setImage(null);
        }
    };

    const handleChangeCkeditor = (key: string, value: string) => {
        setKeyValue(key as keyof Product, value);
    };

    const handleSwitchChange = (checked: boolean) => {
        setKeyValue('isSale', checked);
    };

    const handleChangeCategory = (option: SelectOption) => {
        setKeyValue('categoryId' as keyof Product, option.value);
    };

    const handleChangeBrand = (option: SelectOption) => {
        setKeyValue('brandId' as keyof Product, option.value);
    };

    const handleChangeGender = (option: SelectOption) => {
        setKeyValue('genderId' as keyof Product, option.value);
        // setKeyValue('categoryId' as keyof Product, null);
    };

    const handleAddProduct = async () => {
        const invalidField = ValidatorHelper.isNotNullOrUndefined(product, [
            'averageRating',
            'id',
            'image',
            'bought',
            'category',
            'brand',
            'gender',
        ]);
        if (invalidField) {
            toast({ title: 'Error', description: `${invalidField} is required`, variant: 'destructive' });
            return;
        }
        const payload: Product = product;
        if (file != null && !image) {
            setLoading(true);
            const url = await uploadImage(file);
            if (url) setImage(url);
            payload.image = url ? url : payload.image;
        }
        if (file == null) {
            toast({
                title: 'Error',
                description: `Image is required`,
                variant: 'destructive',
            });
            return;
        }
        if (!ValidatorHelper.isValidSlug(product.slug)) {
            const slug = GeneratorHelper.getSlug(product.slug);
            toast({
                title: 'Slug is invalid',
                description: `${ErrorMessage.invalidSlug} For example: ${slug}`,
                variant: 'destructive',
            });
            return;
        }
        const result = await callApi(
            APIEndpoint.productRoot,
            {
                method: 'POST',
                body: payload,
            },
            'Product created successfully',
        );
        if (result.succeeded) {
            setTimeout(() => {
                navigate(AdminNavigate.product.link);
            }, 1000);
        }
    };

    const handleBlurSlug = () => {
        if (product.slug !== '') {
            const slug: string = GeneratorHelper.getSlug(product.slug);
            setKeyValue('slug', slug);
        }
    };

    return (
        <div>
            <div className="pt-2 pb-4">
                <AddProductBreadcrumb />
            </div>
            <Card>
                <div className={'grid items-start gap-4 px-4 py-8'}>
                    <div className="grid gap-2 w-full">
                        <Label htmlFor="slug">Slug</Label>
                        <Input
                            onBlur={handleBlurSlug}
                            id="slug"
                            value={product.slug}
                            onChange={handleObjectChange}
                            placeholder="Enter slug"
                        />
                    </div>
                    <div className="grid gap-2 w-full">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" value={product.name} onChange={handleObjectChange} placeholder="Enter name" />
                    </div>

                    <div className="flex gap-3">
                        <div className="grid gap-1 w-full">
                            <Label htmlFor="originalPrice">Original price</Label>
                            <Input
                                type="number"
                                id="originalPrice"
                                value={product.originalPrice}
                                onChange={handleObjectChange}
                                placeholder="Enter original price"
                            />
                        </div>
                        <div className="grid gap-1 w-full">
                            <Label htmlFor="salePrice">Sale price</Label>
                            <Input
                                type="number"
                                id="salePrice"
                                value={product.salePrice}
                                onChange={handleObjectChange}
                                placeholder="Enter sale price"
                            />
                        </div>
                        <div className="grid gap-1 w-full">
                            <AppSwitch
                                label={'Is on sale'}
                                trueLabel={'Product on sale'}
                                falseLabel={'Product not on sale'}
                                checked={product.isSale}
                                onCheckedChange={handleSwitchChange}
                            />
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="description">Description</Label>
                        <CKEditor
                            editor={ClassicEditor}
                            id="description"
                            data={product.description}
                            onChange={(_, editor) => {
                                const data = editor.getData();
                                handleChangeCkeditor('description', data);
                            }}
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="sizeAndFit">Size and fit</Label>
                        <CKEditor
                            editor={ClassicEditor}
                            id="sizeAndFit"
                            data={product.sizeAndFit}
                            onChange={(_, editor) => {
                                const data = editor.getData();
                                handleChangeCkeditor('sizeAndFit', data);
                            }}
                        />
                    </div>

                    <div className="flex gap-3">
                        <div className="grid gap-1 w-full">
                            <Label htmlFor="salePrice">Brand</Label>
                            <SingleSelect
                                triggerStyle="w-full"
                                placeHolder={'Please choose brand ...'}
                                onChange={handleChangeBrand}
                                options={brand}
                            />
                        </div>
                        <div className="grid gap-1 w-full">
                            <Label htmlFor="salePrice">Gender</Label>
                            <SingleSelect
                                triggerStyle="w-full"
                                placeHolder={'Please choose gender ...'}
                                defaultValue={product.gender?.id}
                                onChange={handleChangeGender}
                                options={gender}
                            />
                        </div>
                        <div className="grid gap-1 w-full">
                            <Label htmlFor="originalPrice">Category</Label>
                            <SingleSelect
                                triggerStyle="w-full"
                                placeHolder={'Please choose category ...'}
                                onChange={handleChangeCategory}
                                options={category}
                            />
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="description">Image</Label>
                        <ImageUpload size="full" maxFiles={1} onChangeFiles={(files) => handleChanngeFile(files)} />
                    </div>

                    <LoadingButton
                        className="mt-2"
                        onClick={handleAddProduct}
                        isLoading={loading}
                        loadingText="Creating product ..."
                    >
                        Save changes
                    </LoadingButton>
                </div>
            </Card>
        </div>
    );
}

export default ProductAddPage;
