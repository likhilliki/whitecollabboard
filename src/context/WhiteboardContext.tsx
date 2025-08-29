import React, { createContext, useContext, useState, useCallback, useRef } from 'react';

type Tool = 'select' | 'pen' | 'eraser' | 'rectangle' | 'circle' | 'text' | 'image' | 'pan';

interface WhiteboardContextType {
  activeTool: Tool;
  setActiveTool: (tool: Tool) => void;
  strokeColor: string;
  setStrokeColor: (color: string) => void;
  strokeWidth: number;
  setStrokeWidth: (width: number) => void;
  scale: number;
  initializeCanvas: (canvas: HTMLCanvasElement, container: HTMLDivElement) => void;
  handleMouseDown: (e: React.MouseEvent) => void;
  handleMouseMove: (e: React.MouseEvent) => void;
  handleMouseUp: () => void;
  clearCanvas: () => void;
  exportCanvas: () => void;
  zoomIn: () => void;
  zoomOut: () => void;
  resetZoom: () => void;
}

const WhiteboardContext = createContext<WhiteboardContextType | undefined>(undefined);

export const WhiteboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTool, setActiveTool] = useState<Tool>('pen');
  const [strokeColor, setStrokeColor] = useState('#000000');
  const [strokeWidth, setStrokeWidth] = useState(4);
  const [scale, setScale] = useState(1);
  const [isDrawing, setIsDrawing] = useState(false);
  
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const lastPositionRef = useRef({ x: 0, y: 0 });

  // Initialize canvas
  const initializeCanvas = useCallback((canvas: HTMLCanvasElement, container: HTMLDivElement) => {
    canvasRef.current = canvas;
    containerRef.current = container;
    
    // Set canvas dimensions
    const { width, height } = container.getBoundingClientRect();
    canvas.width = width * 2; // Double for higher resolution
    canvas.height = height * 2;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    
    // Initialize context
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(2, 2); // Scale for higher resolution
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = strokeWidth;
      contextRef.current = ctx;
    }
  }, [strokeColor, strokeWidth]);

  // Handle mouse down
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!contextRef.current || !canvasRef.current) return;
    
    setIsDrawing(true);
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / scale;
    const y = (e.clientY - rect.top) / scale;
    
    contextRef.current.strokeStyle = activeTool === 'eraser' ? '#FFFFFF' : strokeColor;
    contextRef.current.lineWidth = strokeWidth;
    
    if (activeTool === 'pen' || activeTool === 'eraser') {
      contextRef.current.beginPath();
      contextRef.current.moveTo(x, y);
    }
    
    lastPositionRef.current = { x, y };
  }, [activeTool, strokeColor, strokeWidth, scale]);

  // Handle mouse move
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDrawing || !contextRef.current || !canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / scale;
    const y = (e.clientY - rect.top) / scale;
    
    if (activeTool === 'pen' || activeTool === 'eraser') {
      contextRef.current.lineTo(x, y);
      contextRef.current.stroke();
    } else if (activeTool === 'rectangle') {
      // Clear and redraw for shape preview
      const { x: startX, y: startY } = lastPositionRef.current;
      const width = x - startX;
      const height = y - startY;
      
      // Save current canvas state for preview
      contextRef.current.save();
      contextRef.current.setLineDash([5, 5]);
      contextRef.current.strokeRect(startX, startY, width, height);
      contextRef.current.restore();
    } else if (activeTool === 'circle') {
      // Clear and redraw for shape preview
      const { x: startX, y: startY } = lastPositionRef.current;
      const radius = Math.sqrt(Math.pow(x - startX, 2) + Math.pow(y - startY, 2));
      
      // Save current canvas state for preview
      contextRef.current.save();
      contextRef.current.beginPath();
      contextRef.current.arc(startX, startY, radius, 0, 2 * Math.PI);
      contextRef.current.stroke();
      contextRef.current.restore();
    }
  }, [isDrawing, activeTool, scale]);

  // Handle mouse up
  const handleMouseUp = useCallback(() => {
    setIsDrawing(false);
  }, []);

  // Clear canvas
  const clearCanvas = useCallback(() => {
    if (!contextRef.current || !canvasRef.current) return;
    
    contextRef.current.clearRect(
      0, 0, 
      canvasRef.current.width / 2, 
      canvasRef.current.height / 2
    );
  }, []);

  // Export canvas
  const exportCanvas = useCallback(() => {
    if (!canvasRef.current) return;
    
    const dataUrl = canvasRef.current.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = 'whiteboard.png';
    link.href = dataUrl;
    link.click();
  }, []);

  // Zoom controls
  const zoomIn = useCallback(() => {
    setScale(prev => Math.min(prev + 0.1, 3));
  }, []);

  const zoomOut = useCallback(() => {
    setScale(prev => Math.max(prev - 0.1, 0.5));
  }, []);

  const resetZoom = useCallback(() => {
    setScale(1);
  }, []);

  const value = {
    activeTool,
    setActiveTool,
    strokeColor,
    setStrokeColor,
    strokeWidth,
    setStrokeWidth,
    scale,
    initializeCanvas,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    clearCanvas,
    exportCanvas,
    zoomIn,
    zoomOut,
    resetZoom,
  };

  return (
    <WhiteboardContext.Provider value={value}>
      {children}
    </WhiteboardContext.Provider>
  );
};

export const useWhiteboard = (): WhiteboardContextType => {
  const context = useContext(WhiteboardContext);
  if (context === undefined) {
    throw new Error('useWhiteboard must be used within a WhiteboardProvider');
  }
  return context;
};