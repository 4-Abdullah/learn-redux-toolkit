import { nanoid } from '@reduxjs/toolkit';
export const initialState = {
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
  