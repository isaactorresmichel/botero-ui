import React, { useState } from 'react';
import { ipcRenderer } from 'electron';

import logo from './logo.svg';
import './App.css';

function App() {
  const [replySync, setReplySync] = useState('N/A');

  const [replyAsync, setReplyAsync] = useState("N/A");
  ipcRenderer.on('replyAsync', (event, args) => {
    setReplyAsync(args);
  });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          <h2>SYNC</h2>
          <button onClick={() => {
              const reply = ipcRenderer.sendSync('replySync', 'hola');
              setReplySync(reply);
          }}> SYNC </button>
          <div>
            SYNC Reply: { replySync }
          </div>
        </div>
        <div>
          <h2>ASYNC</h2>
          <button onClick={() => { ipcRenderer.send('sendAsync', 'hola')}}> ASYNC </button>
          <div>
            SYNC Reply: { replyAsync }
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
