import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async () => {
  // Provide a static locale for now to prevent crashes
  const locale = 'en-IN';
  
  return {
    locale,
    messages: {}
  };
});
