import { createSignal, Component } from "solid-js";
import { HiOutlinePencilAlt } from "solid-icons/hi";
import { FaSolidSquareCheck } from "solid-icons/fa";

import styles from "TaskItem.module.css";

interface Task {
  id: number;
  name: string;
  checked: boolean;
}

interface EditFormProps {
  task: Task;
  updateTask: (task: Task) => void;
}

const EditForm: Component<EditFormProps> = (props) => {
  const [updatedTaskName, setUpdatedTaskName] = createSignal("");
  let dialogRef: HTMLDialogElement;

  return (
    <>
      <button onClick={() => dialogRef.showModal()}>
        <HiOutlinePencilAlt
          stroke-width={2}
          class="w-14 h-14 rounded-md bg-violet-700 p-2 hover:bg-violet-900 transition-all"
          width={24}
          height={24}
        />
      </button>
      <dialog
        ref={dialogRef}
        onClose={() => dialogRef.close()}
        class="mx-auto my-auto w-full h-full  bg-[hsl(245,15%,10%)]rounded-md shadow-xl relative top-0 rounded-xl"
      >
        <form
          method="dialog"
          class="flex flex-col items-center justify-center h-full w-full"
          onSubmit={(e) => {
            e.preventDefault();
            props.updateTask({ ...props.task, name: updatedTaskName() });
            dialogRef.close();
          }}
        >
          <del class="text-zinc-300 text-3xl">
            <h2 class="text-fuchsia-700 text-center text-5xl mb-12">
              {props.task.name}
            </h2>
          </del>
          <div class="relative">
            <div class="flex gap-4">
              <input
                type="text"
                value={updatedTaskName()}
                placeholder="update task"
                class="peer placeholder-transparent input"
                id="updateText"
                onInput={(e) => {
                  setUpdatedTaskName(e.currentTarget.value);
                }}
              ></input>
              <label
                for="updateText"
                class="text-zinc-300 absolute peer-placeholder-shown:-top-0 -top-12 transition-all peer-focus:-top-12 peer-focus:bg-stone-900 peer-focus:text-1xl rounded-lg p-1 peer-focus:mt-4 placeholder-shown:mt-3"
              >
                Updated task?
              </label>
              <button>
                <FaSolidSquareCheck
                  stroke-width={2}
                  height={24}
                  width={24}
                  class="h-16 text-violet-700 w-16"
                />
              </button>
            </div>
          </div>
        </form>
      </dialog>
    </>
  );
};
export default EditForm;
