import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './Components/Home/Home.jsx';
import Demo from './Components/Demo/Demo.jsx';
import HomeHeader from './Components/Home/HomeHeader.jsx';
import DemoHeader from './Components/Demo/DemoHeader.jsx';
import { Blog } from './Context/Context.jsx';
import { ToastContainer } from 'react-toastify';



function App() {
  const { currentUser } = Blog();
  return (
    <>
      {currentUser ? <HomeHeader/> : <DemoHeader/>}
      <ToastContainer/>
      <Routes>
          { currentUser && <Route path = "/" element={<Home/>}></Route>}
          { !currentUser && <Route path = "/demo" element ={<Demo/>}></Route>}

          {/* Route protection */}

          <Route 
              path='*' 
              element ={ <Navigate to = { !currentUser ? "/demo" : "/"}/>} 
          />
      </Routes>
    </>
  )
}

export default App;