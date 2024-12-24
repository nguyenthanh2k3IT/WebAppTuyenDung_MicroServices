import React from 'react';
import { SlashIcon } from '@radix-ui/react-icons';
import {
    Breadcrumb as Container,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { useRootSelector } from '@/hooks/useRootSelector';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

type BreadcrumbProps = {
    values?: BreadcrumbItem[];
    className?: string;
    container?: string;
};

export function Breadcrumb({ values, className, container }: BreadcrumbProps) {
    const data = values ? values : useRootSelector((state) => state.breadcrumb.items);

    return (
        <Container className={cn(container)}>
            <BreadcrumbList className="!gap-0">
                {data.map((item, index) => (
                    <React.Fragment key={item.link}>
                        {index > 0 && (
                            <BreadcrumbSeparator>
                                <SlashIcon />
                            </BreadcrumbSeparator>
                        )}
                        <BreadcrumbItem>
                            {index === data.length - 1 ? (
                                <BreadcrumbPage className={cn('font-semibold', className)}>{item.title}</BreadcrumbPage>
                            ) : (
                                <Link
                                    className={cn('hover:text-black font-semibold transition', className)}
                                    to={item.link}
                                >
                                    {item.title}
                                </Link>
                            )}
                        </BreadcrumbItem>
                    </React.Fragment>
                ))}
            </BreadcrumbList>
        </Container>
    );
}
