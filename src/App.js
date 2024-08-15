import './Stylesheet/text-elements.css';
import './Stylesheet/form-element.css';
import './Stylesheet/custom-components.css';
import './Stylesheet/alignments.css';
import './Stylesheet/them.css';
import './Stylesheet/layout.css';

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login/index';
import Register from './Pages/Register/index';
import Home from './Pages/Home/index';
import ProtectedRoute from './Components/ProtectedRoute';
import PublicRoutes from './Components/PublicRoutes';
import Transactions from './Pages/Transactions/index';
import Request from './Pages/Request';
import Users from './Pages/Users';
import Profile from './Pages/Profile/index';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<><Login/></>}></Route>
          <Route path="/register" element={<><Register/></>} ></Route>

          <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>}></Route>
          <Route path="/transactions" element={<ProtectedRoute><Transactions/></ProtectedRoute>}></Route>
          <Route path="/requests" element={<ProtectedRoute><Request/></ProtectedRoute>}></Route>
          <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>}></Route>
          <Route path="/users" element={<ProtectedRoute><Users/></ProtectedRoute>}></Route>
        </Routes>
        
      </BrowserRouter>

    </div>
  );
}

export default App;
