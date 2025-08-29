import React from 'react';
import { Download, Users, Share2 } from 'lucide-react';
import { useWhiteboard } from '../context/WhiteboardContext';

const AppHeader = () => {
  const { exportCanvas } = useWhiteboard();

  return (
    <header className="bg-white shadow-sm py-2 px-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-blue-600 mr-2">CollabBoard</h1>
          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">Beta</span>
        </div>
        
        <div className="flex items-center space-x-3">
          <button 
            className="flex items-center text-sm text-gray-600 hover:text-blue-600 transition-colors"
            title="Online Users"
          >
            <Users size={18} className="mr-1" />
            <span>3 Online</span>
          </button>
          
          <button 
            className="flex items-center text-sm text-gray-600 hover:text-blue-600 transition-colors"
            title="Share Board"
          >
            <Share2 size={18} className="mr-1" />
            <span>Share</span>
          </button>
          
          <button 
            onClick={exportCanvas}
            className="flex items-center px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
            title="Export as PNG"
          >
            <Download size={16} className="mr-1" />
            <span>Export</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;