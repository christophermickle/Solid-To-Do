import { createSignal, Component } from "solid-js";
import { HiOutlinePencilAlt } from "solid-icons/hi";
import { FaSolidSquareCheck } from "solid-icons/fa";

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

  const handleFormSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    props.updateTask({ ...props.task, name: updatedTaskName() });
    dialogRef.close();
  };
  return (
    <>
      <button onClick={() => dialogRef.showModal()}>
        <HiOutlinePencilAlt width={24} height={24} />
      </button>
      <dialog
        ref={dialogRef}
        onClose={() => dialogRef.close()}
        class="mx-auto my-auto"
      >
        <form method="dialog" onSubmit={handleFormSubmit}>
          <input
            onInput={(e: Event) =>
              setUpdatedTaskName((e.target as HTMLInputElement).value)
            }
          ></input>
          <button>
            <FaSolidSquareCheck stroke-width={2} height={24} width={24} />
          </button>
        </form>
      </dialog>
    </>
  );
};
export default EditForm;
