import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import bg_img from "../../Images/register_bg.webp";
import { mainUrl } from "../../config";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const res = await axios.post(`${mainUrl}/api/auth/register`, {
        username,
        email,
        password,
      });

      res.data && window.location.replace("/api/login");
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };

  return (
    <div
      className="changeScreen flex flex-col items-center justify-center opacity-80 bg-no-repeat bg-cover "
      style={{
        backgroundImage: `url(${bg_img})`,
      }}
    >
      {error && alert("Something went Wrong!")}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col bg-gray-200 shadow-gray-700 shadow-2xl sm:w-[450px] px-10 py-8"
      >
        <span className="text-4xl tracking-widest pb-4 font-semibold">
          REGISTER
        </span>
        <label className="my-3">Username</label>
        <input
          required
          type="text"
          className="border-none bg-white p-2 focus:outline-none"
          placeholder="Enter your Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <label className="my-3">Email</label>
        <input
          required
          type="email"
          className="border-none bg-white p-2 focus:outline-none"
          placeholder="Enter your Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className="my-3">Password</label>
        <input
          required
          type="password"
          className="border-none bg-white p-2 focus:outline-none"
          placeholder="Enter your Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="text-xl mt-5 cursor-pointer text-white border-none bg-[#151515] p-4 rounded-lg"
        >
          Register
        </button>
      </form>
      <div className="text-white font-3xl mt-4 ">
        Already registered ?{" "}
        <Link to="/login" className="link">
          Login
        </Link>
      </div>
    </div>
  );
}

export default Register;
