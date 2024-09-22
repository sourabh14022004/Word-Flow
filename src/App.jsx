import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './Components/Home/Home.jsx';
import Demo from './Components/Demo/Demo.jsx';
import HomeHeader from './Components/Home/Header/HomeHeader.jsx';
import DemoHeader from './Components/Demo/DemoHeader.jsx';
import { Blog } from './Context/Context.jsx';
import { ToastContainer } from 'react-toastify';
import Profile from './Components/Home/Profile/Profile.jsx';
import Write from './Components/Home/Write/Write.jsx';
import SinglePost from './Components/Common/Posts/SinglePost.jsx';
import EditPost from './Components/Common/Posts/EditPost.jsx';



function App() {
  const { currentUser } = Blog();
  return (
    <>
      {currentUser ? <HomeHeader/> : <DemoHeader/>}
      <ToastContainer/>
      <Routes>
          { currentUser && <Route path = "/" element={<Home/>}></Route>}
          { !currentUser && <Route path = "/demo" element ={<Demo/>}></Route>}
            <Route path="/profile/:userId" element ={<Profile/>}></Route>
            <Route path="/write" element = {<Write/>}></Route>
            <Route path='/post/:postId' element = {<SinglePost/> }></Route>
            <Route path='/editPost/:postId' element = {<EditPost/> }></Route>


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