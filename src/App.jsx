import logo from './logo.svg';
import './App.css';
import React from "react";
import { Link } from 'react-router-dom';
import { submitForm, setFormField } from './features/posts/postSlice.ts';
// import { useSelector, useDispatch } from 'react-redux'
import { useAppDispatch,useAppSelector } from './app/hooks.ts';
import { Route, Routes } from 'react-router-dom';
import { SinglePostPage } from './features/posts/singlepostpage.tsx'; 
import  Home from './home.jsx'
import { EditPostPage } from './features/posts/editpostpage.tsx';
// import { Users } from './features/users/addPost.jsx';
import { LoginPage } from './features/Loginpage.tsx';
import AddPost from './features/users/addPost.jsx';
import UserProfile from './features/users/userProfile';

const App = () => {


  return (
    
        
        <Routes>
          <Route path="/:username" element={<Home/>} />
          <Route path='/' element={<Home/>} />
          {/* <Route path="/Home" element={<Home/>}/> */}
          <Route path="/Loginpage" element={<LoginPage/>}/>
          <Route path="/userProfile/createPost" element={<><UserProfile/><AddPost/></>}/>
          <Route path="/userProfile" element={<UserProfile/>}/>
          <Route path="/SinglePostPage/:id" element={<SinglePostPage/>}/>
          <Route path="/EditPostPage/:id" element={<EditPostPage/>}/>
       </Routes>
  
  );
};

export default App;
