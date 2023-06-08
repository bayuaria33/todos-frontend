import React, { useEffect, useState } from "react";
import { BsTrash, BsPencil } from "react-icons/bs";
import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";
import { FaSpinner } from "react-icons/fa";

import { Link } from "react-router-dom";
import Header from "../Components/Header";
import axios from "axios";
export default function Todos() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const url = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem("accessToken");
  const fetchTodo = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`https://` + url + `/todos/my-todo`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setData(res.data);
      console.log(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setData(null);
      console.log(error);
    }
  };
  useEffect(() => {
    fetchTodo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [selected, setSelected] = useState();
  const confirmDelete = (id) => {
    setSelected(id);
    window.delete_modal.showModal();
  };
  const confirmComplete = (id) => {
    setSelected(id);
    window.complete_modal.showModal();
  };

  const deleteTodo = async (selected) => {
    try {
      const res = await axios.delete(`https://` + url + `/todos/${selected}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      console.log(res);
      fetchTodo();
    } catch (error) {
      console.log(error);
    }
  };

  const completeTodo = async (selected) => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    try {
      const res = await axios.put(
        `https://` + url + `/todos/complete/${selected}`,
        selected,
        config
      );
      console.log(res);
      fetchTodo();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="md:w-screen h-screen flex justify-center">
      <div
        className="md:flex-col flex-row md:h-screen h-screen md:w-3/4 w-screen bg-white justify-center md:items-center items-center py-16"
        style={{ color: "black" }}
      >
        {/* here */}
        <Header />
        <div className="flex justify-center">
          <p className="text-3xl font-extrabold mx-12">Todos</p>
        </div>
        {/* table */}
        <div className="w-auto  mt-4 overflow-auto rounded-lg">
          <Link to="/add">
            <button className="px-3 py-2 my-2 rounded-lg bg-slate-200 font-bold flex align-items-center">
              Add New Todo
            </button>
          </Link>
          <table className="w-full bg-slate-100 border-b-2 border-gray-200">
            <thead>
              <tr>
                <th className="p-3 w-28 text-sm font-semibold tracking-wide text-left">
                  Title
                </th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left">
                  Description
                </th>
                <th className="p-3 w-20 text-sm font-semibold tracking-wide text-left">
                  Status
                </th>
                <th className="p-3 w-32 text-sm font-semibold tracking-wide text-center">
                  Action
                </th>
              </tr>
            </thead>
            {isLoading && (
              <tr className="flex align-middle justify-center my-4">
                <td className="p-3"></td>
                <td className="p-3">
                  <FaSpinner className="animate-spin" size={24} />
                </td>
                <td className="p-3"></td>

              </tr>
            )}
            <tbody>
              {data === null && (
                <tr>
                  <td className="p-3"></td>
                  <td className="p-3">No todos found</td>
                  <td className="p-3"></td>
                </tr>
              )}
              {data?.data.map((item, index) => (
                <tr key={index} className="odd:bg-white even:bg-slate-50">
                  <td className="p-3 text-sm text-gray-700">{item.title}</td>
                  <td className="p-3 text-sm text-gray-700">
                    {item.description}
                  </td>
                  <td className="p-3 text-sm text-gray-700">
                    {item.completed ? (
                      <button>
                        <ImCheckboxChecked size={24} />
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          confirmComplete(item.id);
                        }}
                      >
                        <ImCheckboxUnchecked size={24} />
                      </button>
                    )}
                  </td>
                  <td className="p-3 text-sm text-gray-700 flex">
                    <Link to={`./edit/${item.id}`} className="p-2">
                      <BsPencil size={24} />
                    </Link>
                    <button
                      className="p-2"
                      onClick={() => {
                        confirmDelete(item.id);
                      }}
                    >
                      <BsTrash size={24} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <dialog id="delete_modal" className="modal">
            <form method="dialog" className="modal-box">
              <h3 className="font-bold text-lg">Confirm Delete</h3>
              <p className="py-4">Are you sure you want to delete this todo?</p>
              <div className="modal-action">
                {/* if there is a button in form, it will close the modal */}
                <button
                  className="btn"
                  onClick={() => {
                    deleteTodo(selected);
                  }}
                >
                  Confirm
                </button>
                <button className="btn">Close</button>
              </div>
            </form>
          </dialog>
          <dialog id="complete_modal" className="modal">
            <form method="dialog" className="modal-box">
              <h3 className="font-bold text-lg">Confirm Complete</h3>
              <p className="py-4">Set this todo as completed?</p>
              <div className="modal-action">
                {/* if there is a button in form, it will close the modal */}
                <button
                  className="btn"
                  onClick={() => {
                    completeTodo(selected);
                  }}
                >
                  Confirm
                </button>
                <button className="btn">Close</button>
              </div>
            </form>
          </dialog>
        </div>
      </div>
    </main>
  );
}
