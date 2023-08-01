import { addTaskToProjectAndRender } from "./app";

export function editTask(listItem, project) {
  const taskId = listItem.dataset.id;
  const taskObj = project.taskList.find((task) => task.id == taskId);
  const checkbox = listItem.querySelector('input[type="checkbox"]');

  listItem.addEventListener("change", handleChange);
  checkbox.addEventListener("click", handleCheckbox);

  function handleChange() {
    const inputVal = listItem.querySelector('input[name="task-input"]').value;
    taskObj.title = inputVal;
  }

  function handleCheckbox() {
    taskObj.toggleCompleted();
    listItem.classList.toggle("complete");
  }
}

export function focusNextInputOnEnter(listItem, project) {
  const taskId = listItem.dataset.id;
  const taskObj = project.taskList.find((task) => task.id == taskId);
  const input = listItem.querySelector('input[name="task-input"]');

  input.addEventListener("keydown", handleEnterKey);

  function handleEnterKey(event) {
    if (event.key !== "Enter") return;

    if (isLastTask(taskObj)) {
      addTaskToProjectAndRender(project);
    } else {
      const nextListItem = listItem.nextElementSibling;
      nextListItem.querySelector('input[name="task-input"]').focus();
    }
  }

  function isLastTask(taskObj) {
    const lastTask = project.taskList[project.taskList.length - 1];
    return taskObj.id === lastTask.id;
  }
}
