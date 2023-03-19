import { createSignal, createEffect } from "solid-js";

// custom components
import CustomForm from "./components/CustomForm";
import EditForm from "./components/EditForm";
import TaskList from "./components/TaskList";

function App() {
  const [tasks, setTasks] = createSignal([]);
  const [previousFocusEl, setPreviousFocusEl] = createSignal(null);
  const [editedTask, setEditedTask] = createSignal(null);
  const [isEditing, setIsEditing] = createSignal(false);

  createEffect(() => {
    const storedTasks = localStorage.getItem("react-todo.tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  });

  createEffect(() => {
    localStorage.setItem("react-todo.tasks", JSON.stringify(tasks()));
  });
  
  const addTask = (task) => {
    setTasks((prevState) => [...prevState, task]);
  };

  const deleteTask = (id) => {
    setTasks((prevState) => prevState.filter((t) => t.id !== id));
  };

  const toggleTask = (id) => {
    setTasks((prevState) =>
      prevState.map((t) => (t.id === id ? { ...t, checked: !t.checked } : t))
    );
  };

  const updateTask = (task) => {
    setTasks((prevState) =>
      prevState.map((t) => (t.id === task.id ? { ...t, name: task.name } : t))
    );
    closeEditMode();
  };

  const closeEditMode = () => {
    setIsEditing(false);
    previousFocusEl().focus();
  };

  const enterEditMode = (task) => {
    setEditedTask(task);
    setIsEditing(true);
    setPreviousFocusEl(document.activeElement);
  };

  return (
    <div class='container'>
      <header>
        <h1>My Task List</h1>
      </header>
      {isEditing() && (
        <EditForm
          editedTask={editedTask()}
          updateTask={updateTask}
          closeEditMode={closeEditMode}
        />
      )}
      <CustomForm addTask={addTask} />
      {tasks && (
        <TaskList
          tasks={tasks}
          deleteTask={deleteTask}
          toggleTask={toggleTask}
          enterEditMode={enterEditMode}
        />
      )}
    </div>
  );
}

export default App;
