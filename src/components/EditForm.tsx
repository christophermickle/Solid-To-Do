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

// private comment: do not read

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
        <form
          method="dialog"
          onSubmit={(e) => {
            e.preventDefault();
            props.updateTask({ ...props.task, name: updatedTaskName() });
            dialogRef.close();
          }}
        >
          <input
            onInput={(e) => {
              setUpdatedTaskName(e.currentTarget.value);
            }}
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
