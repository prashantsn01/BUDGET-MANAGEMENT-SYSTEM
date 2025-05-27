import React from 'react';

export const Progress = ({ value, className = '' }) => (
  <div className="w-full bg-gray-200 rounded-full h-2">
    <div
      style={{ width: value <= 100 ? `${value}%` : '100%' }}
      className={`${className} h-full rounded-full`}
    ></div>
  </div>
);
