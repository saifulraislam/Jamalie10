import { useEffect } from 'react';

interface MetaData {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
}

export const usePageMeta = (meta: MetaData) => {
  useEffect(() => {
    // Update title
    document.title = `${meta.title} | Jamaliè`;

    // Update description meta tag
    const descriptionTag = document.querySelector('meta[name="description"]');
    if (descriptionTag) {
      descriptionTag.setAttribute('content', meta.description);
    }

    // Update keywords meta tag
    if (meta.keywords) {
      const keywordsTag = document.querySelector('meta[name="keywords"]');
      if (keywordsTag) {
        keywordsTag.setAttribute('content', meta.keywords);
      }
    }

    // Update OG tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', `${meta.title} | Jamaliè`);
    }

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', meta.description);
    }

    if (meta.ogImage) {
      const ogImage = document.querySelector('meta[property="og:image"]');
      if (ogImage) {
        ogImage.setAttribute('content', meta.ogImage);
      }
    }

    // Scroll to top
    window.scrollTo(0, 0);
  }, [meta.title, meta.description, meta.keywords, meta.ogImage]);
};
