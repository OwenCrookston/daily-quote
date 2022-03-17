import React from 'react';
import './App.css';
import MessageInsertView from './MessageInsertView';
import QuoteView from './QuoteView';

function App() {
  // use js to access current url location.pathname and conditionally render
  const currentURL = window.location.pathname;
  return (
    <div className="App">
      {currentURL === '/example' && <MessageInsertView /> }
      {currentURL === '/' && <QuoteView /> }
    </div>
  );
}

export default App;
