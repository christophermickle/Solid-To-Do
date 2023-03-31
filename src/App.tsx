import { createSignal, createEffect } from "solid-js";
// custom components
import CustomForm from "./components/CustomForm"
import EditForm from "./components/EditForm";
import TaskList from "./components/TaskList";
import "./index.css"

function App() {

  const [tasks, setTasks] = createSignal([]);
  const [previousFocusEl, setPreviousFocusEl] = createSignal(null);
  const [editedTask, setEditedTask] = createSignal(null);
  const [isEditing, setIsEditing] = createSignal(false);

  createEffect(() => {
    const storedTasks = localStorage.getItem("solid-todo-tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  });

  createEffect(() => {
    localStorage.setItem("solid-todo-tasks", JSON.stringify(tasks()));
  });

  const addTask = (task:string) => {
    console.log(task)
    setTasks((prevState) => [...prevState, task])
    console.log(tasks());
  };

  const deleteTask = (id:string) => {
    setTasks((prevState) => prevState.filter((t) => t.id !== id));
  };

  const toggleTask = (id:string) => {
    setTasks((prevState) =>
      prevState.map((t) => (t.id === id ? { ...t, checked: !t.checked } : t))
    );
  };

  const updateTask = (task) => {
    setTasks((prevState) =>
      prevState.map((t) => (t.id === task.id ? { ...t, name: task.name } : t))
    );
    closeEditMode(dialogRef);
  };

  const closeEditMode = (editRef) => {
    setIsEditing(false);
    previousFocusEl().focus();
    editRef.current.close();
  };

  const enterEditMode = (task) => {
    setEditedTask(task);
    setIsEditing(true);
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
        <TaskList
          tasks={tasks}
          deleteTask={deleteTask}
          toggleTask={toggleTask}
          enterEditMode={enterEditMode}
        />
    </div>
  );
}

export default App;
