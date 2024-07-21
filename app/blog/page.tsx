export default function BlogPage() {
    // Temporary static data for testing
    const posts = [
      {
        title: 'Our Second Post',
        description: "Here's some more content for our blog. We're excited to share more with you.",
        slug: 'our-second-post'
      },
      {
        title: 'Welcome to Our Blog',
        description: 'This is our first blog post. Stay tuned for more updates.',
        slug: 'welcome-to-our-blog'
      }
    ];
  
    console.log('Static Blog posts:', posts);
  
    return (
      <div>
        <h1 className="text-3xl font-bold mb-4">Blog</h1>
        <ul className="space-y-4">
          {posts.map((post) => (
            <li key={post.slug} className="border-b border-gray-200 pb-4">
              <h2 className="text-2xl font-semibold">
                <a href={`/blog/${post.slug}`} className="text-blue-600 hover:underline">
                  {post.title}
                </a>
              </h2>
              <p className="mt-2">{post.description}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }