// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import axios from "axios";
import Welcome from "../src/assets/Images/rb_27447.png";
import { ToastContainer, toast } from "react-toastify";
import { Trash2, UserRoundPen } from "lucide-react";
import EditTodo from "./EditTodo";

const Todo = () => {
  const [title, setTitle] = useState("");
  const [data, setData] = useState([]);
  const [TodoEditModalIsOpen, setTodoEditModalIsOpen] = useState(false);
  const [EdiTtodo, setEditTodo] = useState(null);

  const fetchTodoId = async (id) => {
    try {
      const response = await axios.get(
        `https://my-todo-backend.vercel.app/user/api/getIdData/${id}`
      );
      setEditTodo(response.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to Fetch task. Please try again.");
    }
  };

  const openTodoeditModal = async (id) => {
    await fetchTodoId(id);
    setTodoEditModalIsOpen(true);
  };

  const closeTodoeditModal = () => {
    setTodoEditModalIsOpen(false);
    setEditTodo(null); // clear selcted data
  };

  // Function to fetch data
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://my-todo-backend.vercel.app/user/api/getTodo"
      );
      setData(response.data.AllgetDatas);
    } catch (error) {
      console.log(error);
      toast.error("Failed to Fetch task. Please try again.");
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data initially
  }, []);

  const handleDelete = async (id) => {
    //  e.preventDefault()
    try {
      const response = await axios.delete(
        `https://my-todo-backend.vercel.app/user/api/deleteTodo/${id}`
      );
      toast.success("Task Delete successfully !");
      console.log(response);
      fetchData(); // Fetch updated data
    } catch (error) {
      console.log(error);
      toast.error("Failed to Delete task. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) {
      toast.error("Please Enter Youre Task!");
      return;
    }

    try {
      const response = await axios.post(
        "https://my-todo-backend.vercel.app/user/api/AddTodo",
        {
          title: title,
        }
      );
      console.log("Task added", response.data);
      toast.success("Task successfully added!");
      fetchData(); // Fetch updated data
      setTitle("");
    } catch (error) {
      console.log(error);
      toast.error("Failed to add task. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 sm:p-6 md:p-8">
      <ToastContainer />
      <div className="mb-6 sm:mb-8 text-center">
        <img
          src={Welcome}
          alt="Welcome Logo"
          className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg object-contain mx-auto"
        />
        <h1 className="font-mono text-2xl sm:text-3xl md:text-4xl font-bold text-sky-600 drop-shadow-md">
          TODO APPLICATION
        </h1>
      </div>
  
      <div className="flex flex-col items-center gap-4 w-full max-w-xs sm:max-w-sm md:max-w-md">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter Task"
          className="w-full px-3 py-2 sm:py-3 border-2 border-sky-500 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
        />
        <button
          className="w-full px-3 py-2 sm:py-3 text-white bg-sky-500 rounded-lg hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-400 shadow-md"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
  
      <ul className="w-full max-w-xs sm:max-w-sm md:max-w-md bg-white shadow-md rounded-lg p-4 sm:p-5 overflow-y-auto max-h-64 sm:max-h-96 mt-6">
        {data.map((todo) => (
          <li
            key={todo._id}
            className="border-b last:border-b-0 py-3 flex justify-between items-center"
          >
            <span className="text-gray-800 flex-1 truncate">{todo.title}</span>
            <div className="flex space-x-2">
              <button
                className="flex items-center justify-center w-8 h-8 text-white bg-blue-500 rounded-full hover:bg-blue-600"
                onClick={() => openTodoeditModal(todo._id)}
              >
                <UserRoundPen className="w-4 h-4" />
              </button>
              <button
                className="flex items-center justify-center w-8 h-8 text-white bg-red-500 rounded-full hover:bg-red-600"
                onClick={() => handleDelete(todo._id)}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </li>
        ))}
      </ul>
  
      <EditTodo
        modalIsOpen={TodoEditModalIsOpen}
        closeModal={closeTodoeditModal}
        todoData={EdiTtodo}
        fetchData={fetchData}
      />
    </div>
  );
  
};

export default Todo;
