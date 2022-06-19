import React from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import SinglePost from "../../Components/SinglePost/SinglePost";

function Single() {
  return (
    <div className="flex">
      <SinglePost />
      <Sidebar />
    </div>
  );
}

export default Single;
