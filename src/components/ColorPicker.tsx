import React from 'react';
import { useWhiteboard } from '../context/WhiteboardContext';

const ColorPicker = () => {
  const { strokeColor, setStrokeColor } = useWhiteboard();
  
  const colors = [
    '#000000', // Black
    '#FFFFFF', // White
    '#F87171', // Red
    '#FBBF24', // Yellow
    '#34D399', // Green
    '#60A5FA', // Blue
    '#A78BFA', // Purple
    '#EC4899', // Pink
  ];

  return (
    <div className="w-full p-1">
      <div className="grid grid-cols-4 gap-1">
        {colors.map((color) => (
          <button
            key={color}
            onClick={() => setStrokeColor(color)}
            className={`w-full aspect-square rounded-full transition-transform ${
              strokeColor === color ? 'ring-2 ring-blue-500 scale-110' : ''
            }`}
            style={{ 
              backgroundColor: color,
              border: color === '#FFFFFF' ? '1px solid #E5E7EB' : 'none'
            }}
            title={color}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorPicker;