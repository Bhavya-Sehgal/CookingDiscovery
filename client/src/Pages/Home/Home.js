import React, { useEffect, useState } from "react";
import Header from "../../Components/Header/Header";
import Posts from "../../Components/Posts/Posts";
import Sidebar from "../../Components/Sidebar/Sidebar";
import axios from "axios";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("/api/posts/");
      setPosts(res.data);
    };
    fetchPosts();
  }, []);
  return (
    <div>
      <Header />
      <div className="flex mx-auto">
        <Posts posts={posts} />
        <Sidebar />
      </div>
    </div>
  );
}

export default Home;
