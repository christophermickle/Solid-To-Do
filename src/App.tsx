import { createSignal, createEffect } from "solid-js";
// custom components
import CustomForm from "./components/CustomForm";
import TaskList from "./components/TaskList";
import "./index.css";

function App() {
  const [tasks, setTasks] = createSignal([]);

  createEffect(() => {
    const storedTasks = localStorage.getItem("solid-todo-tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  });

  createEffect(() => {
    localStorage.setItem("solid-todo-tasks", JSON.stringify(tasks()));
  });

  const addTask = (task: string) => {
    console.log(task);
    setTasks((prevState) => [...prevState, task]);
    console.log(tasks());
  };

  const deleteTask = (id: string) => {
    setTasks((prevState) => prevState.filter((t) => t.id !== id));
  };

  const toggleTask = (id: string) => {
    setTasks((prevState) =>
      prevState.map((t) => (t.id === id ? { ...t, checked: !t.checked } : t))
    );
  };

  const updateTask = (task) => {
    setTasks((prevState) =>
      prevState.map((t) => (t.id === task.id ? { ...t, name: task.name } : t))
    );
  };

  return (
    <div class="container">
      <header>
        <h1 class="coolText">
          My <span>Task</span> List
        </h1>
      </header>
      <CustomForm addTask={addTask} />
      <TaskList
        tasks={tasks}
        deleteTask={deleteTask}
        toggleTask={toggleTask}
        updateTask={updateTask}
      />
    </div>
  );
}

export default App;
