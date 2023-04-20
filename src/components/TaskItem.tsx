import { createSignal } from "solid-js";
import EditForm from "./EditForm";

// styles
import styles from "./TaskItem.module.css";

// Library imports
import { FaSolidSquareCheck } from "solid-icons/fa";
import { BsTrash3 } from "solid-icons/bs";

interface Task {
  id: number;
  name: string;
  checked: boolean;
}

interface TaskItemProps {
  task: Task;
  deleteTask: (id: number) => void;
  toggleTask: (id: number) => void;
  updateTask: (task: Task) => void;
}

const TaskItem = (props: TaskItemProps) => {
  const [isChecked, setIsChecked] = createSignal(props.task.checked);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked());
    props.toggleTask(props.task.id);
  };

  return (
    <li class={styles.task}>
      <div class={styles["task-group"]}>
        <input
          type="checkbox"
          class={styles.checkbox}
          checked={isChecked()}
          onChange={handleCheckboxChange}
          name={props.task.name}
          id={props.task.id.toString()}
        />
        <label for={props.task.id.toString()} class={styles.label}>
          {props.task.name}
          <p class={styles.checkmark}>
            <FaSolidSquareCheck stroke-width={2} width={24} height={24} />
          </p>
        </label>
      </div>
      <div class={styles["task-group"]}>
        <EditForm task={props.task} updateTask={props.updateTask} />
        <button
          class="text-white-50 bg-fuchsia-700 p-3 rounded-md  hover:bg-fuchsia-900"
          aria-label={`Delete ${props.task.name} Task`}
          onClick={() => props.deleteTask(props.task.id)}
        >
          <BsTrash3 stroke-width={2} width={24} height={24} />
        </button>
      </div>
    </li>
  );
};
export default TaskItem;
