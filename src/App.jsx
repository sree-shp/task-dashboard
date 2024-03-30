import "./App.css";
import { TaskProvider } from "./context/TaskContext";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <>
      <TaskProvider>
        <Dashboard />
      </TaskProvider>
    </>
  );
}

export default App;
