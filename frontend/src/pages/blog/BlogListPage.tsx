import React from 'react';
import { Link } from 'react-router-dom';

// Placeholder for blog post data structure
interface PostPreview {
  id: string;
  title: string;
  excerpt: string;
  date: string;
}

// Dummy data for now
const dummyPosts: PostPreview[] = [
  {
    id: '1',
    title: 'First Blog Post',
    excerpt: 'This is a short preview of the first blog post...',
    date: '2024-03-10',
  },
  {
    id: '2',
    title: 'Exploring React Router',
    excerpt: 'A quick guide to setting up and using React Router v6.',
    date: '2024-03-11',
  },
];

const BlogListPage: React.FC = () => {
  return (
    <div>
      <h1>Blog</h1>
      <p>Here are the latest blog posts:</p>
      {dummyPosts.map((post) => (
        <div key={post.id} style={{ borderBottom: '1px solid #eee', paddingBottom: '15px', marginBottom: '15px' }}>
          <h2>
            <Link to={`/blog/${post.id}`} style={{ color: '#333', textDecoration: 'none' }}>
              {post.title}
            </Link>
          </h2>
          <small>Posted on: {post.date}</small>
          <p>{post.excerpt}</p>
          <Link to={`/blog/${post.id}`} style={{ color: 'blue' }}>Read more...</Link>
        </div>
      ))}
    </div>
  );
};

export default BlogListPage; 