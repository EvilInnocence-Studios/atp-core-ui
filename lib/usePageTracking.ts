import { config } from "@config";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import request from 'superagent';

const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    console.log(`Page view: ${location.pathname + location.search}`);
    const navigator = window.navigator;
    const screen = window.screen;
    
    const info = {
        host: window.location.host,
        url: location.pathname + location.search,
        referrer: document.referrer,
    
        browserName: navigator.appName,
        browserEngine: navigator.product,
        browserVersionA:navigator.appVersion,
        browserVersionB: navigator.userAgent,
        browserLanguage: navigator.language,
        browserPlatform: navigator.platform,
    
        screenWidth: screen.width,
        screenHeight: screen.height,
        screenColorDepth: screen.colorDepth,
        screenPixelDepth: screen.pixelDepth,
    };
    
    if(config().analytics.debug) {
        console.log(`Custom Track: ${info.url}`); return;
    } else {
        request.post(config().analytics.track)
            .send(info)
            .then(() => {});
    }
  }, [location]);
};

export default usePageTracking;