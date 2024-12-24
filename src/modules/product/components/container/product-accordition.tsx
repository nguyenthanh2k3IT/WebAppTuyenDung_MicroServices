import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface ProductAccorditionProps {
    description?: string;
    sizeAndFit?: string | null;
}

function ProductAccordition({ description = '', sizeAndFit = '' }: ProductAccorditionProps) {
    return (
        <Accordion type="multiple" className="w-full">
            <AccordionItem value="item-1">
                <AccordionTrigger>Product Details</AccordionTrigger>
                <AccordionContent>
                    <div dangerouslySetInnerHTML={{ __html: description }} />
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
                <AccordionTrigger>Size And Fits</AccordionTrigger>
                <AccordionContent>
                    <div dangerouslySetInnerHTML={{ __html: sizeAndFit || '' }} />
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
                <AccordionTrigger>About Brand</AccordionTrigger>
                <AccordionContent>
                    <div className="font-sans text-gray-800 m-5">
                        <h2 className="text-2xl font-semibold text-blue-900">About ASOS</h2>

                        <p className="text-base mt-4">
                            ASOS is one of the world's leading online retailers, known for offering a wide range of
                            fashion and beauty products. Founded in 2000 in the UK, ASOS (an acronym for 'As Seen On
                            Screen') initially focused on selling fashion items inspired by what celebrities were
                            wearing on-screen. Over the years, ASOS has evolved into a global brand offering over
                            100,000 products from various famous brands and its own exclusive lines.
                        </p>

                        <h3 className="text-xl font-semibold text-blue-600 mt-8">Key Features of ASOS:</h3>
                        <ul className="list-disc list-inside text-base mt-2 space-y-2">
                            <li>
                                Wide range of fashion items for both men and women, including clothing, shoes,
                                accessories, and beauty products.
                            </li>
                            <li>
                                Global shipping to over 200 countries, making it accessible to customers around the
                                world.
                            </li>
                            <li>
                                Exclusive ASOS brands such as ASOS Design, ASOS Curve, ASOS Petite, and ASOS Maternity.
                            </li>
                            <li>Easy-to-use website and mobile app, offering a seamless shopping experience.</li>
                            <li>
                                Commitment to sustainability through the use of recycled materials and reducing carbon
                                emissions.
                            </li>
                        </ul>

                        <h3 className="text-xl font-semibold text-blue-600 mt-8">ASOS's Exclusive Brands</h3>
                        <p className="text-base mt-2">
                            ASOS not only offers products from top brands but also develops its own exclusive
                            collections. These include:
                        </p>
                        <ul className="list-disc list-inside text-base mt-2 space-y-2">
                            <li>
                                <strong>ASOS Design:</strong> A trendy and diverse range of fashion items for all
                                occasions.
                            </li>
                            <li>
                                <strong>ASOS Curve:</strong> A fashionable collection designed specifically for curvier
                                women.
                            </li>
                            <li>
                                <strong>ASOS Petite:</strong> Clothing made for shorter frames, designed to flatter
                                every body type.
                            </li>
                            <li>
                                <strong>ASOS Maternity:</strong> Stylish maternity wear for expecting mothers.
                            </li>
                        </ul>

                        <p className="text-base mt-4">
                            With a focus on providing high-quality products and a convenient online shopping experience,
                            ASOS has become one of the go-to destinations for fashion lovers around the world.
                        </p>
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}

export default ProductAccordition;
