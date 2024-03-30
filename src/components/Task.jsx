import { useState } from "react";
import Form from "./Form";
import { useTasks } from "../context/TaskContext";

function Task({ title, priority, description, assignee, status }) {
  // State to toggle options for each task
  const [options, setOptions] = useState(false);
  // State to toggle edit option for each task
  const [editTask, setEditTask] = useState(false);
  // State to toggle delete option for each task
  const [deleteTask, setDeleteTask] = useState(false);

  const { tasks, setTasks } = useTasks();

  // Function to toggle edit form
  function handleFormClose() {
    setEditTask(!editTask);
  }

  // Function to toggle options
  function handleOptionsClose() {
    setOptions(!options);
  }

  // Function to toggle delete
  function handleDeleteClose() {
    setDeleteTask(!deleteTask);
  }

  // Function to filter the required task from the tasks state
  function handleDeleteTask() {
    setTasks(tasks.filter((el) => el.title !== title));
  }

  return (
    <div className="w-full bg-[#f4f4f4] mx-4 my-4 p-4 flex flex-col gap-2 rounded-md">
      <div className="flex flex-row justify-between">
        <h6 className="">{title}</h6>
        <div className="bg-blue-500 text-white px-2 py-1 rounded-md">
          {priority}
        </div>
      </div>
      <hr />
      <div className="">{description}</div>
      <div className="relative flex justify-between items-center">
        <h6 className="">{assignee}</h6>
        <div className="p-1" onClick={handleOptionsClose}>
          <img
            className="w-[20px]"
            src="https://cdn-icons-png.flaticon.com/512/561/561184.png"
          />
        </div>

        {/* Open options on the task on click of its button */}
        {options && (
          <div className="absolute right-0 top-[100%] bg-white border-2 border-black rounded-md">
            <div
              className=" border-black border-b-2 px-4 py-1 "
              onClick={handleFormClose}
            >
              Edit task
            </div>
            <div className=" px-4 py-1 " onClick={handleDeleteClose}>
              Delete task
            </div>
          </div>
        )}
      </div>

      {/* Open delete modal on click of its button */}
      {deleteTask && (
        <div
          className={`flex justify-center items-center fixed z-[100] top-0 bottom-0 left-0 right-0 w-screen h-screen`}
        >
          <div className="w-screen h-screen bg-black/[0.5]"></div>
          <div className="absolute z-[1000] w-[75%] md:w-[40%] flex flex-col gap-4 bg-white px-4 py-10 md:px-10">
            <h3 className="">Delete Task</h3>
            <p>Are you sure you want to delete the task?</p>
            <div className="flex justify-between gap-2">
              <button
                className="w-[50%] bg-red-600 text-white px-2 py-1 rounded-md"
                onClick={handleDeleteTask}
              >
                Delete
              </button>
              <button
                className="w-[50%] bg-[#f4f4f4] px-2 py-1 rounded-md"
                onClick={handleDeleteClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Open edit Form on click of its button */}
      {editTask && (
        <div
          className={`flex justify-center items-center fixed z-[100] top-0 bottom-0 left-0 right-0 w-screen h-screen`}
        >
          <div className="w-screen h-screen bg-black/[0.5]"></div>
          <div className="absolute z-[1000] w-[75%] md:w-[40%] flex flex-col gap-4 bg-white px-4 py-10 md:px-10">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-medium">Edit Task</h3>
              <div
                className="text-2xl cursor-pointer"
                onClick={handleFormClose}
              >
                &times;
              </div>
            </div>
            <Form
              values={{
                title: title,
                description: description,
                assignee: assignee,
                priority: priority,
                status: status,
              }}
              handleFormClose={handleFormClose}
              edit={true}
            />
          </div>
        </div>
      )}

      {status === "Pending" ? (
        <div className="text-center bg-blue-500 px-8 py-1 rounded-md text-white ">
          Assign
        </div>
      ) : (
        <div className="text-center bg-blue-500 px-8 py-1 rounded-md text-white">
          {status}
        </div>
      )}
    </div>
  );
}

export default Task;
