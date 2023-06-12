import './App.css';
import React, { useState, useEffect } from 'react';

function App() {


  useEffect(() => {
    fetch("http://localhost:9292/test")
      .then((r) => r.json())
      .then((data) => console.log(data))
      }, [])

  return (
    <div className="App">
      'hello world'
    </div>
  );
}

export default App;
