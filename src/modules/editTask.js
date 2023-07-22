import { list, Task, addTask } from "./taskRegistry";

export function editTask(listItem) {
  const taskId = listItem.dataset.id;
  const taskObj = list.find((task) => task.id == taskId);
  const checkbox = listItem.querySelector('input[type="checkbox"]');

  listItem.addEventListener("change", () => handleChange(taskObj, listItem));
  checkbox.addEventListener("click", () => handleCheckbox(taskObj, listItem));

  function handleChange(taskObj, listItem) {
    const inputVal = listItem.querySelector('input[name="task-input"]').value;
    taskObj.title = inputVal;
  }

  function handleCheckbox(taskObj, listItem) {
    taskObj.complete = listItem.querySelector('input[type="checkbox"]').checked;
    listItem.classList.toggle("complete", taskObj.complete);
  }
}

export function focusNextInputOnEnter(listItem) {
  const taskId = listItem.dataset.id;
  const taskObj = list.find((task) => task.id == taskId);
  const input = listItem.querySelector('input[name="task-input"]');

  input.addEventListener("keydown", handleEnterKey);

  function handleEnterKey(event) {
    if (event.key !== "Enter") return;

    if (isLastTask(taskObj)) {
      addTask(new Task(`Task ${Task.currentId}`, ""));
    } else {
      const nextListItem = listItem.nextElementSibling;
      nextListItem.querySelector('input[name="task-input"]').focus();
    }
  }

  function isLastTask(taskObj) {
    const lastTask = list[list.length - 1];
    return taskObj.id === lastTask.id;
  }
}
