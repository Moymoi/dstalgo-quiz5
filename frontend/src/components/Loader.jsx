import React from 'react';

const Loader = ({ size = 24 }) => (
  <div
    style={{
      width: size,
      height: size,
      border: `3px solid rgba(255,255,255,0.2)`,
      borderTopColor: '#fff',
      borderRadius: '50%',
      animation: 'spin 0.7s linear infinite',
      display: 'inline-block',
    }}
  />
);

export default Loader;
