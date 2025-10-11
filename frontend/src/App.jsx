import React, { useEffect, useState } from "react";
import axios from "axios";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [searchTerm, setSearchTerm] = useState("");


  const API_URL = "http://localhost:3000/api/todos";

  useEffect(() => {
    const updateDate = () => {
      const now = new Date();
      const formattedDate = now.toLocaleDateString("en-IN", {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
      setCurrentDate(formattedDate);
    }
    updateDate();
    const timer = setInterval(updateDate, 60000);
    return () => clearInterval(timer);
  }, [])

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await axios.get(`${API_URL}?search=${searchTerm}`);
        setTodos(res.data);
      } catch (err) {
        console.error("Failed to fetch todos:", err);
      }
    };

    fetchTodos();
  }, []);
  const addTodo = async () => {
    if (!title.trim()) return alert("Enter a task title");

    try {
      const res = await axios.post(API_URL+'/todos', { title });
      setTodos([...todos, res.data]);
      setTitle("");
    } catch (err) {
      console.error("Failed to add todo:", err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTodos(todos.filter((todo) => todo._id !== id));
      alert("Task deleted successfully");
    } catch (err) {
      console.error("Failed to delete todo:", err);
    }
  };

  const toggleComplete = async (todo) => {
    try {
      const res = await axios.put(`${API_URL}/${todo._id}`, {
        completed: !todo.completed,
      });
      setTodos(todos.map((t) => (t._id === todo._id ? res.data : t)));
    } catch (err) {
      console.error("Failed to toggle todo:", err);
    }
  };

  const updateTodo = async (id, newTitle) => {
    if (!newTitle.trim()) return alert("Title cannot be empty");

    try {
      const res = await axios.put(`${API_URL}/${id}`, { title: newTitle });
      setTodos(todos.map((todo) => (todo._id === id ? res.data : todo)));
    } catch (err) {
      console.error("Failed to update todo:", err);
    }
  };

  const filteredTodos = todos.filter((todo) => {
    const matchesSearch = todo.title.toLowerCase().includes(searchTerm.toLowerCase());
   
    return matchesSearch;
  });
   
  return (
    <div className="min-h-screen  flex flex-col items-center p-6">
       <input type="text" placeholder="search tasks..." className=" rounded-full w-full mt-3 md:w-1/3 h-10 bg-[#edeef0] p-1  border-none outline-none pl-4 text-base sm:text-lg text-black" value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)}/>
      <h1 className="text-4xl font-bold mt-8">Task Manager</h1>
      <p className="text-sm text-gray-500">{currentDate}</p> 
      <TodoForm title={title} setTitle={setTitle} addTodo={addTodo} />
      <TodoList todos={filteredTodos} deleteTodo={deleteTodo} toggleComplete={toggleComplete} updateTodo={updateTodo} />
    </div>
  );
}

export default App;
