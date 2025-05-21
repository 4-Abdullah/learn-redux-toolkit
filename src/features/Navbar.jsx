import { Link, useSearchParams } from "react-router-dom";
import { useParams } from 'react-router-dom'
import { useState,useEffect } from "react";
import { useNavigate } from 'react-router-dom' 
import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks.ts'
import { userLoggedOut } from "./posts/postSlice.ts";
export const Navbar = () => {
    // const {username} = useParams();
   
  const dispatch = useAppDispatch()

// const location = useLocation();
// const queryParams = new URLSearchParams(location.search);
// const username = queryParams.get('username');
const [searchParams] = useSearchParams();
const username = searchParams.get('username');
const navigate = useNavigate()
// console.log(username); // 'John' if URL is /?username=John

  // const formState = useAppSelector((state) => state.username);
    // console.log(username);

    const [buttonText, setButtonText] = useState('');

    useEffect(() => {
      setButtonText(username ? username: 'Login');
    console.log(username);

    }, [username]);


  const Home =(e)=>{
    
    if(username!=null){
        const destination=`/?username=${username}`
        navigate(destination)
    }
    else{
        const destination= `/`
        navigate(destination) 
    }
  }

  // const Cart =(e)=>{
    
  //   if(username!=null){
  //       const destination=`/checkout/?username=${username}`
  //       navigate(destination)
  //   }
  //   else{
  //       const destination= `/checkout`
  //       navigate(destination) 
  //   }
  // }

  // const Products =(e)=>{
    
  //   if(username!=null){
  //       const destination=`/products?username=${username}`
  //       navigate(destination)
  //   }
  //   else{
  //       const destination= `/products`
  //       navigate(destination) 
  //   }
  // }

  const handle =(e)=>{
    
    if(username!=null){
        const destination=`/userProfile?username=${username}`
        navigate(destination)
        return destination
    }
    else{
        const destination= `/Loginpage`
        navigate(destination) 
        return destination
    }
  }
  const handleLogout =(e)=>{

        const destination= `/`
        dispatch(userLoggedOut())
        navigate(destination) 
        return destination
    
  }



  // /SinglePostPage/${post.id}
  // const handle = () => (username ? `/${username}` : '/Loginpage');
// console.log(username)

    return (
        <nav style={{ color:'white', backgroundColor:'orange', margin:'0px',padding:'1px'}}>
          <button onClick={Home} style={{textDecoration:'none'}}>Home</button>
           <button onClick={handle} style={{textDecoration:'none'}}>{buttonText}</button> 
           {username?<button onClick={handleLogout} style={{textDecoration:'none'}}>Logout</button>:''}     
        {/* <ul style={{listStyleType:'none', display:'flex', justifyContent:'space-around'}}>
            <li onClick={Home}><button  style={{textDecoration:'none'}}>Home</button></li>
            <li><button onClick={handle} style={{textDecoration:'none'}}>{buttonText}</button></li>
        </ul> */}
        </nav>
        
    );
}
