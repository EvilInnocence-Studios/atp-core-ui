import { useSetting } from "@common/lib/setting/services";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import request from 'superagent';

const usePageTracking = () => {
  const location = useLocation();
  const debug = useSetting("analyticsDebug");
  const trackingUrl = useSetting("trackingUrl");

  useEffect(() => {
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
    
    if(debug) {
      console.log(`Page view: ${location.pathname + location.search}`);
      console.log(`Custom Tracking: ${info.url}`); return;
    } else {
        request.post(trackingUrl)
            .send(info)
            .then(() => {});
    }
  }, [location]);
};

export default usePageTracking;
