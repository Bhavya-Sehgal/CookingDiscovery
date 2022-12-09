import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Context } from "../../Context/Context";
import { AiOutlineClose } from "react-icons/ai";
import { useLocation } from "react-router-dom";
import { mainUrl } from "../../config";

function UpdatePost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  // const [title, setTitle] = useState("");
  // const [desc, setDesc] = useState("");
  // const [cuisine, setCuisine] = useState("");
  const [file, setFile] = useState(null);
  // const [ingredients, setIngredients] = useState([]);
  const [ingredient, setIngredient] = useState("");
  const [step, setStep] = useState("");
  const [error, setError] = useState("");
  // const [directions, setDirections] = useState([]);
  const { user, token } = useContext(Context);

  // const PF = "http://localhost:3001/images/";

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get(`${mainUrl}/api/posts/get/` + path);
      setPost(res.data);
      console.log(res.data);
    };
    getPost();
  }, [path]);

  const handleSubmit = async (e) => {
    if (
      !post ||
      !post.title ||
      !post.desc ||
      !post.cuisine ||
      !post.ingredients ||
      !post.directions ||
      post.ingredients.length === 0 ||
      post.directions.length === 0
    ) {
      setError("Fill all the fields");
      return;
    }
    e.preventDefault();
    const newPost = {
      // username: user.username,
      title: post.title,
      desc: post.desc,
      // photo: post.photo,
      cuisine: post.cuisine,
      ingredients: post.ingredients,
      directions: post.directions,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axios.post(`${mainUrl}/api/upload`, data);
      } catch (error) {
        console.log(error);
      }
    }
    try {
      const res = await axios.put(`${mainUrl}/api/posts/${post._id}`, newPost, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      console.log(res);
      window.location.replace("/post/" + res.data._id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {post && (
        <div className="p-5 sm:p-10 lg:p-20">
          <div className="text-2xl mx-auto font-mono lg:-mt-10 p-3 tracking-widest font-bold">
            Update Post
          </div>
          <div>
            <div className="flex justify-center">
              {file && (
                <img
                  className="object-cover h-[300px] lg:h-[400px] rounded-2xl"
                  src={URL.createObjectURL(file)}
                  // src={PF + post.photo}
                  alt=""
                />
              )}
            </div>

            <div className="mt-5 xl:px-10">
              <form className="xs:px-5 py-10">
                <div className="sm:text-xl tracking-widest font-semibold">
                  Enter title for your post
                </div>
                <div className="flex justify-center">
                  <label htmlFor="fileInput" className="m-auto">
                    <i className="text-3xl text-gray-600 cursor-pointer fa-solid fa-plus"></i>
                  </label>
                  <input
                    // required
                    type="file"
                    id="fileInput"
                    style={{ display: "none" }}
                    // onChange={(e) =>
                    //   setPost((prev) => {
                    //     return { ...prev, photo: e.target.files[0] };
                    //   })
                    // }
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                  <input
                    // required
                    type="text"
                    // placeholder="Enter title"
                    value={post.title}
                    className="lg:text-xl py-5 lg:py-8 mb-2 lg:mb-4 ml-2 mt-4 border w-full border-none focus:outline-none"
                    autoFocus={true}
                    onChange={(e) =>
                      setPost((prev) => {
                        return { ...prev, title: e.target.value };
                      })
                    }
                  />
                </div>
                <div className="sm:text-xl tracking-widest font-semibold">
                  Enter description for your post
                </div>
                <div className=" flex justify-center">
                  <textarea
                    // required
                    // placeholder="Enter description for your post"
                    value={post.desc}
                    type="text"
                    className="xs:text-lg lg:text-xl pt-4 pb-5 lg:pb-8 border w-full border-none focus:outline-none"
                    onChange={(e) =>
                      setPost((prev) => {
                        return { ...prev, desc: e.target.value };
                      })
                    }
                  />
                </div>
                <div className="my-3 flex flex-wrap">
                  {post.ingredients &&
                    post.ingredients.map((i) => (
                      <span className="mr-4 my-2">
                        <div className="bg-gray-200 text-sm xs:text-base p-2 xs:px-3 xs:py-4 rounded-xl flex">
                          {i}
                          <span
                            onClick={(e) => {
                              let x = post.ingredients.filter((y) => y !== i);
                              // setIngredients(x);
                              setPost((prev) => {
                                return {
                                  ...prev,
                                  ingredients: x,
                                };
                              });
                            }}
                            className="ml-2 bg-gray-400 text-white rounded-2xl p-1"
                          >
                            <AiOutlineClose className="text-sm" />
                          </span>
                        </div>
                      </span>
                    ))}
                </div>
                {post.ingredients && (
                  <div className="xs:flex xs:text-lg lg:text-xl py-5 lg:py-10 mb-2 lg:mb-5">
                    <div className="xs:w-3/4">
                      <input
                        // required={post.ingredients.length > 1 ? false : true}
                        value={ingredient}
                        type="text"
                        placeholder="Add Ingredients"
                        className="border w-full border-none focus:outline-none"
                        autoFocus={true}
                        onChange={(e) => setIngredient(e.target.value)}
                      />
                    </div>
                    <div className="xs:w-1/4 text-center">
                      <div
                        className="bg-[#222] mt-5 xs:mt-0 text-white p-2 md:p-3 lg:px-6 lg:py-3 rounded-2xl"
                        onClick={(e) => {
                          setPost((prev) => {
                            return {
                              ...prev,
                              ingredients: [...prev.ingredients, ingredient],
                            };
                          });

                          // setIngredients((prev) => [...prev, ingredient]);
                          setIngredient("");
                        }}
                      >
                        ADD
                      </div>
                    </div>
                  </div>
                )}
                <div className="my-3 flex flex-wrap">
                  {post.directions &&
                    post.directions.map((s) => (
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
                              let z = post.directions.filter((y) => y !== s);
                              // setDirections(z);
                              setPost((prev) => {
                                return {
                                  ...prev,
                                  directions: z,
                                };
                              });
                            }}
                            className="ml-2 bg-gray-400 text-white rounded-2xl p-1"
                          >
                            <AiOutlineClose className="text-sm" />
                          </span>
                        </div>
                      </span>
                    ))}
                </div>
                {post.directions && (
                  <div className="xs:flex xs:text-lg lg:text-xl py-5 lg:py-10 mb-2 lg:mb-5">
                    <div className="xs:w-3/4">
                      <input
                        // required={post.directions.length > 1 ? false : true}
                        value={step}
                        type="text"
                        placeholder="Directions / Steps to be followed"
                        className="border w-full border-none focus:outline-none"
                        autoFocus={true}
                        onChange={(e) => setStep(e.target.value)}
                      />
                    </div>
                    <div className="xs:w-1/4 text-center">
                      <div
                        className="bg-[#222] mt-5 xs:mt-0 text-white p-2 md:p-3 lg:px-6 lg:py-3 rounded-2xl"
                        onClick={(e) => {
                          // setDirections((prev) => [...prev, step]);
                          setPost((prev) => {
                            return {
                              ...prev,
                              directions: [...prev.directions, step],
                            };
                          });
                          setStep("");
                        }}
                      >
                        Next Step
                      </div>
                    </div>
                  </div>
                )}
                <div className="sm:text-xl tracking-widest font-semibold">
                  Enter cuisine for your post
                </div>
                <div className=" flex justify-center">
                  <input
                    // required
                    // placeholder="Enter cuisine for your post"
                    value={post.cuisine && post.cuisine.name}
                    type="text"
                    className="xs:text-lg lg:text-xl pt-4 pb-5 lg:pb-8 border w-full border-none focus:outline-none"
                    onChange={(e) =>
                      setPost((prev) => {
                        return {
                          ...prev,
                          cuisine:
                            e.target.value.charAt(0).toUpperCase() +
                            e.target.value.slice(1),
                        };
                      })
                    }
                  />
                </div>
                <div className="flex justify-start py-5 lg:py-10">
                  {error && <div>{error}</div>}
                  <button
                    // type="submit"
                    onClick={handleSubmit}
                    className="bg-[teal] px-6 lg:px-8 py-4 cursor-pointer border-none text-gray-100 text-lg lg:text-xl rounded-2xl"
                  >
                    Publish
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default UpdatePost;
