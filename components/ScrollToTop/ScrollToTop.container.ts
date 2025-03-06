import { createInjector, inject, mergeProps } from "unstateless";
import {ScrollToTopComponent} from "./ScrollToTop.component";
import {IScrollToTopInputProps, ScrollToTopProps, IScrollToTopProps} from "./ScrollToTop.d";
import { useLocation } from "react-router";
import { useEffect } from "react";

const injectScrollToTopProps = createInjector(({}:IScrollToTopInputProps):IScrollToTopProps => {
    const location = useLocation();

    const toTop = () => {
        if (location.hash) return;
        window.scrollTo({top: 0, behavior: 'smooth'});
    }
    
    useEffect(toTop, [location.pathname, location.search]);
    
    return {toTop};
});

const connect = inject<IScrollToTopInputProps, ScrollToTopProps>(mergeProps(
    injectScrollToTopProps,
));

export const ScrollToTop = connect(ScrollToTopComponent);
