import { list, Task } from "./taskRegistry";

export function deleteTask(listItem) {
  const trashIcon = listItem.querySelector(".fa-trash-can");
  trashIcon.addEventListener("click", handleDelete);

  function handleDelete() {
    const taskId = listItem.dataset.id;
    removeTaskById(taskId);
    listItem.remove();
  }

  function removeTaskById(taskId) {
    const index = list.findIndex((task) => task.id == taskId);
    list.splice(index, 1);

    // Reset task numbering if all tasks are deleted
    if (list.length === 0) {
      Task.currentId = 1;
    }
  }
}
