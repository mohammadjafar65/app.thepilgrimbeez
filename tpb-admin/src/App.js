import logo from './logo.svg';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from "./dashboard.js";
import './App.css';

function App() {
  return (
    <div className="App">        
        <BrowserRouter>
          <Routes>
              {/* <Route path="/" component={MaintenancePage} /> */}
              <Route path="/" element={<Dashboard/>}></Route>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
