import React, { useState } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
const TodoList = ({ todos, toggleComplete, deleteTodo, updateTodo }) => {
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  const handleEdit = (todo) => {
    setEditId(todo._id);
    setEditTitle(todo.title);
  };

  const handleUpdate = () => {
    updateTodo(editId, editTitle);
    setEditId(null);
    setEditTitle("");
  };

  return (
    <ul className="w-full max-w-md sm:max-w-lg md:max-w-xl mx-auto mt-8 space-y-4">
      {todos.length === 0 ? (
        <p className="text-center text-gray-400">No tasks yet. Add one!</p>
      ) : (
        todos.map((todo) => (
          <li
            key={todo._id}
            className="bg-white rounded-xl shadow-md p-4 border border-gray-100 hover:shadow-lg transition duration-200"
          >
            {editId === todo._id ? (
              <div className="flex flex-col sm:flex-row gap-2 w-full">
                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="flex-grow px-3 py-2 rounded-lg border border-gray-300 outline-none text-gray-800"
                  placeholder="Edit task..."
                />

                <div className="flex gap-2 sm:w-auto w-full">
                  <button
                    onClick={handleUpdate}
                    className="flex-1 sm:flex-none bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setEditId(null);
                      setEditTitle("");
                    }}
                    className="flex-1 sm:flex-none bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div
                  onClick={() => toggleComplete(todo)}
                  className={`cursor-pointer text-base sm:text-lg font-medium mb-2 ${todo.completed
                    ? "line-through text-gray-400"
                    : "text-gray-800"
                    }`}
                >
                  {todo.title}
                </div>

                <div className="flex justify-between items-center text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <span>🕒</span>
                    <span>
                      Created:{" "}
                      {new Date(todo.createdAt).toLocaleDateString()}{" "}
                      {new Date(todo.createdAt).toLocaleTimeString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleEdit(todo)}
                      className="text-green-400 hover:text-green-600"
                      title="Edit"
                    >
                      <AiOutlineEdit className="text-[22px]" />
                    </button>
                    <button
                      onClick={() => deleteTodo(todo._id)}
                      className="text-red-500 hover:text-red-600"
                      title="Delete"
                    >
                      <AiOutlineDelete className="text-[22px]" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </li>
        ))
      )}
    </ul>
  );
};

export default TodoList;
