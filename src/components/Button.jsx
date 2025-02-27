import React from 'react';

const Button = ({ onClick, children, className }) => {
  return (
    <button
      className={`px-4 py-2 rounded-lg font-semibold text-white bg-blue-500 hover:bg-blue-600 transition-colors ${className || ''}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;