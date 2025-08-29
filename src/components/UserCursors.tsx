import React from 'react';
import { useWhiteboard } from '../context/WhiteboardContext';

// Simulate remote users for demonstration
const demoUsers = [
  { id: 'user1', name: 'Alex', color: '#F87171', x: 250, y: 150 },
  { id: 'user2', name: 'Sam', color: '#60A5FA', x: 500, y: 300 },
];

const UserCursors = () => {
  const { scale } = useWhiteboard();
  
  return (
    <>
      {demoUsers.map((user) => (
        <div 
          key={user.id}
          className="absolute pointer-events-none transition-all duration-100 ease-out"
          style={{ 
            left: `${user.x * scale}px`,
            top: `${user.y * scale}px`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          {/* Cursor */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M4 4L12 20L14 14L20 12L4 4Z" 
              fill={user.color}
              stroke="white"
              strokeWidth="1.5"
            />
          </svg>
          
          {/* User label */}
          <div 
            className="ml-4 px-2 py-1 text-xs text-white rounded-md shadow-sm whitespace-nowrap"
            style={{ backgroundColor: user.color }}
          >
            {user.name}
          </div>
        </div>
      ))}
    </>
  );
};

export default UserCursors;