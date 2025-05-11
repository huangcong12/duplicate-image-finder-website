import Link from 'next/link';
import { getSortedPostsData } from '../../lib/blog';

export default async function Blog() {
  const allPostsData = getSortedPostsData();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Blog</h1>
        <p className="text-lg text-gray-700 mb-12">
          Learn more about duplicate image management, Shopify optimization, and best practices for your online store.
        </p>

        {allPostsData.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No blog posts yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allPostsData.map(({ id, date, title, excerpt }) => (
              <article key={id} className="bg-white border border-gray-100 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="text-sm text-gray-500 mb-2">
                  {new Date(date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </div>
                <Link href={`/blog/${id}`}>
                  <h2 className="text-xl font-bold mb-3 hover:text-blue-600 transition-colors">
                    {title}
                  </h2>
                </Link>
                <p className="text-gray-700 mb-4 line-clamp-3">{excerpt}</p>
                <div className="mt-auto pt-4">
                  <Link 
                    href={`/blog/${id}`}
                    className="text-blue-600 font-medium hover:text-blue-800 transition-colors"
                  >
                    Read more →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
