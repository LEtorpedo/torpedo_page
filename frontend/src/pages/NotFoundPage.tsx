// import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <div className="container mx-auto p-4 text-center">
    <h2 className="text-3xl font-bold mb-4">404 - Page Not Found</h2>
    <p className="mb-4">Sorry, the page you are looking for does not exist.</p>
    <Link to="/" className="text-blue-600 hover:underline font-semibold">Go back to Home</Link>
  </div>
);

export default NotFoundPage; 