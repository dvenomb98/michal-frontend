import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import FullPageLoader from './FullPageLoader';

const NextRouterLoader: React.FC = () => {
  const { events } = useRouter();
  const [pageLoading, setPageLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => setPageLoading(true);
    const handleComplete = () => setPageLoading(false);

    events.on('routeChangeStart', handleStart);
    events.on('routeChangeComplete', handleComplete);
    events.on('routeChangeError', handleComplete);

    return () => {
      events.off('routeChangeStart', handleStart);
      events.off('routeChangeComplete', handleComplete);
      events.off('routeChangeError', handleComplete);
    };
  }, []);

  return pageLoading ? <FullPageLoader /> : null;
};

export default NextRouterLoader;
