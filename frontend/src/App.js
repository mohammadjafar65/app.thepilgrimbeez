import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import UploadComponent from './components/UploadComponent';
// import DisplayComponent from './components/DisplayComponent';
// import MaintenancePage from './components/MaintenancePage';
import HomePage from './home/homepage';
import AddnewPackage from './addnewpackage';
import PackageDetail from './packagedetail';
import CategoryPackages from './categorypackages';
import AboutPage from './about/aboutpage';
import './App.css';

function App() {
  return (
    <div className="App">        
        <BrowserRouter>
          <Routes>
              {/* <Route path="/" component={MaintenancePage} /> */}
              <Route path="/" element={<HomePage/>}></Route>
              <Route path="/addnewpackage" element={<AddnewPackage/>}></Route>
              <Route path="/package/id/:id" Component={PackageDetail} />
              <Route path="/packages/:category" element={<CategoryPackages/>} />
              <Route path="/about" element={<AboutPage/>}></Route>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
