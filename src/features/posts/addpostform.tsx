import { selectAllUsers } from '../users/userSlice.ts'
import { postAdded } from './postSlice.ts'
import { useAppDispatch,useAppSelector } from '../../app/hooks.ts'
import React from 'react';
// omit other imports and form types

interface AddPostFormElements extends HTMLFormControlsCollection {
  postTitle: HTMLInputElement;
  postContent: HTMLTextAreaElement;
  postAuthor: HTMLSelectElement;
}

const AddPostForm = () => {
  const dispatch = useAppDispatch()
  const users = useAppSelector(selectAllUsers)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // Prevent server submission
    e.preventDefault()

    const { elements } = e.currentTarget as unknown as HTMLFormElement
    const { postTitle, postContent, postAuthor } = elements as AddPostFormElements
    const title = postTitle.value;
    const content = postContent.value;
    const userId = postAuthor.value;

    dispatch(postAdded(title, content, userId));
    const form = document.getElementById('myForm') as HTMLFormElement | null;
    if (form) {
      form.reset();
    }

    // (e.currentTarget as HTMLFormElement).reset()
  }

//   const usersOptions = users.map(user => (
//     <option key={user.id} value={user.id}>
//       {user.name}
//     </option>
//   ))

  return (
    <section>
      <h2>Add a New Post</h2>
      <form id='myForm' onSubmit={handleSubmit}>
        <label htmlFor="postTitle">Post Title:</label>
        <input type="text" id="postTitle" defaultValue="" required />
        <label htmlFor="postAuthor">Author:</label>
        <select id="postAuthor" name="postAuthor" required>
          <option value=""></option>
          {usersOptions}
        </select>
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          defaultValue=""
          required
        />
        <button>Save Post</button>
      </form>
    </section>
  )
}