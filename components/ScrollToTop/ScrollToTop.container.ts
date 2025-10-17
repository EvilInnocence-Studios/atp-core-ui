import { createInjector, inject, mergeProps } from "unstateless";
import {ScrollToTopComponent} from "./ScrollToTop.component";
import {IScrollToTopInputProps, ScrollToTopProps, IScrollToTopProps} from "./ScrollToTop.d";
import { useLocation, useNavigationType } from "react-router";
import { useEffect, useState } from "react";

const injectScrollToTopProps = createInjector(({}:IScrollToTopInputProps):IScrollToTopProps => {
    const location = useLocation();
    const navigationType = useNavigationType();
    const [scroll, setScroll] = useState(0);
  
    useEffect(() => {
      if (navigationType === "POP") {
        console.log("POP navigation detected");
        // Restore scroll position if available
        const savedY = sessionStorage.getItem(location.key);
        console.log("Restoring scroll position:", savedY);
        if (savedY !== null) {
            console.log("Scrolling to Y:", Number(savedY));
          window.scrollTo(0, Number(savedY));
          setScroll(Number(savedY));
          return;
        }
      }
  
      // Default behavior: scroll to top on new navigation
      console.log("New navigation detected, scrolling to top");
      window.scrollTo(0, 0);
    }, [location, navigationType]);
  
    // Save scroll position before leaving the page
    useEffect(() => {
      const handleBeforeUnload = () => {
        console.log("Saving scroll position:", scroll);
        sessionStorage.setItem(location.key, String(scroll));
      };
      const logScrollPosition = () => {
        console.log("Current scroll position:", window.scrollY);
        setScroll(window.scrollY);
      }
      window.addEventListener("beforeunload", handleBeforeUnload);
      window.addEventListener("scroll", logScrollPosition);
      return () => {
        console.log("Component unmounting, saving scroll position:", window.scrollY);
        sessionStorage.setItem(location.key, String(window.scrollY));
        window.removeEventListener("beforeunload", handleBeforeUnload);
        window.removeEventListener("scroll", logScrollPosition);
      };
    }, [location]);

    const toTop = () => {
        if (location.hash) return;
        console.log("Scroll to top triggered");
        window.scrollTo({top: 0, behavior: 'smooth'});
    }
    
    // useEffect(toTop, [location.pathname, location.search]);
    
    return {toTop};
});

const connect = inject<IScrollToTopInputProps, ScrollToTopProps>(mergeProps(
    injectScrollToTopProps,
));

export const ScrollToTop = connect(ScrollToTopComponent);
