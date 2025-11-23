import React from 'react';
import { useParams, Link } from 'react-router-dom';

// Placeholder for full blog post data
interface Post {
  id: string;
  title: string;
  content: string; // This would eventually be Markdown content or HTML
  date: string;
}

// Dummy data - in a real app, you'd fetch this based on postId
const dummyPosts: Post[] = [
  {
    id: '1',
    title: 'First Blog Post',
    content: 'This is the full content of the first blog post. It can be longer and include more details. **Markdown** would be rendered here.',
    date: '2024-03-10',
  },
  {
    id: '2',
    title: 'Exploring React Router',
    content: 'Detailed content about React Router v6, including examples and best practices. You can navigate programmatically too!',
    date: '2024-03-11',
  },
];

const BlogDetailPage: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const post = dummyPosts.find(p => p.id === postId);

  if (!post) {
    return (
      <div>
        <h2>Post Not Found</h2>
        <p>Sorry, we couldn't find the post you're looking for.</p>
        <Link to="/blog">Back to Blog List</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <small>Posted on: {post.date}</small>
      <div style={{ marginTop: '20px' }}>
        {/* In a real app, you'd use a Markdown renderer here */}
        <p>{post.content}</p>
      </div>
      <div style={{ marginTop: '30px' }}>
        <Link to="/blog">Back to Blog List</Link>
      </div>
    </div>
  );
};

export default BlogDetailPage; 