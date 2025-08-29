import React from 'react';
import Whiteboard from './components/Whiteboard';
import AppHeader from './components/AppHeader';
import { WhiteboardProvider } from './context/WhiteboardContext';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <WhiteboardProvider>
        <AppHeader />
        <Whiteboard />
      </WhiteboardProvider>
    </div>
  );
}

export default App;