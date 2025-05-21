import React from 'react'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../app/hooks.ts'
// import { selectAllUsers } from '../features/users/userSlice'

// import { userLoggedIn } from './auth/authslice.ts'
import { setFormField,userLoggedIn } from './posts/postSlice.ts'

interface LoginPageFormFields extends HTMLFormControlsCollection {
  [x: string]: any
  username: HTMLSelectElement
}
interface LoginPageFormElements extends HTMLFormElement {
  readonly elements: LoginPageFormFields
}

export const LoginPage = () => {
  const dispatch = useAppDispatch()
  // const users = useAppSelector(selectAllUsers)
  const navigate = useNavigate()
  const formstate = useAppSelector((state) => state.posts);
  // const post = formState.posts.find((p) => (p.id) === id);  // Find the specific post by ID
// console.log('2',post)
  interface HandleInputEvent extends React.ChangeEvent<HTMLInputElement> {}

  const handleInput = (e: HandleInputEvent) => {
    dispatch(setFormField({ name: e.target.name, value: e.target.value }));
  };
  
  const handleSubmit = async (e: React.FormEvent<LoginPageFormElements>) => {
              e.preventDefault();
          
              // const username = e.currentTarget.elements.user.value
              const username = formstate.form.user
              console.log(username)
              const existingUser = formstate.users.find(user => user.username === username);

              if (existingUser) {
                  dispatch(userLoggedIn({ username }));
                  console.log('a');
                  navigate(`/?username=${username}`);
              } else {
                  try {
                      const response = await fetch("http://localhost:3500/users", {
                          method: "POST",
                          headers: {
                              "Content-Type": "application/json",
                          },
                          body: JSON.stringify({ username }),
                      });
              
                      if (response.ok) {
                          const savedUser = await response.json();
                          console.log("Post saved to JSON server:", savedUser);
                          console.log('b');
              
                          dispatch(userLoggedIn({ username })); // Dispatch after saving
                          navigate(`/?username=${username}`);
                      } else {
                          console.error("Failed to save post to the server:", response.statusText);
                      }
                  } catch (err) {
                      console.error("Error while saving post:", err);
                  }
              }
              
          };

  // const handleSubmit = (e: React.FormEvent<LoginPageFormElements>) => {
  //   e.preventDefault()

  //   const username = e.currentTarget.elements.user.value
  //   console.log(username)
  //   dispatch(userLoggedIn(username))
  //   navigate(`/?username=${username}`)
  //   // const destination = `/?username=${user.identifier}`
  //   //             router.push(destination)
  // }

  // const usersOptions = users.map(user => (
  //   <option key={user.id} value={user.id}>
  //     {user.name}
  //   </option>
  // ))

  return (
    <section>
      {/* <h2>Welcome to Tweeter!</h2> */}
      <h3>Please log in:</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">User:</label>
      <input type="text" required  name="user" id='User' value={formstate.form.user} onChange={handleInput} />

        {/* <input type='text'  name='username' /> */}
        {/* <label htmlFor="password" >Password:</label>
      <input type="password" required  name="password" id='password' value={formState.password} onChange={handleInput} /> */}

        {/* <input type='password'/> */}
        {/* <select id="username" name="username" required>
          <option value=""></option>
          {usersOptions}
        </select> */}
        <button>Log In</button>
      </form>
    </section>
  )
}
