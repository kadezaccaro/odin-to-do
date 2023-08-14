import { flatpickrInstances, destroyFlatpickrInstance } from "./dueDate";

export function deleteTask(listItem, project) {
  const trashIcon = listItem.querySelector(".fa-trash-can");
  trashIcon.addEventListener("click", handleDelete);

  function handleDelete() {
    const taskId = listItem.dataset.id;
    removeTaskById(taskId);
    listItem.remove();
    clearFlatpickr();
  }

  function removeTaskById(taskId) {
    const index = project.taskList.findIndex((task) => task.id == taskId);
    project.taskList.splice(index, 1);

    // Reset task numbering if all tasks are deleted
    if (project.taskList.length === 0) {
      project.taskIdCounter = 1;
    }
  }

  function clearFlatpickr() {
    const dateInput = listItem.querySelector(".due-date");
    const instance = flatpickrInstances.get(dateInput);
    if (instance) {
      destroyFlatpickrInstance(dateInput);
    }
  }
}
