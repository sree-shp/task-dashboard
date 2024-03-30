import { useEffect, useState } from "react";
import { useTasks } from "../context/TaskContext";
import Task from "./Task";

function TaskPane({ status, color }) {
  const { tasks, priority, filters, applyFilters, resetFilters } = useTasks();

  // State to store tasks based on status when component is rendered
  const [statusTasks, setStatusTasks] = useState(
    tasks.filter((task) => task.status === status)
  );

  // Function to create tasks
  function createTasks(task) {
    return (
      <Task
        key={task.taskNumber}
        title={task.title}
        priority={task.priority}
        description={task.description}
        assignee={task.assignee}
        status={task.status}
      />
    );
  }

  // To set statusTasks state when a filter/sort is applied
  useEffect(() => {
    setStatusTasks(tasks.filter((task) => task.status === status));
    // If Assignee filter is applied, filter based on assignee
    if (filters.assignee !== "") {
      setStatusTasks((el) =>
        el.filter((task) => task.assignee === filters.assignee)
      );
    }
    // If priority filter is applied, filter based on priority
    if (filters.priority !== "") {
      setStatusTasks((el) =>
        el.filter((task) => task.priority === filters.priority)
      );
    }
    // If startDate and endDate filter is applied, filter based on dates
    if (filters.startDate !== "" && filters.endDate !== "") {
      setStatusTasks((el) =>
        el.filter(
          (task) =>
            task.date >= filters.startDate && task.date <= filters.endDate
        )
      );
    }
    // If sort by priority is applied, sort based on high or low priority
    // Assumption: P0 is highest priority
    if (priority) {
      setStatusTasks((tasks) =>
        tasks.sort((a, b) => {
          let temp1 = a.priority.toLowerCase();
          let temp2 = b.priority.toLowerCase();
          if (priority === "high" ? temp1 < temp2 : temp1 > temp2) {
            return -1;
          }
          if (priority === "low" ? temp1 > temp2 : temp1 < temp2) {
            return 1;
          }
          return 0;
        })
      );
    }
  }, [applyFilters, resetFilters, priority, tasks]);

  return (
    <div className="bg-white min-w-[250px] min-h-[400px] rounded-md shadow-md">
      <div className={`${color} text-white text-center px-4 py-2 rounded-t-md`}>
        <h3 className="">{status}</h3>
      </div>
      <div className="flex flex-col justify-center items-center px-4 ">
        {/* If statusTasks array length is zero, display no tasks found, else create tasks */}
        {statusTasks.length === 0 ? (
          <p className="py-10">No Tasks found</p>
        ) : (
          statusTasks.map(createTasks)
        )}
      </div>
    </div>
  );
}

export default TaskPane;
