import Link from 'next/link';
import { getPostData, getAllPostIds, getSortedPostsData } from '../../../lib/blog';
import ReactMarkdown from 'react-markdown';
import type { Metadata, ResolvingMetadata } from 'next';

export function generateStaticParams() {
  // Get all post IDs and format them correctly for static export
  const postIds = getAllPostIds();
  return postIds;
}

// Generate metadata for SEO
export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  // Await the params object before accessing its properties
  const resolvedParams = await params;
  const postData = await getPostData(resolvedParams.id);
  
  return {
    title: postData.title,
    description: postData.excerpt,
    openGraph: {
      title: postData.title,
      description: postData.excerpt,
      type: 'article',
      publishedTime: postData.date,
      authors: postData.author ? [postData.author] : undefined,
    },
  };
}

export default async function Post({ params }: { params: Promise<{ id: string }> }) {
  // Await the params object before accessing its properties
  const resolvedParams = await params;
  // 获取博客文章数据
  const postData = await getPostData(resolvedParams.id);
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <Link 
          href="/blog" 
          className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 mb-8"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to blog
        </Link>
        
        <article>
          <h1 className="text-4xl font-bold mb-4">{postData.title}</h1>
          
          <div className="flex items-center text-gray-500 mb-8">
            <time dateTime={postData.date}>
              {new Date(postData.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            {postData.author && (
              <>
                <span className="mx-2">•</span>
                <span>{postData.author}</span>
              </>
            )}
          </div>
          
          <article className="prose lg:prose-xl max-w-none">
            <ReactMarkdown>
              {postData.content}
            </ReactMarkdown>
          </article>
          
          {postData.tags && postData.tags.length > 0 && (
            <div className="mt-12 pt-6 border-t border-gray-200">
              <div className="flex flex-wrap gap-2">
                {postData.tags.map((tag) => (
                  <span 
                    key={tag} 
                    className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-medium text-gray-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </article>
      </div>
    </div>
  );
}
