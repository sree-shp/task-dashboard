import { useState } from "react";
import { useTasks } from "../context/TaskContext";

function Form({ values, handleFormClose, edit }) {
  const initialValues = values || {
    title: "",
    description: "",
    team: "",
    assignee: "",
    priority: "P0",
    status: "Pending",
    date: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const { tasks, setTasks } = useTasks();
  const disabled = edit === true ? "disabled" : "";

  function handleFormChange(e) {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    if (edit === true) {
      setTasks(
        tasks.map((el) => {
          if (formValues.title === el.title) {
            el.priority = formValues.priority;
            el.status = formValues.status;
            return el;
          } else {
            return el;
          }
        })
      );
    } else {
      formValues.date = new Date().getTime();
      setTasks((tasks) => [...tasks, formValues]);
    }
    handleFormClose();
  }
  return (
    <form className="flex flex-col gap-5" onSubmit={handleFormSubmit}>
      <div className="flex flex-col">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          className={`${
            edit === true ? "disabled:opacity-75" : ""
          } bg-[#f4f4f4] px-2 py-1 rounded-md`}
          name="title"
          value={formValues.title}
          disabled={disabled}
          onChange={handleFormChange}
          placeholder="Enter Title"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="description">Description</label>
        <textarea
          type="text"
          id="description"
          className={`${
            edit === true ? "disabled:opacity-75" : ""
          } bg-[#f4f4f4] px-2 py-1 rounded-md`}
          name="description"
          value={formValues.description}
          disabled={disabled}
          onChange={handleFormChange}
          rows={3}
          cols={20}
          placeholder="Enter Description"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="team">Team</label>
        <input
          type="text"
          id="team"
          className={`${
            edit === true ? "disabled:opacity-75" : ""
          } bg-[#f4f4f4] px-2 py-1 rounded-md`}
          name="team"
          value={formValues.team}
          disabled={disabled}
          onChange={handleFormChange}
          placeholder="Enter Team"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="assignee">Assignee</label>
        <input
          type="text"
          id="Assignee"
          className={`${
            edit === true ? "disabled:opacity-75" : ""
          } bg-[#f4f4f4] px-2 py-1 rounded-md`}
          name="assignee"
          value={formValues.assignee}
          disabled={disabled}
          onChange={handleFormChange}
          placeholder="Enter Assignee"
        />
      </div>
      <select
        name="priority"
        value={formValues.priority}
        onChange={handleFormChange}
        className="w-[50%] bg-[#f4f4f4] rounded-md px-2 py-1"
      >
        <option>P0</option>
        <option>P1</option>
        <option>P2</option>
      </select>
      {edit && (
        <select
          name="status"
          value={formValues.status}
          onChange={handleFormChange}
          className="w-[50%] bg-[#f4f4f4] rounded-md px-2 py-1"
        >
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
          <option>Deployed</option>
          <option>Deferred</option>
        </select>
      )}

      <div className="flex justify-center">
        <button
          type="submit"
          className="w-[50%] bg-blue-500 text-white px-2 py-2 rounded-md"
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default Form;
