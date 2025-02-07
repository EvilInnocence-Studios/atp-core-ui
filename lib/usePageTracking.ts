import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ga from 'react-ga4';
import { config } from "@config";

ga.initialize(
    config().analytics.google,
    {
        gtagOptions: {
            send_page_view: false,
        },
    }
);

const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    console.log(`Page view: ${location.pathname + location.search}`);
    ga.send({ hitType: 'pageview', page: location.pathname + location.search });

    // TODO: Also add custom analytics tracking here
  }, [location]);
};

export default usePageTracking;