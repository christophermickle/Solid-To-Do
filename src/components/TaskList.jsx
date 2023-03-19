import { createEffect, createSignal } from "solid-js";

// component import
import TaskItem from "../components/TaskItem";

// styles
import "./TaskList.css";

const TaskList = (props) => {
  const [sortedTasks, setSortedTasks] = createSignal([]);

  createEffect(() => {
    if (Array.isArray(props.tasks)) {
      setSortedTasks([...props.tasks].sort((a, b) => b.id - a.id));
    } else {
      setSortedTasks([]);
    }
  });

  return (
    <ul class='grid list-none gap[1.5em]'>
      {sortedTasks().map((task) => (
        <TaskItem
          task={task}
          deleteTask={props.deleteTask}
          toggleTask={props.toggleTask}
          enterEditMode={props.enterEditMode}
        />
      ))}
    </ul>
  );
};

export default TaskList;
