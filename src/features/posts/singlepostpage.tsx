import { useParams } from 'react-router-dom'

import { useAppSelector } from '../../app/hooks.ts'
import React from 'react'

export const SinglePostPage = () => {
//   const { postId } = useParams()
//   const params = useParams(); // This will get the post ID from the URL

//  const formState = useAppSelector((state) => state.posts);
//   const post = formState.posts.find((p) => p.id === postId);
const { id } = useParams();
const formState = useAppSelector((state) => state.posts);

console.log('1',id)
if (!formState.posts) {
  return (
    <section>
      <h2>id not found!</h2>
    </section>
  );
}

const post = formState.posts.find((p) => (p.id) === id);  // Find the specific post by ID
console.log('2',post)
if (!post) {
  return (
    <section>
      <h2>Post not found!</h2>
    </section>
  );
}

 
  
// console.log('2',post)
  // if (!post) {
  //   return (
  //     <section>
  //       <h2>Post not found!</h2>
  //     </section>
  //   )
  // }
// else{
  return (
    <section className='single-post'>
      
       <article className="form1" key={post.id}>
    
    <img src={post.image} alt="Uploaded" style={{ width: '80%', height: '30%', borderRadius:'5px', position:'relative', paddingLeft:'10%' }} />
              
    
              <h1>{post.title}</h1>
              <p >{post.content}</p>
             
            </article>

      
    </section>
  )
}
