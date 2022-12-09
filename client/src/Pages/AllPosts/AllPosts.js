import React, { useEffect, useState } from "react";
import Posts from "../../Components/Posts/Posts";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { mainUrl } from "../../config";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  // const val = useLocation();
  // console.log(val);
  const { search } = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`${mainUrl}/api/posts/allPosts` + search);
        // console.log(res);
        setPosts(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPosts();
  }, [search]);

  console.log(posts);
  return (
    <div>
      <Posts posts={posts} fullwidth={true} />
    </div>
  );
}

export default AllPosts;
