import { list, Task } from "./taskRegistry";

export function deleteTask() {
  const trashIcons = document.querySelectorAll(".fa-trash-can");
  trashIcons.forEach((icon) => {
    icon.addEventListener("click", handleDelete);
  });

  function handleDelete(event) {
    const taskElement = event.target.closest("li");
    const taskId = taskElement.dataset.id;
    removeTaskById(taskId);
    taskElement.remove();
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