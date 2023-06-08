import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";

export default function EditTodos() {
  const { id } = useParams();
  const url = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  const [errorMsg, setErrormsg] = useState();
  const [isError, setIserror] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const formData = {
    title: title,
    description: description,
  };
  const fetchTodoById = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`https://` + url + `/todos/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setTitle(res.data.data[0].title);
      setDescription(res.data.data[0].description);
      console.log(res.data.data[0]);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchTodoById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const editForm = (e) => {
    setIsLoading(true);
    setIserror(false);
    e.preventDefault();
    axios
      .put(`https://` + url + `/todos/${id}`, formData, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setIsLoading(false);
        console.log("Edit todo success");
        console.log(res);
        navigate("/");
      })
      .catch((err) => {
        setIsLoading(false);
        console.log("Edit todo fail");
        console.log(err);
        console.log(err.response.data.message);
        setErrormsg(err.response.data.message);
        setIserror(true);
      });
  };
  useEffect(() => {
    setIserror(false);
    setIsLoading(false);
  }, []);

  return (
    <main className=" w-screen h-screen flex justify-center">
      <div
        className="md:flex-col flex-row md:h-screen h-screen md:w-1/2 bg-white justify-center md:items-center items-center p-8 md:p-16"
        style={{ color: "black" }}
      >
        <div className="flex justify-center">
          <p className="text-3xl font-extrabold mx-12">Edit Todo</p>
        </div>
        <form className="w-80 my-8 md:flex-col md:mx-auto" onSubmit={editForm}>
          <div className="my-8">
            <label className="font-semibold">Todo Title </label>
            <input
              autoComplete="off"
              id="title"
              name="title"
              type="text"
              className="peer placeholder-grey h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600 mb-4"
              placeholder="Title of todo"
              onChange={(e) => setTitle(e.target.value)}
              required
              value={title}
            />
            <label className="font-semibold">Todo Description</label>
            <input
              autoComplete="off"
              id="Description"
              name="Description"
              type="Description"
              className="peer placeholder-grey h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600 mb-4"
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
          </div>
          {isError && (
            <div className="bg-red-400 w-full h-12 my-4 rounded-lg flex justify-center items-center font-bold text-white">
              {errorMsg}
            </div>
          )}
          {isLoading && (
            <div className="flex align-middle justify-center my-4">
              <FaSpinner className="animate-spin" size={24} />
            </div>
          )}
          <button className="bg-slate-500 w-full h-16 rounded-md drop-shadow-md">
            <p className="text-white font-bold">Edit Todo</p>
          </button>
        </form>
      </div>
    </main>
  );
}
