import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { postUpdated, setFormField, setImage } from "./postSlice.ts";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import React from "react";

export const EditPostPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
    const username = searchParams.get('username');
  // ✅ Always get the latest state from Redux (fixes stale state issue)
  const formState = useAppSelector((state) => state.posts);
  const post = formState.posts.find((p) => p.id === id);
  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatch(setFormField({ name: e.target.name, value: e.target.value }));
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
   
      event.preventDefault();
      const { files } = event.target;
      if (!files) return;
     const localImageUrl = window.URL.createObjectURL(files[0]);
     
      dispatch(setImage( localImageUrl )); // Update Redux state with the local image URL
    
  };
  
   const onSavePostClicked =async (e: React.FormEvent<HTMLFormElement>) => {
              e.preventDefault();
          
              const updatedPost = {
                  id: post.id,
                  image: formState.form.image?formState.form.image:post.image,
                  title: formState.form.title?formState.form.title:post.title,
                  content: formState.form.content?formState.form.content:post.content,
                  user: username,
                  date: post.date,
                  reactions: post.reactions,
              };
          console.log(updatedPost)
              try {
                  const response = await fetch(`http://localhost:3500/posts/${updatedPost.id}`, {
                      method: "PUT",
                      headers: {
                          "Content-Type": "application/json",
                      },
                      body: JSON.stringify(updatedPost),
                  });

                  if (response.ok) {
                      const savedPost = await response.json();
                      console.log("Post saved to JSON server:", savedPost);
                      dispatch(postUpdated(updatedPost));
                      navigate(`/?username=${username}`);
                  } else {
                      console.error("Failed to save post to the server:", response.statusText);
                  }
              } catch (err) {
                  console.error("Error while saving post:", err);
              }
          };

//   const onSavePostClicked = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     // ✅ Always get the latest Redux state to ensure image updates
//     const updatedPost = {
//       id: post.id,
//       title: post.title,
//       content: post.content,
//       image:formState.form.image, // 🔹 Get latest image or default to empty string
//     };
// // console.log(updatedPost)
//     dispatch(postUpdated(updatedPost));
//     navigate(`/`);
//   };

  return (
    <div className="App">
      <header className="App-header">
        <main>
          <h1 style={{ backgroundColor: "purple", margin: "0px", width: "99vw", fontSize: "xx-large" }}>
            React Redux Toolkit
          </h1>
          <form id="myForm" className="form" onSubmit={onSavePostClicked}>
            <h1>Post</h1>
            <div>
              <label>Image:</label>
              <div>
                <input type="file" accept="image/*" onChange={handleImageChange} />
                {(formState.form.image || post.image)  && ( // ✅ Always get the latest image
                  <div>
                    <p>Preview:</p>
                    <img
                      src={formState.form.image || post.image}
                      alt="Uploaded"
                      style={{ width: 200, height: 200 }}
                    />
                  </div>
                )}
              </div>
            </div>
            <div>
              <label>Title:</label>
              <input type="text" required name="title" defaultValue={post.title} onChange={handleInput} />
            </div>
            <div style={{ paddingTop: "10px" }}>
              <label>Content:</label>
              <br />
              <textarea required name="content" defaultValue={post.content} onChange={handleInput} />
            </div>
            <button type="submit">Update Post</button>
          </form>
        </main>
      </header>
    </div>
  );
};
