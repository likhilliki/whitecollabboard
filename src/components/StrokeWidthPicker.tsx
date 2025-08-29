import React from 'react';
import { useWhiteboard } from '../context/WhiteboardContext';

const StrokeWidthPicker = () => {
  const { strokeWidth, setStrokeWidth } = useWhiteboard();
  
  const widths = [2, 4, 6, 8];

  return (
    <div className="w-full p-1">
      <div className="flex flex-col space-y-1 items-center">
        {widths.map((width) => (
          <button
            key={width}
            onClick={() => setStrokeWidth(width)}
            className={`w-full h-8 flex items-center justify-center transition-colors ${
              strokeWidth === width ? 'bg-gray-100' : ''
            }`}
            title={`${width}px`}
          >
            <div 
              className="bg-current rounded-full" 
              style={{ 
                width: `${width * 1.5}px`, 
                height: `${width * 1.5}px`,
              }}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default StrokeWidthPicker;