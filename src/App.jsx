import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Components/Home/Home.jsx';
import Demo from './Components/Demo/Demo.jsx';
import HomeHeader from './Components/Home/HomeHeader.jsx';
import DemoHeader from './Components/Demo/DemoHeader.jsx';



function App() {
  const auth = false;
  return (
    <>
      {auth ? <HomeHeader/> : <DemoHeader/>}
      <Routes>
          <Route path = "/" element={<Home/>}></Route>
          <Route path = "/demo" element ={<Demo/>}></Route>
      </Routes>
    </>
  )
}

export default App;