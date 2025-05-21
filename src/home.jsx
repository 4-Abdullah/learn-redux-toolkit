import logo from './logo.svg';
import './App.css';
import React, {useEffect} from "react";
import { Link, useSearchParams } from 'react-router-dom';
import { submitForm, setFormField, removePost, setPosts } from './features/posts/postSlice.ts';
// import { useSelector, useDispatch } from 'react-redux'
import { useAppDispatch,useAppSelector } from './app/hooks.ts';
import { setImage } from './features/posts/postSlice.ts';
import edit01 from './images/edit01.png';
import remove02 from './images/remove02.jpg';
import { TimeAgo } from './features/Timeago';
import { parseISO, formatDistanceToNow } from 'date-fns'
import { ReactionButton, ReactionButtons } from './features/posts/Reactionbutton.tsx';

const Home = () => {
  const dispatch = useAppDispatch();
  const formState = useAppSelector((state) => state.posts);
  // const userState = useAppSelector((state) => state.users);
    // const users = useAppSelector(selectAllUsers)
  const [searchParams] = useSearchParams();
  const username = searchParams.get('username');
  // const post = formState.posts.find((p) => p.id === id);
  const handleInput = (e) => {
    dispatch(setFormField({ name: e.target.name, value: e.target.value }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const newstate = {
      // id: post.id,
      title: formState.form.title,
      user: username,
      content: formState.form.content,
      image:formState.form.image,}
    dispatch(submitForm(newstate));
    // default form reset
    (document.getElementById('myForm')).reset();

    // custom form reset
    // const form = document.getElementById('myForm');
    // form.elements['id'].value = '';
    // form.elements['title'].value = '';
    // form.elements['content'].value = '';

    // Loop form reset
    // If you have many fields, you can loop through them and reset their values.
    // const form = document.getElementById('myForm');
    // Array.from(form.elements).forEach(element => {
    //   if (element.type !== 'submit') {
    //     element.value = '';
    //   }
    // });
  };
  const getId = (postid) => {
    console.log('Postid', postid);
  }
 
  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      dispatch(setImage(reader.result)); // Store Base64 image in Redux
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

//   return (
//     <div>
//       <input type="file" accept="image/*" onChange={handleImageChange} />
//       {formState.image && (
//         <div>
//           <p>Preview:</p>
//           <img src={formState.image} alt="Uploaded" style={{ width: 200, height: 200 }} />
//         </div>
//       )}
//     </div>
//   );
// };

  // import React from 'react'
  
  // interface TimeAgoProps {
  //   timestamp: string
  // }
  
 
  // export default ImageUpload;

  const deletePost = (e) => {
    e.preventDefault();
    const updatedPost = {
      id: post.id,
    };
    dispatch(removePost(updatedPost));
  }

 const fetchPosts = async () => {
        try {
          const response = await fetch("http://localhost:3500/posts");
          if (!response.ok) {
            throw new Error("Failed to fetch posts");
          }
          const data = await response.json();
          dispatch(setPosts(data)); // Update posts in Redux state
        } catch (err) {
          console.error("Error fetching posts:", err);
        }
      };
    // Fetch posts from server
    useEffect(() => {
     
  
      fetchPosts();
    }, [dispatch]);

  // const orderedPosts = formState.posts.slice().sort((a, b) => b.date.localeCompare(a.date))
  const filterPosts = formState.posts.filter(post => post.user !=username)
  const orderedPosts = filterPosts.slice().sort((a, b) => b.date.localeCompare(a.date))
  const renderedPosts = orderedPosts.map((post) => (
        
      <article className="post-excerpt" key={post.id}>
        <div style={{ textAlign: 'left' }}>{post.title}</div>
        <div style={{display:'flex', flexDirection:'row', color:'#333'}}><div>{post.user}</div><div><TimeAgo timestamp={post.date} /></div></div><br/>
        
        <Link  to={username?`/SinglePostPage/${post.id}?username=${username}`:`/SinglePostPage/${post.id}`} onClick={() => getId(post.id)}>
        <img src={post.image} alt="Uploaded" style={{ width: '50%', height: '50%', padding:'1%' }} />
        </Link>   
    <p>{post.content}</p>
        
         {/* <ReactionButtons post={post} /> */}
         
      </article>
     
  ))
  // const usersOptions = users.map(user => (
  //   <option key={user.id} value={user.id}>
  //     {user.name}
  //   </option>
  // ))
  return (
    <div className="App">
           <header className="App-header">
            
             <main>
              <h1  style={{backgroundColor:'purple', margin:'0px' , width:'100%',fontSize:'xx-large'}}>React Redux Toolkit</h1> 
    
    <h2 style={{ textAlign: 'left' }}>Posts for you</h2>
    <div className='post'>
    
    {renderedPosts}
    </div>
    </main>
  </header>
  
  </div>
  );
};

export default Home;
