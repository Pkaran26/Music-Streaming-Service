import React from 'react';
import './App.css';
import Header from './Components/Shared/Header'
import Music from './Components/Music/Music'

function App() {
  return (
    <div className="App">
      <Header />
      <div className="container-fluid" style={{ marginTop: '20px' }}>
        <Music />
      </div>
    </div>
  );
}

export default App;
