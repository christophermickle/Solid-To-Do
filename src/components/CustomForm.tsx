
// library imports
import { AiFillPlusSquare } from "solid-icons/ai";
import { createSignal } from 'solid-js';

const CustomForm = (props) => {
  const [task, setTask] = createSignal('');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    props.addTask({
      name: task(),
      checked: false,
      id: Date.now()
    })
    setTask("")
  }

  return (
    <form
      class="todo"
      onSubmit={handleFormSubmit}
      >
      <div class="wrapper">
        <input
          type="text"
          id="task"
          class="input"
          value={task()}
          onInput={(e:Event) => setTask((e.target as HTMLInputElement).value)}
          required
          autofocus
          maxLength={60}
          placeholder="Enter Task"
        />
        <label
         for="task"
          class="label"
        >Enter Task</label>
      </div>
      <button
        class="btn"
        aria-label="Add Task"
        type="submit"
        >
        <AiFillPlusSquare />
      </button>
    </form>
  )
}
export default CustomForm