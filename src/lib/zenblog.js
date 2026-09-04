const API_ORIGIN = 'https://zenblog.com/api/public/blogs';
const DEFAULT_LIMIT = 12;

export const getZenblogBlogId = () => import.meta.env.VITE_ZENBLOG_BLOG_ID?.trim() || '';

const toArray = (value) => (Array.isArray(value) ? value : []);

export const stripHtml = (html = '') => html
  .replace(/<script[\s\S]*?<\/script>/gi, ' ')
  .replace(/<style[\s\S]*?<\/style>/gi, ' ')
  .replace(/<[^>]+>/g, ' ')
  .replace(/&nbsp;/gi, ' ')
  .replace(/&amp;/gi, '&')
  .replace(/&quot;/gi, '"')
  .replace(/&#39;/gi, "'")
  .replace(/\s+/g, ' ')
  .trim();

export const sanitizeHtml = (html = '') => html
  .replace(/<script[\s\S]*?<\/script>/gi, '')
  .replace(/<iframe[\s\S]*?<\/iframe>/gi, '')
  .replace(/<object[\s\S]*?<\/object>/gi, '')
  .replace(/<embed[^>]*>/gi, '')
  .replace(/<style[\s\S]*?<\/style>/gi, '')
  .replace(/\son\w+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, '')
  .replace(/\sstyle\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, '')
  .replace(/\s(?:href|src)\s*=\s*(["'])\s*javascript:[\s\S]*?\1/gi, '')
  .replace(/\s(?:href|src)\s*=\s*javascript:[^\s>]+/gi, '');

const getName = (value) => {
  if (typeof value === 'string') return value.trim();
  return value?.name?.trim() || value?.title?.trim() || '';
};

const makeExcerpt = (html, excerpt) => {
  const provided = typeof excerpt === 'string' ? excerpt.trim() : '';
  if (provided) return provided;

  const plainText = stripHtml(html);
  if (plainText.length <= 180) return plainText;
  return `${plainText.slice(0, 177).trimEnd()}...`;
};

const makeSlug = (title) => title
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-|-$/g, '');

export const normalizePost = (post = {}) => {
  const htmlContent = post.html_content || post.htmlContent || '';
  const title = post.title?.trim() || 'Field note';
  const tags = toArray(post.tags).map(getName).filter(Boolean);
  const authors = toArray(post.authors).map(getName).filter(Boolean);
  const category = getName(post.category) || post.category_name || '';
  const wordCount = stripHtml(htmlContent).split(/\s+/).filter(Boolean).length;

  return {
    ...post,
    id: post.id || post.slug || makeSlug(title),
    slug: post.slug || makeSlug(title),
    title,
    htmlContent,
    excerpt: makeExcerpt(htmlContent, post.excerpt),
    category,
    tags,
    authors,
    publishedAt: post.published_at || post.publishedAt || '',
    imageUrl: post.image_url || post.imageUrl || post.cover_image_url || post.coverImageUrl || post.featured_image_url || post.featuredImageUrl || '',
    readTime: Math.max(1, Math.ceil(wordCount / 200)),
  };
};

const requestPosts = async ({ blogId, limit = DEFAULT_LIMIT, signal } = {}) => {
  const url = new URL(`${API_ORIGIN}/${encodeURIComponent(blogId)}/posts`);
  url.searchParams.set('limit', String(limit));
  const response = await fetch(url, {
    headers: { Accept: 'application/json' },
    signal,
  });

  if (!response.ok) throw new Error(`Zenblog returned ${response.status}.`);

  const payload = await response.json();
  return {
    posts: toArray(payload?.data || payload).map(normalizePost),
    total: Number.isFinite(payload?.total) ? payload.total : null,
  };
};

export const fetchZenblogPosts = async ({ blogId = getZenblogBlogId(), limit = DEFAULT_LIMIT, signal } = {}) => {
  if (!blogId) return { posts: [], total: 0, configured: false };
  const result = await requestPosts({ blogId, limit, signal });
  return { ...result, configured: true };
};

export const fetchZenblogPost = async ({ blogId = getZenblogBlogId(), slug, signal } = {}) => {
  if (!blogId) return { post: null, configured: false };
  const result = await requestPosts({ blogId, limit: 100, signal });
  return {
    post: result.posts.find((post) => post.slug === slug) || null,
    total: result.total,
    configured: true,
  };
};
