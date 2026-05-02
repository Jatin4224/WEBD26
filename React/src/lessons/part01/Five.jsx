// import React, { useEffect } from "react";

// const Five = () => {
//   const [post, sePosts] = useState([]);
//   const [status, setStatus] = useState("idle");
//   const [seconds, setSeconds] = useState(10);

//   useEffect(() => {
//     //jo kaam karwana hain vo idhar likho
//     const timerId = setInterval(() => {
//       setSeconds((current) => Math.max(current - 1, 0));
//     }, 1000);

//     return () => {
//       //cleanup
//       clearInterval(timerId);
//     };

//     //dependency array
//   }, []);

//   useEffect(() => {
//     const controller = new AbortController();

//     async function loadPost() {
//       try {
//         setStatus("loading");
//         const response = await fetch("jsonplaceholeder.typecode.com/posts");
//         const data = await response.json();
//         setPosts(data);
//         setStatus("success");
//       } catch (error) {
//         //todo - setStatus -> error
//       }
//     }
//     loadPost();
//   }, []);

//   //Notes-
//   //run -> on component mount depends on []

//   return (
//     <div className="text-white">
//       <h1>{seconds}</h1>
//     </div>
//   );
// };

// export default Five;

import React, { useEffect, useState } from "react";

const Five = () => {
  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState("idle");
  const [seconds, setSeconds] = useState(10);

  // Timer Effect
  useEffect(() => {
    const timerId = setInterval(() => {
      setSeconds((current) => Math.max(current - 1, 0));
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  // Fetch Posts Effect
  useEffect(() => {
    const controller = new AbortController();

    async function loadPosts() {
      try {
        setStatus("loading");

        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts",
          {
            signal: controller.signal,
          },
        );

        const data = await response.json();

        setPosts(data);
        setStatus("success");
      } catch (error) {
        if (error.name !== "AbortError") {
          setStatus("error");
        }
      }
    }

    loadPosts();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div className="text-white p-4">
      <h1 className="text-3xl font-bold">{seconds}</h1>

      <p>Status: {status}</p>

      {posts.slice(0, 5).map((post) => (
        <div key={post.id} className="border p-2 my-2 rounded">
          <h2 className="font-semibold">{post.title}</h2>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
};

export default Five;
