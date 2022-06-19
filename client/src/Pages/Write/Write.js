import React, { useContext, useState } from "react";
import axios from "axios";
import { Context } from "../../Context/Context";
import { AiOutlineClose } from "react-icons/ai";

function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [file, setFile] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [ingredient, setIngredient] = useState("");
  const [step, setStep] = useState("");
  const [directions, setDirections] = useState([]);
  const { user, token } = useContext(Context);

  console.log("Bearer " + token);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc,
      cuisine,
      ingredients,
      directions,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axios.post("/api/upload", data);
      } catch (error) {
        console.log(error);
      }
    }
    try {
      const res = await axios.post("/api/posts", newPost, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      // console.log("authorization: " + res.headers.authorization);
      window.location.replace("/post/" + res.data._id);
    } catch (error) {
      console.log(error);
    }

    // try {
    //   console.log("helloooo");
    //   console.log(newPost.cuisine);
    //   const data = await axios.post("/cuisine", newPost.cuisine);
    //   console.log(data);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <div className="p-5 sm:p-10 lg:p-20">
      <div className="text-2xl mx-auto font-mono lg:-mt-10 p-3 tracking-widest font-bold">
        Create New Post
      </div>
      <div>
        <div className="flex justify-center">
          {file && (
            <img
              className="object-cover h-[300px] lg:h-[400px] rounded-2xl"
              src={URL.createObjectURL(file)}
              alt=""
            />
          )}
          {/* {!file && (
            <img
              className="object-cover h-[300px] lg:h-[400px] rounded-2xl"
              src="https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=60"
              alt=""
            />
          )} */}
        </div>

        <div className="mt-5 xl:px-10">
          <form className="xs:px-5 py-10" onSubmit={handleSubmit}>
            <div className="flex justify-center">
              <label htmlFor="fileInput" className="m-auto">
                <i className="text-3xl text-gray-600 cursor-pointer fa-solid fa-plus"></i>
              </label>
              <input
                required
                type="file"
                id="fileInput"
                style={{ display: "none" }}
                onChange={(e) => setFile(e.target.files[0])}
              />
              <input
                required
                type="text"
                placeholder="Enter title"
                className="lg:text-xl py-5 lg:py-8 mb-2 lg:mb-4 ml-2 mt-4 border w-full border-none focus:outline-none"
                autoFocus={true}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className=" flex justify-center">
              <textarea
                required
                placeholder="Enter description for your post"
                type="text"
                className="xs:text-lg lg:text-xl pt-4 pb-5 lg:pb-8 border w-full border-none focus:outline-none"
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>
            <div className="my-3 flex flex-wrap">
              {ingredients &&
                ingredients.map((i) => (
                  <span className="mr-4 my-2">
                    <div className="bg-gray-200 text-sm xs:text-base p-2 xs:px-3 xs:py-4 rounded-xl flex">
                      {i}
                      <span
                        onClick={(e) => {
                          let x = ingredients.filter((y) => y !== i);
                          setIngredients(x);
                        }}
                        className="ml-2 bg-gray-400 text-white rounded-2xl p-1"
                      >
                        <AiOutlineClose className="text-sm" />
                      </span>
                    </div>
                  </span>
                ))}
            </div>
            <div className="xs:flex xs:text-lg lg:text-xl py-5 lg:py-10 mb-2 lg:mb-5">
              <div className="xs:w-2/3">
                <input
                  required={ingredients.length > 1 ? false : true}
                  value={ingredient}
                  type="text"
                  placeholder="Add Ingredients"
                  className="border w-full border-none focus:outline-none"
                  autoFocus={true}
                  onChange={(e) => setIngredient(e.target.value)}
                />
              </div>
              <div className="xs:w-1/3 text-right">
                <button
                  className="bg-[#222] mt-5 xs:mt-0 text-white p-2 md:p-3 lg:px-6 lg:py-3 rounded-2xl"
                  onClick={(e) => {
                    setIngredients((prev) => [...prev, ingredient]);
                    setIngredient("");
                  }}
                >
                  ADD
                </button>
              </div>
            </div>
            <div className="my-3 flex flex-wrap">
              {directions &&
                directions.map((s) => (
                  <span className="mr-4 my-2">
                    <div className="bg-gray-200 text-sm xs:text-base p-2 xs:px-3 xs:py-4 rounded-xl flex">
                      <span
                        className="text-ellipsis overflow-hidden"
                        style={{
                          display: "-webkit-box",
                          "-webkit-line-clamp": "1",
                          "-webkit-box-orient": "vertical",
                        }}
                      >
                        {s}
                      </span>
                      <span
                        onClick={(e) => {
                          let z = directions.filter((y) => y !== s);
                          setDirections(z);
                        }}
                        className="ml-2 bg-gray-400 text-white rounded-2xl p-1"
                      >
                        <AiOutlineClose className="text-sm" />
                      </span>
                    </div>
                  </span>
                ))}
            </div>
            <div className="xs:flex xs:text-lg lg:text-xl py-5 lg:py-10 mb-2 lg:mb-5">
              <div className="xs:w-2/3">
                <input
                  required={directions.length > 1 ? false : true}
                  value={step}
                  type="text"
                  placeholder="Directions / Steps to be followed"
                  className="border w-full border-none focus:outline-none"
                  autoFocus={true}
                  onChange={(e) => setStep(e.target.value)}
                />
              </div>
              <div className="xs:w-1/3 text-right">
                <button
                  className="bg-[#222] mt-5 xs:mt-0 text-white p-2 md:p-3 lg:px-6 lg:py-3 rounded-2xl"
                  onClick={(e) => {
                    setDirections((prev) => [...prev, step]);
                    setStep("");
                  }}
                >
                  Next Step
                </button>
              </div>
            </div>
            <div className=" flex justify-center">
              <input
                required
                placeholder="Enter cuisine for your post"
                type="text"
                className="xs:text-lg lg:text-xl pt-4 pb-5 lg:pb-8 border w-full border-none focus:outline-none"
                onChange={(e) =>
                  setCuisine(
                    e.target.value.charAt(0).toUpperCase() +
                      e.target.value.slice(1)
                  )
                }
              />
            </div>
            <div className="flex justify-start py-5 lg:py-10">
              <button
                type="submit"
                className="bg-[teal] px-6 lg:px-8 py-4 cursor-pointer border-none text-gray-100 text-lg lg:text-xl rounded-2xl"
              >
                Publish
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Write;
