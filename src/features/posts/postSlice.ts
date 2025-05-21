import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import {initialState } from '../../initialState';
import { nanoid } from '@reduxjs/toolkit';
// import { formatDistanceToNow } from 'date-fns';
import { getMinutes, subMinutes } from 'date-fns'
import reportWebVitals from './../../reportWebVitals';
export interface Reactions {
  thumbsUp: number
  tada: number
  heart: number
  rocket: number
  eyes: number
}
export type ReactionName = keyof Reactions
export interface Post {
  id: string;
  image: string;
  title: string;
  content: string;
  user: string;
  date: string;
  reactions: Reactions;
}

export interface FormState {
  id: string;
  image: string;
  title: string;
  content: string;
  user: string;
  date: string;
  reactions: Reactions;
}

export interface PostsState {
  posts: Post[];
  form: FormState;
  users: object[];
}
  type PostUpdate = Pick<Post, 'id' | 'title' | 'content'>

const initialState: PostsState = {
  posts: [],
  form: {
    id: nanoid(),
    image: '',
    title: '',
    content: '',
    user: '',
    date : new Date().toLocaleString(), 
    reactions: {thumbsUp: 0, tada: 0, heart: 0, rocket: 0, eyes: 0}
  },
  users:[]
};

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    reactionAdded(
      state,
      action: PayloadAction<{ id: string; reaction: ReactionName }>
    ) {
      const { id, reaction } = action.payload
      const existingPost = state.posts.find(post => post.id === id)
      if (existingPost) {
        // Loop through all reactions to reset previously selected ones
        for (const key in existingPost.reactions) {
          if (existingPost.reactions[key] > 0) {
            existingPost.reactions[key] = 0;
          }
        }
    
        // Increment only the selected reaction
        existingPost.reactions[reaction]++;
      }
    },
    userLoggedIn(state, action: PayloadAction<{username:string}>) {
      const { username } = action.payload

      // Check if the content and title are unique
      // const isUnique = !state.posts.some(post => post.title === title && post.content === content);
      // Check if user exists in state.users array based on a unique property (e.g., id)
      const existingUser = state.users.find(
        (user) => user.username.toLowerCase() === username.toLowerCase()
    );
    
    if (!existingUser) {
        state.users.push({ id: nanoid(), username });
        console.log("Updated users:", state.users);
    } else {
        console.log("User already exists:", username);
    }
    
      //   console.log(state.users)
      // state.users.push(username)
      // state.form = { id: nanoid(),image:'', title: '', content: '',user: '',date : getMinutes(new Date()).toLocaleString(),reactions: {thumbsUp: 0, tada: 0, heart: 0, rocket: 0, eyes: 0} }; 
    },
    userLoggedOut(state) {
      state.form.user = ''
    },
    // postAdded: {
    //   reducer(state, action: PayloadAction<Post>) {
    //     state.posts.push(action.payload)
    //   },
    //   prepare(title: string, content: string, image: string, user: string,reactions: {thumbsUp: number, tada: number, heart: number, rocket: number, eyes: number}) { 
    //     return {
    //       payload: { id: nanoid(), title, content, image, user,date: new Date().toLocaleString(), reactions }
    //     }
    //   }
    // },
    setImage: (state, action) => {
      state.form.image = action.payload; // Update image in form
    },
    postUpdated(state, action: PayloadAction<Post>) {
      const { id, title, content, image,user,date,reactions } = action.payload
      const existingPost = state.posts.find(post => post.id === id)
      if (existingPost) {
        existingPost.title = title
        existingPost.content = content
        existingPost.image = image
        existingPost.user = user
        existingPost.date = date
        existingPost.reactions = reactions
      }
      state.form = { id: nanoid(),image:'', title: '', content: '',user: '', date: new Date().toLocaleString(), reactions: {thumbsUp: 0, tada: 0, heart: 0, rocket: 0, eyes: 0} }; 

    },
    removePost: (state,action: PayloadAction<Post>) => {
      const { id } = action.payload
         console.log(id)
      // const { title, content } = action.payload.form;

      // Check if the content and title are unique
      // const isUnique = !state.posts.some(post => post.title === title && post.content === content);
      const existingPost = state.posts.findIndex(post => post.id === id)
      // const indexToRemove = indexOf(existingPost); // Find the index
      // if (indexToRemove !== -1) {
        if (existingPost !== -1) {
          console.log("Post found:", state.posts[existingPost]);
          state.posts.splice(existingPost, 1);
      } else {
          console.log("Post not found.", existingPost);
      }

      // if (isUnique) {
        
        //  }  
  
  // Reset form state after submission
    // state.form = { id: nanoid(),image:'', title: '', content: '',user: '',date: subMinutes(new Date(),0).toLocaleString(),reactions: {thumbsUp: 0, tada: 0, heart: 0, rocket: 0, eyes: 0} }; 
    
  },
  // myposts:(state,action) => {
  //     const getmypost = state.posts.find(post => post.user.name === user);
  //     if(getmypost){
  //       state.users.push(user)
  //       console.log(state.users)
  //     }
  // },

  setPosts(state, action) {
    state.posts = action.payload; // Update the posts array
    
  },

  submitForm: (state,action) => { 
         
        // const { title, content } = action.payload.form;
        state.posts.push(action.payload);
          // console.log(state.posts)
    
    // Reset form state after submission
      state.form = { id: nanoid(),image:'', title: '', content: '',user: '', date: new Date().toLocaleString(), reactions: {thumbsUp: 0, tada: 0, heart: 0, rocket: 0, eyes: 0} }; 
      
    },
    setFormField: (state, action) => {
      state.form[action.payload.name] = action.payload.value;
    }
  }
});
export const { setPosts,removePost, submitForm, setFormField,setImage,postUpdated,postAdded,reactionAdded,userLoggedIn,userLoggedOut } = postSlice.actions;
export default postSlice.reducer;

