import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import App from './App';
import { getPrerenderRoutes, getSeoForPath, getSitemapRoutes } from './seo/seo';

export const renderPage = (pathname, options = {}) => ({
  appHtml: renderToString(
    <StaticRouter location={pathname}>
      <App />
    </StaticRouter>,
  ),
  seo: getSeoForPath(pathname, options),
});

export { getPrerenderRoutes, getSeoForPath, getSitemapRoutes };

