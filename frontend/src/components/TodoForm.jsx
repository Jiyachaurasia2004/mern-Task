import React from "react";

function TodoForm({ title, setTitle, addTodo }) {
  return (
    <div className="flex flex-col items-center mx-auto mt-10 w-full max-w-md sm:max-w-lg md:max-w-xl">
      <div className="flex  sm:flex-row justify-center items-center mt-2 w-full gap-2">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task..."
          className="rounded-full bg-[#edeef0] border-none outline-none w-full h-12 sm:h-[50px] pl-4 text-base sm:text-lg text-black"
        />
        <button
          onClick={addTodo}
          className="rounded-full bg-[#ff6739] w-1/2 sm:w-[150px] h-12 sm:h-[50px] flex items-center justify-center text-white text-lg font-semibold cursor-pointer hover:bg-[#ff5722] transition-colors duration-200"
        >
          Add
        </button>
      </div>
    </div>

  );
}

export default TodoForm;
