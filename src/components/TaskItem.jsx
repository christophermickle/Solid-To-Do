import {createSignal} from 'solid-js';

// styles
import "./TaskItem.css";

// Library imports
import { FaSolidSquareCheck } from "solid-icons/fa";
import { BsTrash3 } from "solid-icons/bs";
import { HiOutlinePencilAlt } from "solid-icons/hi";



const TaskItem = ({ task, deleteTask, toggleTask, enterEditMode }) => {
  const [isChecked, setIsChecked ] = createSignal(task.checked);

  const handleCheckboxChange = (e) =>{
    setIsChecked(!isChecked());
    toggleTask(task.id);
  }

  return (
    <li class="flex items-center justify-between gap-[.6em] text-[var(--muted)]">
      <div class="task-group">
        <input
          type="checkbox"
          class="checkbox"
          checked={isChecked()}
          onChange={handleCheckboxChange}
          name={task.name}
          id={task.id}
        />
        <label
          htmlFor={task.id}
          class="label"
        >
          {task.name}
          <p class="checkmark">
            <FaSolidSquareCheck strokeWidth={2} width={24} height={24}/>
          </p>
        </label>
      </div>
      <div class="task-group">
        <button
          class='btn'
          aria-label={`Update ${task.name} Task`}
          onClick={() => enterEditMode(task)}
        >
          <HiOutlinePencilAlt width={24} height={24} />
        </button>

        <button
          class={`btn ${styles.delete}`}
          aria-label={`Delete ${task.name} Task`}
          onClick={() => deleteTask(task.id)}
        >
          <BsTrash3 width={24} height={24} />
        </button>

      </div>
    </li>
  )
}
export default TaskItem