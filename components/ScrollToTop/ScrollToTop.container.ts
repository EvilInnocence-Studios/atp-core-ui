import { overridable } from "@core/lib/overridable";
import { useEffect, useState } from "react";
import { useLocation, useNavigationType } from "react-router";
import { createInjector, inject, mergeProps } from "unstateless";
import { ScrollToTopComponent } from "./ScrollToTop.component";
import { IScrollToTopInputProps, IScrollToTopProps, ScrollToTopProps } from "./ScrollToTop.d";

const injectScrollToTopProps = createInjector(({}:IScrollToTopInputProps):IScrollToTopProps => {
    const location = useLocation();
    const navigationType = useNavigationType();
    const [scroll, setScroll] = useState(0);
  
    useEffect(() => {
      if (navigationType === "POP") {
        // Restore scroll position if available
        const savedY = sessionStorage.getItem(location.key);
        if (savedY !== null) {
          window.scrollTo(0, Number(savedY));
          setScroll(Number(savedY));
          return;
        }
      }
  
      // Default behavior: scroll to top on new navigation
      window.scrollTo(0, 0);
    }, [location, navigationType]);
  
    // Save scroll position before leaving the page
    useEffect(() => {
      const handleBeforeUnload = () => {
        sessionStorage.setItem(location.key, String(scroll));
      };
      const logScrollPosition = () => {
        setScroll(window.scrollY);
      }
      window.addEventListener("beforeunload", handleBeforeUnload);
      window.addEventListener("scroll", logScrollPosition);
      return () => {
        sessionStorage.setItem(location.key, String(window.scrollY));
        window.removeEventListener("beforeunload", handleBeforeUnload);
        window.removeEventListener("scroll", logScrollPosition);
      };
    }, [location]);

    const toTop = () => {
        if (location.hash) return;
        window.scrollTo({top: 0, behavior: 'smooth'});
    }
    
    // useEffect(toTop, [location.pathname, location.search]);
    
    return {toTop};
});

const connect = inject<IScrollToTopInputProps, ScrollToTopProps>(mergeProps(
    injectScrollToTopProps,
));

export const ScrollToTop = overridable<IScrollToTopInputProps>(connect(ScrollToTopComponent));
