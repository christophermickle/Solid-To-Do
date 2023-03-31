import {  createSignal } from "solid-js";

// styles
import styles from "./TaskItem.module.css";

// Library imports
import { FaSolidSquareCheck } from "solid-icons/fa";
import { BsTrash3 } from "solid-icons/bs";
import { HiOutlinePencilAlt } from "solid-icons/hi";

const TaskItem = (props) => {
  const [isChecked, setIsChecked] = createSignal(props.task.checked);

  const handleCheckboxChange = (e) => {
    setIsChecked(!isChecked());
    props.toggleTask(props.task.id);
  };

  return (
    <li class={styles.task}>
      <div class={styles["task-group"]}>
        <input
          type='checkbox'
          class={styles.checkbox}
          checked={isChecked()}
          onChange={handleCheckboxChange}
          name={props.task.name}
          id={props.task.id}
        />
        <label for={props.task.id} class={styles.label}>
          {props.task.name}
          <p class={styles.checkmark}>
            <FaSolidSquareCheck stroke-width={2} width={24} height={24} />
          </p>
        </label>
      </div>
      <div class={styles["task-group"]}>
        <button
          class='btn'
          aria-label={`Update ${props.task.name} Task`}
          onClick={() => props.enterEditMode(props.task)}
        >
          <HiOutlinePencilAlt width={24} height={24} />
        </button>

        <button
          class={`btn ${styles.delete}`}
          aria-label={`Delete ${props.task.name} Task`}
          onClick={() => props.deleteTask(props.task.id)}
        >
          <BsTrash3 width={24} height={24} />
        </button>
      </div>
    </li>
  );
};
export default TaskItem;
