import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'src/content/blog');

export interface PostData {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  author?: string;
  tags?: string[];
}

export function getSortedPostsData(): Omit<PostData, 'content'>[] {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      // Remove ".md" from file name to get id
      const id = fileName.replace(/\.md$/, '');

      // Read markdown file as string
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents);

      // Combine the data with the id
      return {
        id,
        title: matterResult.data.title || '',
        date: matterResult.data.date || '',
        excerpt: matterResult.data.excerpt || '',
        coverImage: matterResult.data.coverImage || '',
        author: matterResult.data.author || '',
        tags: matterResult.data.tags || [],
      };
    });

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    };
  });
}

export async function getPostData(id: string): Promise<PostData> {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // 不再尝试将 Markdown 转换为 HTML
  // 直接返回原始 Markdown 内容，让前端组件处理渲染

  // Combine the data with the id and content
  return {
    id,
    content: matterResult.content, // 原始 Markdown 内容
    title: matterResult.data.title || '',
    date: matterResult.data.date || '',
    excerpt: matterResult.data.excerpt || '',
    coverImage: matterResult.data.coverImage || '',
    author: matterResult.data.author || '',
    tags: matterResult.data.tags || [],
  };
}
