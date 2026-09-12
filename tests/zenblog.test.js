import assert from 'node:assert/strict';
import test from 'node:test';
import { fetchZenblogPost, fetchZenblogPosts } from '../src/lib/zenblog.js';

const withMockFetch = async (mock, run) => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = mock;
  try {
    await run();
  } finally {
    globalThis.fetch = originalFetch;
  }
};

test('loads article content from the Zenblog post detail endpoint', async () => {
  await withMockFetch(async (url) => {
    assert.equal(
      url,
      'https://zenblog.com/api/public/blogs/blog-id/posts/field-note',
    );
    return Response.json({
      data: {
        title: 'Field note',
        slug: 'field-note',
        html_content: '<p>One two three.</p>',
        cover_image: 'https://images.example/cover.jpg',
      },
    });
  }, async () => {
    const result = await fetchZenblogPost({ blogId: 'blog-id', slug: 'field-note' });

    assert.equal(result.post.htmlContent, '<p>One two three.</p>');
    assert.equal(result.post.imageUrl, 'https://images.example/cover.jpg');
    assert.equal(result.post.readTime, 1);
  });
});

test('keeps the posts endpoint for lightweight index summaries', async () => {
  await withMockFetch(async (url) => {
    assert.equal(
      url.toString(),
      'https://zenblog.com/api/public/blogs/blog-id/posts?limit=12',
    );
    return Response.json({ data: [{ title: 'Field note', slug: 'field-note' }], total: 1 });
  }, async () => {
    const result = await fetchZenblogPosts({ blogId: 'blog-id' });

    assert.equal(result.posts.length, 1);
    assert.equal(result.posts[0].htmlContent, '');
    assert.equal(result.total, 1);
  });
});
