import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getClientSiteOrigin, getSeoForPath } from '../seo/seo';

const MANAGED_ATTRIBUTE = 'data-wild-wings-seo';

const appendElement = (tagName, attributes, textContent) => {
  const element = document.createElement(tagName);
  element.setAttribute(MANAGED_ATTRIBUTE, '');
  Object.entries(attributes).forEach(([name, value]) => element.setAttribute(name, value));
  if (textContent) element.textContent = textContent;
  document.head.append(element);
};

export default function SeoHead() {
  const location = useLocation();

  useEffect(() => {
    const seo = getSeoForPath(location.pathname, {
      siteOrigin: getClientSiteOrigin(),
      blogConfigured: Boolean(import.meta.env.VITE_ZENBLOG_BLOG_ID),
    });

    document.head.querySelectorAll(`[${MANAGED_ATTRIBUTE}]`).forEach((element) => element.remove());
    appendElement('title', {}, seo.title);
    appendElement('meta', { name: 'description', content: seo.description });
    appendElement('meta', { name: 'robots', content: seo.robots });
    appendElement('link', { rel: 'canonical', href: seo.canonical });
    appendElement('meta', { property: 'og:site_name', content: 'Wild Wings Travel & Tours' });
    appendElement('meta', { property: 'og:type', content: seo.type });
    appendElement('meta', { property: 'og:title', content: seo.title });
    appendElement('meta', { property: 'og:description', content: seo.description });
    appendElement('meta', { property: 'og:url', content: seo.canonical });
    appendElement('meta', { property: 'og:image', content: seo.image });
    appendElement('meta', { name: 'twitter:card', content: 'summary_large_image' });
    appendElement('meta', { name: 'twitter:title', content: seo.title });
    appendElement('meta', { name: 'twitter:description', content: seo.description });
    appendElement('meta', { name: 'twitter:image', content: seo.image });
    seo.schema.forEach((schema) => {
      appendElement('script', { type: 'application/ld+json' }, JSON.stringify(schema));
    });
  }, [location.pathname]);

  return null;
}

