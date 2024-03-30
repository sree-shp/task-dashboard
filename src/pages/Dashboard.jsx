import { useState } from "react";

import Filters from "../components/Filters";
import TaskPane from "../components/TaskPane";
import Form from "../components/Form";

const status = [
  { status: "Pending", color: "bg-black" },
  { status: "In Progress", color: "bg-orange-500" },
  { status: "Completed", color: "bg-green-600" },
  { status: "Deployed", color: "bg-indigo-800" },
  { status: "Deferred", color: "bg-red-600" },
];

function Dashboard() {
  // State to toggle "Add new task" modal
  const [isActive, setIsActive] = useState();

  // Function to toggle "Add new task" modal
  function handleFormClose() {
    setIsActive(!isActive);
  }

  // Function to create Task panes
  function createTaskPanes(taskPane, index) {
    return (
      <TaskPane key={index} status={taskPane.status} color={taskPane.color} />
    );
  }
  return (
    <div className="mx-5 my-2 md:mx-[5rem] flex flex-col gap-2">
      <div className=" flex flex-col md:flex-row justify-between gap-5 my-10">
        <h1 className="text-xl">Task Dashboard</h1>

        {/* Add New Task Button */}

        <div className="w-[100%] md:w-[25%] flex flex-row justify-center">
          <button
            onClick={handleFormClose}
            className="w-full bg-blue-500 text-white px-2 py-2 rounded-md"
          >
            Add New Task
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        {/* {Filters Component} */}

        <Filters />

        {/* Map Task Panes */}
        <div className="flex flex-row gap-5 overflow-x-auto">
          {status.map(createTaskPanes)}
        </div>

        {/* Open Add New Task Form on Click of its Button */}
        {isActive && (
          <div
            className={`flex justify-center items-center fixed z-[100] top-0 bottom-0 left-0 right-0 w-screen h-screen`}
          >
            <div className="w-full h-full bg-black/[0.5]"></div>
            <div className="absolute z-[1000] w-[75%] md:w-[40%] flex flex-col gap-4 bg-white px-4 py-10 md:px-10">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-medium">Add New Task</h3>
                <div
                  className="text-2xl cursor-pointer"
                  onClick={handleFormClose}
                >
                  &times;
                </div>
              </div>
              <Form handleFormClose={handleFormClose} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
