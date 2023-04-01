import { createEffect, createSignal, Component } from "solid-js";
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

const EditForm:Component = (props: EditFormProps) => {
  const [updatedTaskName, setUpdatedTaskName] = createSignal("");
  let dialogRef;

  const handleFormSubmit = (e) => {
    e.preventDefault();
    props.updateTask({ ...props.task, name: updatedTaskName() });
    dialogRef.close();
  };
  <dialog:HTMLDialogElement> </dialog:HTMLDialogElement>

  
  return (
    <>
    
      <button onClick={() => dialogRef.showModal()}>
        <HiOutlinePencilAlt width={24} height={24} />
      </button>
      <dialog ref={dialogRef} onClose={() => dialogRef.close()} class="mx-auto my-auto">
        <form method="dialog" onSubmit={handleFormSubmit} >
          <input onInput={(e)=>setUpdatedTaskName(e.target.value)}>
          </input>
          <button>
            <FaSolidSquareCheck stroke-width={2} height={24} width={24} />
          </button>
        </form>
      </dialog>
    

      {/* <button
        class="btn"
        onClick={() => {
          dialogRef.showModal();
        }}
      >
      </button>
      <dialog
        ref={(el) => dialogRef = el}
        role="dialog"
        aria-labelledby="editTask"
        class="modalTodo"
      >
        <form class="" onSubmit={handleFormSubmit} method="dialog">
          <div class="flex">
            <input
              ref={(el) => inputRef = el}
              type="text"
              id="editTask"
              class="input"
              value={updatedTaskName()}
              onInput={(e) => setUpdatedTaskName(e.target.value)}
              required
              maxLength={60}
              placeholder="Update Task"
            />
            <label for="editTask" class="label">
              Update Task
            </label>
            <button class="w-[200px] h-10" onClick={() => dialogRef.close()}>close</button>
            <button
              class="btn inline"
              aria-label={`Confirm edited task to now read ${updatedTaskName()}`}
              type="submit"
            >
              
            </button>
          </div>
        </form>
      </dialog> */}
    </>
  );
};
export default EditForm;
