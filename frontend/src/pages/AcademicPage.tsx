import React from 'react';
import { Link } from 'react-router-dom';

const AcademicPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Academic Page</h2>
      <p>This is the Academic page for publications, research, etc.</p>
      <Link to="/" className="text-blue-500 hover:underline">Go to Home</Link>
    </div>
  );
};

export default AcademicPage; 