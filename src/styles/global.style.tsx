import React, { ReactNode, Fragment } from 'react';
import './index.css';
import './animation.style.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

type GlobalStylesProps = {
    children: ReactNode;
};
const GlobalStyles: React.FC<GlobalStylesProps> = ({ children }) => {
    return <Fragment>{children}</Fragment>;
};
export default GlobalStyles;
