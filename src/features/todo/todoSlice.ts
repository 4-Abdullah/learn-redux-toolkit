import { createSlice } from '@reduxjs/toolkit';
// import {initialState } from '../../initialState';
import { nanoid } from '@reduxjs/toolkit';
 const initialState = {
  posts: [
    { id: '1', title: 'First Post!', content: 'Hello!' },
    { id: '2', title: 'Second Post', content: 'More text' }
  ],
  form: {
    id: nanoid(),
    title: '',
    content: '  '
  }
};

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    submitForm: (state,action) => {
         
        // const { title, content } = action.payload.form;
  
        // Check if the content and title are unique
        // const isUnique = !state.posts.some(post => post.title === title && post.content === content);
  
        // if (isUnique) {
          state.posts.push(action.payload.form);
        
    
    // Reset form state after submission
      state.form = { id: nanoid(), title: '', content: '' }; 
      
    },
    setFormField: (state, action) => {
      state.form[action.payload.name] = action.payload.value;
    }
  }
});

export const { submitForm, setFormField } = postSlice.actions;
export default postSlice.reducer;

