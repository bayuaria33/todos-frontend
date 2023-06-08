import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {FaSpinner} from "react-icons/fa";

export default function Login() {
  const url = process.env.REACT_APP_API_URL
  const navigate = useNavigate()
  const [errorMsg, setErrormsg] = useState();
  const [isError, setIserror] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const formData = {
    email: email,
    password: password,
  };
  const loginForm = (e) => {
    setIsLoading(true);
    setIserror(false)
    e.preventDefault();
    axios
      .post(`https://` + url + `/users/login`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setIsLoading(false);
        console.log("Login success");
        // console.log(res);
        localStorage.setItem("accessToken",res.data.data.accessToken)
        navigate('/')
        // setCookie("accessToken", res.data.data.accessToken, {
        //   path: "/",
        // });
        // router.replace("/");
      })
      .catch((err) => {
        setIsLoading(false);
        console.log("Login fail");
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
          <p className="text-3xl font-extrabold mx-12">Todos</p>
        </div>
        <form
          className="w-80 my-8 md:flex-col md:mx-auto"
            onSubmit={loginForm}
        >
          <p className="text-4xl font-extrabold">Login</p>
          <div className="my-8">
            <label>Email </label>
            <input
              autoComplete="off"
              id="email"
              name="email"
              type="text"
              className="peer placeholder-grey h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600 mb-4"
              placeholder="Email address"
                onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label>Password </label>
            <input
              autoComplete="off"
              id="password"
              name="password"
              type="password"
              className="peer placeholder-grey h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600 mb-4"
              placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              required
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
            <p className="text-white font-bold">Login</p>
          </button>
          <div className="text-center my-3">
            <p>Don't have an account?</p>
            <Link to="/register">
              <button className="bg-white border-slate-400 border-2 w-full h-16 rounded-md drop-shadow-md mt-6">
                <p className="font-bold">Sign Up</p>
              </button>
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
