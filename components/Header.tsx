
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="py-6 text-center border-b border-gray-700">
      <h1 className="text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
        AI Photo Editor
      </h1>
      <p className="mt-2 text-lg text-gray-400">Diberdayakan oleh Nano Banana</p>
    </header>
  );
};
