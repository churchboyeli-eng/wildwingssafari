import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CalendarDays,
  Clock3,
  RefreshCcw,
  Search,
  Tag,
} from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import {
  fetchZenblogPost,
  fetchZenblogPosts,
  getZenblogBlogId,
  sanitizeHtml,
} from '../lib/zenblog';

const dateFormatter = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
});

const formatDate = (value) => {
  if (!value) return 'Wild Wings field note';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? 'Wild Wings field note' : dateFormatter.format(date);
};

const uniqueCategories = (posts) => [...new Set(posts.map((post) => post.category).filter(Boolean))];

function BlogArt({ post, index, detail = false }) {
  if (post.imageUrl) {
    return <img className={detail ? 'blog-post-image' : 'blog-card-image'} src={post.imageUrl} alt={post.title} loading={detail ? 'eager' : 'lazy'} decoding="async" />;
  }

  return (
    <div className={`blog-card-art blog-card-art-${index % 4} ${detail ? 'is-detail' : ''}`} aria-hidden="true">
      <BookOpen size={detail ? 36 : 28} strokeWidth={1.3} />
      <span>{post.category || 'Field note'}</span>
    </div>
  );
}

function SetupState() {
  return (
    <div className="blog-state blog-state-setup">
      <span className="blog-state-icon"><BookOpen aria-hidden="true" size={21} /></span>
      <p className="eyebrow">Zenblog is ready</p>
      <h3>Connect your published stories.</h3>
      <p>Add <code>VITE_ZENBLOG_BLOG_ID</code> to the site environment, then publish from Zenblog. Your posts will appear here with their title, excerpt, author and full story.</p>
      <Link to="/booking" className="blog-state-action">Plan a story-led trip <ArrowRight aria-hidden="true" size={15} /></Link>
    </div>
  );
}

function ErrorState({ onRetry }) {
  return (
    <div className="blog-state blog-state-error" role="alert">
      <span className="blog-state-icon"><RefreshCcw aria-hidden="true" size={21} /></span>
      <p className="eyebrow">The blog is taking a moment</p>
      <h3>We could not load the latest posts.</h3>
      <p>Check the connection or try again. Published stories will stay in Zenblog while this page reconnects.</p>
      <button type="button" className="blog-state-action" onClick={onRetry}>Try again <RefreshCcw aria-hidden="true" size={15} /></button>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="blog-grid blog-grid-loading" aria-label="Loading blog posts">
      {Array.from({ length: 3 }, (_, index) => <div className="blog-card blog-card-skeleton" key={index} />)}
    </div>
  );
}

