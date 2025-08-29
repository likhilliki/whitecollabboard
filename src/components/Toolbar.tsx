import React from 'react';
import { 
  Pencil, 
  Square, 
  Circle, 
  Type, 
  Image, 
  Eraser, 
  MousePointer, 
  Hand,
  Trash2
} from 'lucide-react';
import { useWhiteboard } from '../context/WhiteboardContext';
import ColorPicker from './ColorPicker';
import StrokeWidthPicker from './StrokeWidthPicker';

const Toolbar = () => {
  const { 
    activeTool, 
    setActiveTool, 
    strokeColor,
    clearCanvas
  } = useWhiteboard();

  const tools = [
    { id: 'select', icon: <MousePointer size={20} />, label: 'Select' },
    { id: 'pen', icon: <Pencil size={20} />, label: 'Pen' },
    { id: 'eraser', icon: <Eraser size={20} />, label: 'Eraser' },
    { id: 'rectangle', icon: <Square size={20} />, label: 'Rectangle' },
    { id: 'circle', icon: <Circle size={20} />, label: 'Circle' },
    { id: 'text', icon: <Type size={20} />, label: 'Text' },
    { id: 'image', icon: <Image size={20} />, label: 'Image' },
    { id: 'pan', icon: <Hand size={20} />, label: 'Pan' }
  ];

  return (
    <div className="bg-white p-2 shadow-md flex flex-row md:flex-col items-center justify-start md:w-16 space-y-0 space-x-1 md:space-x-0 md:space-y-1 border-t md:border-t-0 md:border-l border-gray-200">
      {tools.map((tool) => (
        <button
          key={tool.id}
          onClick={() => setActiveTool(tool.id)}
          className={`p-2 rounded-md transition-colors w-full flex items-center justify-center ${
            activeTool === tool.id 
              ? 'bg-blue-100 text-blue-600' 
              : 'text-gray-600 hover:bg-gray-100'
          }`}
          title={tool.label}
        >
          {tool.icon}
        </button>
      ))}

      <div className="w-full h-px bg-gray-200 my-2"></div>
      
      <ColorPicker />
      <StrokeWidthPicker />
      
      <div className="w-full h-px bg-gray-200 my-2"></div>
      
      <button
        onClick={clearCanvas}
        className="p-2 rounded-md text-red-600 hover:bg-red-50 transition-colors w-full flex items-center justify-center"
        title="Clear Canvas"
      >
        <Trash2 size={20} />
      </button>
    </div>
  );
};

export default Toolbar;