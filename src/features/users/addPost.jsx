// import logo from './logo.svg';
import '../../App.css';
import React from "react";
import { Link, useSearchParams } from 'react-router-dom';
import { submitForm, setFormField, removePost } from '../posts/postSlice.ts';
// import { useSelector, useDispatch } from 'react-redux'
import { useAppDispatch,useAppSelector } from '../../app/hooks.ts';
import { setImage } from '../posts/postSlice.ts';
// import edit01 from './images/edit01.png';
// import remove02 from './images/remove02.jpg';
// import { TimeAgo } from './features/Timeago';
// import { parseISO, formatDistanceToNow } from 'date-fns'
// import { ReactionButton, ReactionButtons } from './features/posts/Reactionbutton.tsx';


const AddPost = () => {

      const dispatch = useAppDispatch();
      const formState = useAppSelector((state) => state.posts);
      const [searchParams] = useSearchParams()
      const user = searchParams.get('username')
      const handleInput = (e) => {
            dispatch(setFormField({ name: e.target.name, value: e.target.value }));
          };

          const handleSubmit = async (e) => {
            e.preventDefault();
        
            const newPost = {
                id: formState.form.id,
                image: formState.form.image,
                title: formState.form.title,
                content: formState.form.content,
                user: user,
                date: formState.form.date,
                reactions: formState.form.reactions,
            };
        
            try {
                const response = await fetch("http://localhost:3500/posts", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newPost),
                });
        
                if (response.ok) {
                    const savedPost = await response.json();
                    console.log("Post saved to JSON server:", savedPost);
                    dispatch(submitForm(newPost)); // Dispatch Redux action if necessary
                    document.getElementById("myForm").reset(); // Reset the form
                } else {
                    console.error("Failed to save post to the server:", response.statusText);
                }
            } catch (err) {
                console.error("Error while saving post:", err);
            }
        };
        
    //  const handleSubmit = (e) => {
    //     e.preventDefault();
    //     const newstate = {
    //           id: formState.form.id,
    //           image:formState.form.image,
    //           title: formState.form.title,
    //           content: formState.form.content,
    //           user: user,
    //           date: formState.form.date,
    //           reactions: formState.form.reactions
    //           }
    //         dispatch(submitForm(newstate));
        // default form reset
        // (document.getElementById('myForm')).reset();
    
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
      // };

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

    return(
            <form id='myForm' className='form' onSubmit={handleSubmit}>
                <h1>Post</h1>
                <div>
                    <label>Image:</label>
                    <div>
                        <input type="file" accept="image/*" onChange={handleImageChange} />
                        {(formState.form.image || formState.posts.image) && (
                            <div>
                                <p>Preview:</p>
                                <img src={formState.form.image} alt="Uploaded" style={{ width: 200, height: 200 }} />
                            </div>
                        )}
                    </div>
                </div>
                {/* <label htmlFor="postAuthor">Author:</label>
                <input type="text" required  name="user" id='User' value={formState.user} onChange={handleInput} /> */}
                <div>
                <label>Title:</label>
                <br/>
                <input type="text" required  name="title" id='Title' value={formState.title} onChange={handleInput} />
                </div>
                {/* <br/> */}
                <div style={{paddingTop:'10px'}} >
                <label>Content:</label>
                <br/>
                <textarea type="text" required  name="content" id='Content' value={formState.content} onChange={handleInput} />
                </div>
                <button type="submit"  >Create Post</button>
        </form>  
)  
}

export default AddPost