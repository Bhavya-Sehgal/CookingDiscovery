import axios from "axios";
import React, { useContext, useState } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { Context } from "../../Context/Context";
import user_icon from "../../Images/user_icon.webp";
import { mainUrl } from "../../config";

function Settings() {
  const { user, token, dispatch } = useContext(Context);
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  // const userRef = useRef();
  // const passwordRef = useRef();
  // const { dispatch } = useContext(Context);

  // const PF = "http://localhost:3001/images/";
  const PF = `${mainUrl}/images/`;

  const handleDelete = async () => {
    // console.log(token);
    try {
      await axios.delete(
        `${mainUrl}/api/users/`,
        // {
        //   data: { username: user._id },
        // },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({
        type: "LOGOUT",
      });
      window.location.replace("/register");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      // userId: user._id,
      username,
      email,
      password,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePicture = filename;
      try {
        await axios.post(`${mainUrl}/api/upload`, data);
      } catch (error) {
        console.log(error);
      }
    }
    try {
      const res = await axios.put(`${mainUrl}/api/users/`, updatedUser, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      // console.log(res);
      setSuccess(true);
      dispatch({
        type: "UPDATE_SUCCESS",
        payload: res.data,
        token: token,
      });
    } catch (error) {
      dispatch({ type: "UPDATE_FAILURE" });
      console.log(error);
    }
  };
  return (
    <div className="flex">
      <div className="flex-[9] p-5 md:p-10 lg:py-20 lg:px-14 mt-10 xs:mt-0 mb-10 min-h-[80vh] ">
        <div className="flex items-center justify-between">
          <span className="font-bold text-sm md:text-lg xl:text-2xl tracking-widest text-[teal]">
            Update Your Account
          </span>
          <span
            onClick={handleDelete}
            className="text-sm xl:text-xl cursor-pointer tracking-widest text-white bg-[tomato] bg-gray-400 p-2 xl:p-4 rounded-xl sm:rounded-2xl"
          >
            Delete
          </span>
        </div>
        <form
          className="flex flex-col xl:w-2/3 mt-4 mx-auto border-4 px-5 xs:px-10 border-gray-400 shadow-2xl pt-2 pb-5"
          onSubmit={handleSubmit}
        >
          <div className="flex">
            <label className="mt-10 text-lg lg:text-xl tracking-widest font-semibold">
              Profile Picture
            </label>
            <label className="mt-10 text-lg lg:text-xl" htmlFor="fileInput">
              <i className="w-[25px] h-[25px] rounded-xl flex items-center justify-center ml-5 cursor-pointer fa-solid fa-up-right-from-square"></i>
            </label>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <div className="flex items-center justify-center m-5 xl:m-10">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : user.profilePicture
                  ? PF + user.profilePicture
                  : user_icon
              }
              alt=""
              className="xs:w-[200px] xs:h-[200px] object-cover rounded-2xl"
            />
          </div>
          <label className="mt-4 text-lg lg:text-xl tracking-widest">
            Username
          </label>
          <input
            className="focus:outline-gray-400 px-2 my-2 border-none text-gray-600 h-[30px] rounded-lg border-white"
            type="text"
            value={username}
            // placeholder={user.username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label className="mt-4 text-lg lg:text-xl tracking-widest">
            Email
          </label>
          <input
            className="focus:outline-gray-400 px-2 my-2 border-none text-gray-600 h-[30px] rounded-lg border-white"
            type="email"
            value={email}
            // placeholder={user.email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="mt-4 text-lg lg:text-xl tracking-widest">
            Password
          </label>
          <input
            className="focus:outline-gray-400 px-2 my-2 border-none text-gray-600 h-[30px] rounded-lg border-white"
            type="password"
            required
            placeholder="Enter new password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="cursor-pointer my-2 rounded-xl bg-[teal] w-[150px] p-4 mx-auto text-lg text-white"
            type="submit"
          >
            Update
          </button>
          {success && (
            <span style={{ color: "green" }}>Profile has been updated</span>
          )}
        </form>
      </div>
      <Sidebar />
    </div>
  );
}

export default Settings;