function BlogCard({ post, index }) {
  return (
    <article className="blog-card">
      <Link to={`/blog/${encodeURIComponent(post.slug)}`} className="blog-card-link" aria-label={`Read ${post.title}`}>
        <BlogArt post={post} index={index} />
        <div className="blog-card-copy">
          <div className="blog-card-meta">
            <span>{post.category || 'Field note'}</span>
            <span><CalendarDays aria-hidden="true" size={13} />{formatDate(post.publishedAt)}</span>
          </div>
          <h3>{post.title}</h3>
          {post.excerpt && <p>{post.excerpt}</p>}
          <span className="blog-card-action">Read story <ArrowRight aria-hidden="true" size={16} /></span>
        </div>
      </Link>
    </article>
  );
}

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState('loading');
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const blogId = getZenblogBlogId();

  const loadPosts = useCallback(async () => {
    setStatus('loading');
    try {
      const result = await fetchZenblogPosts({ blogId });
      setPosts(result.posts);
      setStatus(result.configured ? 'ready' : 'setup');
    } catch {
      setStatus('error');
    }
  }, [blogId]);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  const categories = useMemo(() => uniqueCategories(posts), [posts]);
  const filteredPosts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return posts.filter((post) => {
      const matchesCategory = activeCategory === 'all' || post.category === activeCategory;
      const haystack = [post.title, post.excerpt, post.category, ...post.tags].join(' ').toLowerCase();
      return matchesCategory && (!normalizedQuery || haystack.includes(normalizedQuery));
    });
  }, [activeCategory, posts, query]);

  return (
    <div className="page-enter blog-page">
      <section className="blog-hero" aria-labelledby="blog-heading">
        <div className="blog-hero-inner">
          <div className="blog-hero-copy">
            <p className="eyebrow">Wild Wings blog</p>
            <h1 id="blog-heading">Field notes for planning Tanzania.</h1>
            <p>Practical stories from the parks, mountain paths and coast. Use them to choose a season, set a pace and make the route yours.</p>
            <div className="blog-hero-actions">
              <a href="#blog-collection" className="blog-hero-action">Read the latest <ArrowRight aria-hidden="true" size={16} /></a>
              <Link to="/itineraries" className="blog-hero-secondary">Browse itineraries <ArrowRight aria-hidden="true" size={16} /></Link>
            </div>
          </div>
          <aside className="blog-hero-note">
            <p className="eyebrow">Written for real trips</p>
            <strong>Season notes, route ideas and the details that make a day in the field work.</strong>
            <span><BookOpen aria-hidden="true" size={16} /> Updated from the Wild Wings team</span>
          </aside>
        </div>
      </section>

      <section id="blog-collection" className="blog-listing" aria-labelledby="blog-collection-heading">
        <header className="blog-listing-heading">
          <div>
            <p className="eyebrow">From the field</p>
            <h2 id="blog-collection-heading">A useful note before you go.</h2>
          </div>
          <p>Stories from the people who plan and guide private journeys across Tanzania.</p>
        </header>

        {status === 'ready' && (
          <div className="blog-toolbar">
            <label className="blog-search"><Search aria-hidden="true" size={16} /><span className="sr-only">Search blog</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search the blog" /></label>
            {categories.length > 0 && (
              <div className="blog-category-filters" aria-label="Filter blog by category">
                <button type="button" className={activeCategory === 'all' ? 'is-active' : ''} aria-pressed={activeCategory === 'all'} onClick={() => setActiveCategory('all')}>All notes</button>
                {categories.map((category) => <button type="button" key={category} className={activeCategory === category ? 'is-active' : ''} aria-pressed={activeCategory === category} onClick={() => setActiveCategory(category)}><Tag aria-hidden="true" size={13} />{category}</button>)}
              </div>
            )}
          </div>
        )}

        {status === 'loading' && <LoadingState />}
        {status === 'setup' && <SetupState />}
        {status === 'error' && <ErrorState onRetry={loadPosts} />}
        {status === 'ready' && (
          filteredPosts.length > 0 ? (
            <div className="blog-grid">
              {filteredPosts.map((post, index) => <BlogCard key={post.id || post.slug} post={post} index={index} />)}
            </div>
          ) : (
            <div className="blog-empty"><p>No stories match that search yet.</p><button type="button" onClick={() => { setQuery(''); setActiveCategory('all'); }}>Show all notes</button></div>
          )
        )}
      </section>

      <section className="blog-closing">
        <div><p className="eyebrow">Need the short version?</p><h2>Tell us what you want to see.</h2><p>We will turn your dates, interests and travel pace into a clear route and a day-by-day plan.</p></div>
        <Link to="/booking" className="btn-dark">Book now <ArrowRight aria-hidden="true" size={16} /></Link>
      </section>
    </div>
  );
}

export function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [status, setStatus] = useState('loading');
  const blogId = getZenblogBlogId();

  const loadPost = useCallback(async () => {
    setStatus('loading');
    try {
      const result = await fetchZenblogPost({ blogId, slug: decodeURIComponent(slug || '') });
      setPost(result.post);
      setStatus(result.configured ? (result.post ? 'ready' : 'missing') : 'setup');
    } catch {
      setStatus('error');
    }
  }, [blogId, slug]);

  useEffect(() => {
    loadPost();
  }, [loadPost]);

  if (status === 'loading') return <div className="page-enter blog-post-page"><LoadingState /></div>;
  if (status === 'setup') return <div className="page-enter blog-post-page"><SetupState /></div>;
  if (status === 'error') return <div className="page-enter blog-post-page"><ErrorState onRetry={loadPost} /></div>;
  if (status === 'missing') return <div className="page-enter blog-post-page"><div className="blog-state"><p className="eyebrow">Story not found</p><h3>That field note is no longer published.</h3><Link to="/blog" className="blog-state-action"><ArrowLeft aria-hidden="true" size={15} /> Back to the blog</Link></div></div>;

  return (
    <div className="page-enter blog-post-page">
      <article className="blog-post">
        <header className="blog-post-heading">
          <Link to="/blog" className="blog-back-link"><ArrowLeft aria-hidden="true" size={16} /> Wild Wings blog</Link>
          <div className="blog-post-meta"><span>{post.category || 'Field note'}</span><span><CalendarDays aria-hidden="true" size={14} />{formatDate(post.publishedAt)}</span><span><Clock3 aria-hidden="true" size={14} />{post.readTime} min read</span></div>
          <h1>{post.title}</h1>
          {post.excerpt && <p className="blog-post-lead">{post.excerpt}</p>}
          {post.authors.length > 0 && <p className="blog-post-author">Words by {post.authors.join(' · ')}</p>}
        </header>
        <div className="blog-post-art"><BlogArt post={post} index={0} detail /></div>
        <div className="blog-post-layout">
          <div className="blog-post-body" dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.htmlContent) }} />
          <aside className="blog-post-aside"><p className="eyebrow">Keep planning</p><strong>Pair the story with a route.</strong><p>Tell us what caught your eye and we will shape it around your dates.</p><Link to="/booking" className="blog-post-aside-link">Book now <ArrowRight aria-hidden="true" size={15} /></Link></aside>
        </div>
      </article>
    </div>
  );
}
