import React from 'react';

const DebugTailwind = () => {
  return (
    <div className="p-4 bg-blue-100 border border-blue-300 rounded-lg m-4">
      <h3 className="text-lg font-bold text-blue-800 mb-2">Tailwind CSS Debug Test</h3>
      <div className="space-y-2">
        <div className="bg-red-500 text-white p-2 rounded">Red background with white text</div>
        <div className="bg-green-500 text-white p-2 rounded">Green background with white text</div>
        <div className="bg-yellow-500 text-black p-2 rounded">Yellow background with black text</div>
        <div className="bg-purple-500 text-white p-2 rounded">Purple background with white text</div>
      </div>
      <p className="text-sm text-gray-600 mt-2">
        If you can see colored boxes above, Tailwind CSS is working! 🎉
      </p>
    </div>
  );
};

export default DebugTailwind;
