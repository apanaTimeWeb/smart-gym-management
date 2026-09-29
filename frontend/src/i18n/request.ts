import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async () => {
  // Provide a static locale for now to prevent crashes
  const locale = 'en-IN';
  
  let messages = {};
  try {
    messages = (await import(`@/app/frontend_public/landing/_locales/en.json`)).default;
  } catch (error) {
    console.error('Failed to load messages:', error);
  }

  return {
    locale,
    messages
  };
});
