import { Link, useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAppDispatch,useAppSelector } from '../../app/hooks.ts';
import { removePost } from "../posts/postSlice.ts";
import { TimeAgo } from "../Timeago";
import { useEffect, useRef, useState } from "react";
import { ReactionButtons } from "../posts/Reactionbutton.tsx";
import edit01 from '../../images/edit01.png';
import remove02 from '../../images/remove02.jpg';
import colorNames from "colornames";

const UserProfile = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams()
    const username = searchParams.get('username')
    const [showPosts, setShowPosts] = useState(true); // State to toggle posts
    const [colorValue, setcolorValue] = useState(''); // State to toggle posts
    const [hexValue, sethexValue] = useState(''); // State to toggle posts
    const [isDarkText, setDarkText] = useState(true)
var postId;
      const dispatch = useAppDispatch();
      const formState = useAppSelector((state) => state.posts);
    //   const post = formState.posts.find((p) => p.id === postId);

    const [isnumber, setnumber] = useState(false)
    const [ischaracter, setcharacter] = useState(false)
    // const [iscopy, setcopy] = useState('')
    const [pwdValue, setpwdValue] = useState('')
    const [pwdlength, setpwdlength] = useState('12')

    const pwdRef = useRef(null)
    
    const copypwd = () => {
        if(pwdRef.current){
            pwdRef.current.select()
            // pwdRef.current.setSelectionRange(0,20)    
            window.navigator.clipboard.writeText(pwdValue)
        }
    }

    const gotomyPost = () => {
        // setShowform(false)
        setShowPosts(true); // Show posts when button is clicked
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
    };
    
   
    const gotoaddPost =(e)=>{
        // setShowform(true)
        setShowPosts(false); // Show posts when button is clicked
        if(username!=null){
            const destination=`/userProfile/createPost?username=${username}`
            navigate(destination)
            return destination
        }
        else{
            const destination= `/Loginpage`
            navigate(destination) 
            return destination
        }
      }

      const getId = (postid) => {
        postId = postid
        console.log('Postid', postid);
      }



     const deletePost =async(e)  => {
                  e.preventDefault();
              
                  const updatedPost = {
                      id: postId,
                  };
              console.log(updatedPost)
                  try {
                      const response = await fetch(`http://localhost:3500/posts/${updatedPost.id}`, {
                          method: "DELETE",
                          headers: {
                              "Content-Type": "application/json",
                          },
                          body: JSON.stringify(updatedPost),
                      });
    
                      if (response.ok) {
                          const savedPost = await response.json();
                          console.log("Post saved to JSON server:", savedPost);
                          dispatch(removePost({id:updatedPost.id}));
                          navigate(`/userProfile?username=${username}`);
                      } else {
                          console.error("Failed to save post to the server:", response.statusText);
                      }
                  } catch (err) {
                      console.error("Error while saving post:", err);
                  }
              };

          const orderedPosts = formState.posts.filter(post => post.user === username)
          const renderedPosts = orderedPosts.map((post) => (
                
              <article className="post-excerpt" style={{background:`${colorValue}`}} key={post.id}>
            {/* <Link className='rm-underline'  to={`/SinglePostPage/${post.id}`} onClick={() => getId(post.id)}> */}
            
                <div style={{ textAlign: 'left' }}>{post.title}</div>
                <div style={{display:'flex', flexDirection:'row', color:'#333'}}><div>{post.user}</div><div><TimeAgo timestamp={post.date} /></div></div><br/>
                
                <Link  to={`/SinglePostPage/${post.id}?username=${username}`} >
                <img src={post.image} alt="Uploaded" style={{ width: '50%', height: '50%', padding:'1%' }} />
                </Link> 
        
                <Link   to={`/EditPostPage/${post.id}?username=${username}`} >
                <img src={edit01} alt="Uploaded" style={{ width: '50px', height: '50px', position:'relative', padding:'1%' }} />
                </Link>
                {/* <Link  onClick={()=>{dispatch(removePost({id: post.id}))}}> */}
            <button onClick={deletePost} onClickCapture={() => getId(post.id)}>  
                <img  src={remove02} alt="Uploaded" style={{ width: '50px', height: '50px', position:'relative', padding:'1%',borderRadius:'50px' }} />
                </button>
                {/* </Link> */}
                
                
                {/* <ReactionButtons post={post} />
                <TimeAgo timestamp={post.date} /> */}
        <p>{post.content}</p>
                {/* <button className="button" >Edit</button>
                 <button className="button" >Delete</button> */}
                 {/* <ReactionButtons post={post} /> */}
                 
              </article>
             
          ))
        //   0123456789!@#$%^&*()
          function generatePassword(length) {
            let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
            let password = '';
            if(isnumber){  chars += '0123456789' }
            if(ischaracter){chars += '!@#$%^&*()'}
           
            for (let i = 0; i < length; i++) {
                password += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            setpwdValue(password)
            return password;
        }
        
useEffect(()=>{
        
    // length = generatePassword(pwdlength)
        console.log(generatePassword(pwdlength));
},[pwdlength,isnumber,ischaracter])
           // 12-character random password
        
return(
    
        <div style={{margin: '10px'}}>
            <h1 style={{background:`${colorValue}`}}>{username}</h1>
        <label><b>BackgroundColor-Changer</b></label><br/>
            <input type="submit" style={{background:`${colorValue}`, color: isDarkText ? "#000" : "#FFF" }}  value={colorValue?(hexValue?(`${colorValue} ${hexValue}`):(`${colorValue}`)):"empty"} onChange={(e) =>{setcolorValue(e.target.value); sethexValue(colorNames(e.target.value));}} /><br/>
            <input type="text"  value={colorValue} onChange={(e) =>{setcolorValue(e.target.value); sethexValue(colorNames(e.target.value));}} placeholder="add color name"/> 
            <button onClick={()=> setDarkText(!isDarkText)}>Toggle text color</button><br/>

            <input type="text"  ref={pwdRef}  value={pwdValue} onChange={(e) =>{setpwdValue(e.target.value);}} placeholder="add color name"/>
            <button onClick={copypwd}>copy</button><br/>
            <input type="range"  value={pwdlength} min={12} onChange={(e) =>{setpwdlength(e.target.value);}} placeholder="add color name"/><label>Length({pwdlength})</label><br/> 
            <input type="checkbox" onClick={()=> setnumber(!isnumber)}  /><label>Numbers</label><br/>
            <input type="checkbox" onClick={()=> setcharacter(!ischaracter)}  /><label>Characters</label><br/>
            
            <button onClick={gotomyPost}>My Posts</button>
            <button onClick={gotoaddPost}>Create a new Post</button>
            {/* <div className="App-header-Profile"> */}
           {/* <header className="App-header"> */}
            {showPosts && (
             <div className="App-header-Profile"> 

                <div className='post'>
                    {renderedPosts}
                </div>
                </div>
            )}
             {/* </header>   */}
        {/* </div> */}
        
        </div>
)
}

export default UserProfile