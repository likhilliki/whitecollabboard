import React, { useRef, useEffect } from 'react';
import Toolbar from './Toolbar';
import UserCursors from './UserCursors';
import ZoomControls from './ZoomControls';
import { useWhiteboard } from '../context/WhiteboardContext';

const Whiteboard = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { 
    initializeCanvas, 
    handleMouseDown, 
    handleMouseMove, 
    handleMouseUp, 
    zoom,
    scale
  } = useWhiteboard();

  useEffect(() => {
    if (canvasRef.current && containerRef.current) {
      initializeCanvas(canvasRef.current, containerRef.current);
    }
  }, [initializeCanvas]);

  return (
    <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
      {/* Main canvas area */}
      <div 
        ref={containerRef}
        className="relative flex-1 bg-white overflow-hidden cursor-crosshair"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <canvas 
          ref={canvasRef}
          className="absolute top-0 left-0 transform origin-top-left"
          style={{ 
            transform: `scale(${scale})`,
            touchAction: 'none'
          }}
        />
        
        {/* Render user cursors */}
        <UserCursors />
        
        {/* Zoom controls */}
        <ZoomControls />
      </div>
      
      {/* Toolbar */}
      <Toolbar />
    </div>
  );
};

export default Whiteboard;