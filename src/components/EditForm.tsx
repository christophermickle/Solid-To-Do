import { createSignal, createEffect } from 'solid-js';

// library imports
import { FaSolidSquareCheck } from 'solid-icons/fa';
// { editedTask, updateTask, closeEditMode }
const EditForm = (props) => {
  const [updatedTaskName, setUpdatedTaskName] = createSignal(props.editedTask.name);


  const handleFormSubmit = (e) => {
    e.preventDefault();
    props.updateTask({...props.editedTask, name: updatedTaskName()}
    )
  }
  let dialogRef;

  return (
    <dialog ref={dialogRef}
      onClose={props.closeEditMode(dialogRef.current)}
      role="dialog"
      aria-labelledby="editTask"
      onClick={(e) => {e.target === e.currentTarget && dialogRef.close()}}
      >
      <form
        class="todo"
        onSubmit={handleFormSubmit}
        method="dialog"
        >
        <div class="wrapper">
          <input
            type="text"
            id="editTask"
            class="input"
            value={updatedTaskName()}
            onChange={(e) => setUpdatedTaskName(e.target.value)}
            required
            autofocus
            maxLength={60}
            placeholder="Update Task"
          />
          <label
            for="editTask"
            class="label"
          >Update Task</label>
        </div>
        <button
          class="btn"
          aria-label={`Confirm edited task to now read ${updatedTaskName()}`}
          type="submit"
          >
          <FaSolidSquareCheck stroke-width={2} height={24} width={24} />
        </button>
      </form>
    </dialog>
  )
}
export default EditForm