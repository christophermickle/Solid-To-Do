
// library imports
import { AiFillPlusSquare } from "solid-icons/ai";
import { createSignal } from 'solid-js';

const CustomForm = ({ addTask }) => {
  const [task, setTask] = createSignal();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    addTask({
      name: task(),
      checked: false,
      id: Date.now()
    })
    setTask("")
  }

  return (
    <form
      className="todo"
      onSubmit={handleFormSubmit}
      >
      <div className="wrapper">
        <input
          type="text"
          id="task"
          className="input"
          value={task()}
          onInput={(e) => setTask(e.target.value)}
          required
          autoFocus
          maxLength={60}
          placeholder="Enter Task"
        />
        <label
          htmlFor="task"
          className="label"
        >Enter Task</label>
      </div>
      <button
        className="btn"
        aria-label="Add Task"
        type="submit"
        >
        <AiFillPlusSquare />
      </button>
    </form>
  )
}
export default CustomForm