import React from 'react';
import Simulator from './Simulator';

function App() {
  return (
    <div className="App">
      <nav className="navbar navbar-light bg-light">
        <a className="navbar-brand" href="#">
          <img src="https://api.buda.com/images/logo-dark-48a2ea6b.svg" alt="Logo" />
          
        </a>
      </nav>
      <Simulator />
    </div>
  );
}

export default App;