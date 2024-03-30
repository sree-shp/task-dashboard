import { createContext, useContext } from "react";
import { useState } from "react";

import tasklist from "../data/tasks";

const TaskContext = createContext();

function TaskProvider({ children }) {
  const [tasks, setTasks] = useState(tasklist);
  const [taskNumber, setTaskNumber] = useState(() => tasks.length);
  const [priority, setPriority] = useState();
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    assignee: "",
    priority: "",
  });
  const [applyFilters, setApplyFilters] = useState(false);
  const [resetFilters, setResetFilters] = useState(false);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        setTasks,
        taskNumber,
        setTaskNumber,
        priority,
        setPriority,
        filters,
        setFilters,
        applyFilters,
        setApplyFilters,
        resetFilters,
        setResetFilters,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

function useTasks() {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error("TaskContext was used outside of TaskProvider");
  }
  return context;
}

export { TaskProvider, useTasks };
