import React from 'react';
import { ZoomIn, ZoomOut, Maximize } from 'lucide-react';
import { useWhiteboard } from '../context/WhiteboardContext';

const ZoomControls = () => {
  const { zoomIn, zoomOut, resetZoom, scale } = useWhiteboard();
  
  return (
    <div className="absolute bottom-4 right-4 bg-white rounded-md shadow-md flex items-center">
      <button
        onClick={zoomOut}
        className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
        title="Zoom Out"
      >
        <ZoomOut size={20} />
      </button>
      
      <div className="px-2 text-sm text-gray-600 select-none">
        {Math.round(scale * 100)}%
      </div>
      
      <button
        onClick={zoomIn}
        className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
        title="Zoom In"
      >
        <ZoomIn size={20} />
      </button>
      
      <div className="w-px h-6 bg-gray-200 mx-1"></div>
      
      <button
        onClick={resetZoom}
        className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
        title="Reset Zoom"
      >
        <Maximize size={20} />
      </button>
    </div>
  );
};

export default ZoomControls;