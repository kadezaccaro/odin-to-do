import { list, Task, addTask } from "./taskRegistry";

export function editTask(listItem) {
  listItem.addEventListener("change", handleTaskChange);

  function handleTaskChange(event) {
    const taskElement = event.target.closest("li");
    const taskId = taskElement.dataset.id;
    const taskObj = list.find((task) => task.id == taskId);
    const inputVal = taskElement.querySelector('input[type="text"]').value;
    taskObj.title = inputVal;

    if (event.target.checked) {
      taskObj.complete = true;
      listItem.classList.add("complete");
    } else if (event.target.type === "checkbox" && !event.target.checked) {
      taskObj.complete = false;
      listItem.classList.remove("complete");
    }
  }
}

export function focusNextInputOnEnter() {
  const inputs = document.querySelectorAll('input[type="text"]');
  inputs.forEach((input, index) => {
    input.addEventListener("keydown", (event) => handleEnterKey(event, index));
  });

  function handleEnterKey(event, index) {
    if (event.key !== "Enter") return;

    const taskElement = event.target.closest("li");
    const taskId = taskElement.dataset.id;
    const taskObj = list.find((task) => task.id == taskId);

    if (isLastTask(taskObj)) {
      addTask(new Task(`Task ${Task.currentId}`, ""));
      // todo: focus input after adding
      console.log(inputs);
    } else {
      const nextIndex = (index + 1) % inputs.length;
      inputs[nextIndex].focus();
    }
  }

  function isLastTask(taskObj) {
    const lastTask = list[list.length - 1];
    return taskObj.id === lastTask.id;
  }
}
