import { Card } from '@/components/ui/card';
import LoadingButton from '@/components/ui/loading-button';
import useObjectState from '@/hooks/useObjectState';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import ImageUpload from '@/components/upload/image-upload';
import EditProductBreadcrumb from './components/product-edit.breadcrumb';
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
import { useNavigate, useParams } from 'react-router-dom';
import { AdminNavigate } from '../../navigate';
import Popover from '@/components/popover';
import Empty from '@/assets/images/empty.jpg';
import GeneratorHelper from '@/helpers/generator.helper';
import ErrorMessage from '@/helpers/error-message.helper';

const initialValue: Product = {
    id: '',
    slug: '',
    name: '',
    description: '',
    sizeAndFit: '',
    image: '',
    originalPrice: 0,
    salePrice: 0,
    isSale: false,
    averageRating: 0,
    bought: 0,
    category: null,
    brand: null,
    gender: null,
    categoryId: null,
    brandId: null,
    genderId: null,
};

function ProductEditPage() {
    const { id } = useParams();
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
    const [product, setKeyValue, setProduct, handleObjectChange] = useObjectState<Product>(initialValue);

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await callApi(
                APIEndpoint.productDetail(id!),
                {
                    method: 'GET',
                },
                '',
                false,
            );
            if (data) {
                let tmp: Product = data;
                setProduct(tmp);
            }
        };

        if (id && product.id === '') fetchData();
    }, [id]);

    useEffect(() => {
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
                let tmp: Gender[] = data;
                const transfer = transformSelect(tmp, 'id', 'name');
                setGender(transfer);
            }
        };

        const fetchData = async () => {
            await Promise.all([getBrandData(), getGenderData()]);
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

    const popoverComponent = () => {
        return (
            <div>
                <img src={product.image || Empty} alt="productimg" />
            </div>
        );
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
        if (!ValidatorHelper.isValidSlug(product.slug)) {
            const slug = GeneratorHelper.getSlug(product.slug);
            toast({
                title: 'Slug is invalid',
                description: `${ErrorMessage.invalidSlug} For example: ${slug}`,
                variant: 'destructive',
            });
            return;
        }
        const payload: Product = product;
        if (file != null && !image) {
            setLoading(true);
            const url = await uploadImage(file);
            if (url) setImage(url);
            payload.image = url ? url : payload.image;
        }
        const result = await callApi(
            APIEndpoint.productRoot,
            {
                method: 'PUT',
                body: payload,
            },
            'Product updated successfully',
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
                <EditProductBreadcrumb name={product.name} />
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
                                defaultValue={product.brand?.id}
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
                                defaultValue={product.categoryId || product.category?.id}
                                onChange={handleChangeCategory}
                                options={category}
                            />
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <div className="flex justify-between">
                            <Label htmlFor="description">Image</Label>
                            <Popover content={popoverComponent()} type="click" className="w-[40rem]">
                                <span className="ml-1 opacity-70 cursor-pointer hover:opacity-100 transition">
                                    Click to view the image
                                </span>
                            </Popover>
                        </div>

                        <ImageUpload size="full" maxFiles={1} onChangeFiles={(files) => handleChanngeFile(files)} />
                    </div>

                    <LoadingButton
                        className="mt-2"
                        onClick={handleAddProduct}
                        isLoading={loading}
                        loadingText="Updating product ..."
                    >
                        Save changes
                    </LoadingButton>
                </div>
            </Card>
        </div>
    );
}

export default ProductEditPage;
