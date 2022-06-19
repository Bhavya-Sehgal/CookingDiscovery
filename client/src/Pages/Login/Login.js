import axios from "axios";
import React, { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../Context/Context";
import bg_img from "../../Images/login_bg.jpg";

function Login() {
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });

    // console.log(userRef.current.value);
    // console.log(passwordRef.current.value);
    try {
      const res = await axios.post("/api/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: res.data.data,
        token: res.data.token,
      });
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE" });
      console.log(error);
    }
  };

  // console.log(user);

  return (
    <div
      className="changeScreen flex flex-col items-center justify-center opacity-90 bg-center bg-no-repeat bg-cover "
      style={{
        backgroundImage: `url(${bg_img})`,
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="flex flex-col bg-gray-200 shadow-gray-700 shadow-2xl sm:w-[450px] p-10"
      >
        <span className="text-4xl tracking-widest pb-4 font-semibold">
          LOGIN
        </span>
        <label className="my-3">Username:</label>
        <input
          required
          type="text"
          className="border-none bg-white p-2 focus:outline-none"
          placeholder="Enter your Username"
          ref={userRef}
        />
        <label className="my-3">Password:</label>
        <input
          required
          type="password"
          className="border-none bg-white p-2 focus:outline-none"
          placeholder="Enter your Password"
          ref={passwordRef}
        />
        <button
          type="submit"
          className="text-xl mt-5 cursor-pointer text-white border-none bg-[#151515] p-4 rounded-lg disabled:cursor-not-allowed disabled:bg-gray-600"
          disabled={isFetching}
        >
          Login
        </button>
        <hr className="mt-5 h-[0.1rem] bg-gray-400" />
        <div className="text-black font-3xl mt-4 text-center ">
          Not Registered ?{" "}
          <Link to="/register" className="link">
            Register
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
