import { createMemo } from "solid-js";

// component import
import TaskItem from "./TaskItem";

// styles
import styles from "./TaskList.module.css";

interface Task {
  id: number;
  name: string;
  checked: boolean;
}

interface TaskListProps {
  tasks: () => Task[];
  deleteTask: (id: number) => void;
  toggleTask: (id: number) => void;
  updateTask: (task: Task) => void;
}

const TaskList = (props: TaskListProps) => {
  const sortedTasks = createMemo(() =>
    [...props.tasks()].sort((a, b) => b.id - a.id)
  );

  return (
    <ul class={styles.task}>
      {sortedTasks().map((task) => (
        <TaskItem
          task={task}
          deleteTask={props.deleteTask}
          toggleTask={props.toggleTask}
          updateTask={props.updateTask}
        />
      ))}
    </ul>
  );
};

export default TaskList;
