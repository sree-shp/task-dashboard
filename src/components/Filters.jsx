import { useTasks } from "../context/TaskContext";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

function Filters() {
  const {
    priority,
    setPriority,
    filters,
    setFilters,
    setApplyFilters,
    setResetFilters,
  } = useTasks();

  // Function to handle filters change
  function handleFiltersChange(e) {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  }

  // Function to handle filters reset
  function handleFiltersReset() {
    setFilters({
      startDate: "",
      endDate: "",
      assignee: "",
      priority: "",
    });
    setResetFilters((state) => !state);
  }
  return (
    <>
      <div className="flex flex-col gap-2 md:flex-row ">
        <div className="md:w-[50%] flex flex-col gap-2 md:items-center bg-white shadow-md rounded-md px-4 py-4">
          <h3>Filter By</h3>

          <div className="flex flex-col gap-2">
            <div className="w-full flex flex-row gap-2">
              <input
                type="text"
                className="w-[50%] max-w-[150px]  bg-[#f4f4f4] rounded-md px-2 py-1"
                name="assignee"
                value={filters.assignee}
                onChange={handleFiltersChange}
                placeholder="Assignee"
              />
              <select
                name="priority"
                value={filters.priority || "default"}
                onChange={handleFiltersChange}
                className="w-[50%] max-w-[150px] bg-[#f4f4f4] rounded-md px-2 py-1"
              >
                <option value={"default"} disabled hidden>
                  Priority
                </option>
                <option value="P0">P0</option>
                <option value="P1">P1</option>
                <option value="P2">P2</option>
              </select>
            </div>
            <div className="w-full flex gap-2 ">
              <div className="w-[50%] max-w-[150px] flex flex-col gap-2 ">
                <DatePicker
                  className="w-full bg-[#f4f4f4] rounded-md px-2 py-1"
                  placeholderText={"From Date"}
                  selected={filters.startDate}
                  onChange={(date) =>
                    setFilters({ ...filters, startDate: date.getTime() })
                  }
                />
              </div>

              <div className="w-[50%] max-w-[150px] flex flex-col gap-2 ">
                <DatePicker
                  className="w-full bg-[#f4f4f4] rounded-md px-2 py-1"
                  placeholderText={"To Date"}
                  selected={filters.endDate}
                  onChange={(date) =>
                    setFilters({ ...filters, endDate: date.getTime() })
                  }
                />
              </div>
            </div>
          </div>
          <div className="w-full flex gap-2 md:justify-center">
            <button
              className="w-[50%] max-w-[150px] bg-blue-500 text-white px-2 py-1 rounded-md"
              onClick={() => setApplyFilters((state) => !state)}
            >
              Apply
            </button>
            <button
              className="w-[50%] max-w-[150px] bg-[#f4f4f4] px-2 py-1 rounded-md"
              onClick={handleFiltersReset}
            >
              Reset
            </button>
          </div>
        </div>
        <div className="md:w-[50%] flex flex-col md:items-center gap-2 bg-white shadow-md rounded-md px-4 py-4">
          <h3 className="">Sort By</h3>
          <select
            name="sortPriority"
            value={priority || "default"}
            onChange={(e) => setPriority(e.target.value)}
            className="w-[50%] max-w-[150px] bg-[#f4f4f4] rounded-md px-2 py-1"
          >
            <option value="default" disabled hidden>
              Priority
            </option>
            <option value="high">High Priority</option>
            <option value="low">Low Priority</option>
          </select>
        </div>
      </div>
    </>
  );
}

export default Filters;
