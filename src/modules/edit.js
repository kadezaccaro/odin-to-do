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

export function renameProject(li, project) {
  const dialog = li.querySelector(".rename-dialog");
  const form = li.querySelector(".rename-form");
  const input = dialog.querySelector("input");
  const link = li.querySelector(".project-link");
  const titleElement = link.querySelector(".project-title");

  link.addEventListener("click", openRenameDialog);

  function openRenameDialog(event) {
    const isRenameBtnClick = event.target.closest(".rename-btn");
    if (!isRenameBtnClick) return;

    // Only allow user to open one dialog at a time
    closeAllDialogs();
    dialog.show();

    const currentTitle = titleElement.textContent;

    input.value = currentTitle;
    input.focus();
    input.select();
  }

  function closeAllDialogs() {
    const dialogs = document.querySelectorAll("dialog");
    dialogs.forEach((dialog) => {
      dialog.close();
    });
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const trimmedTitle = input.value.trim();
    if (!trimmedTitle) {
      input.setCustomValidity("Please enter a project title.");
      input.reportValidity();
      return;
    }

    updateProjectTitle(trimmedTitle);
    dialog.close();
  });

  function updateProjectTitle(newTitle) {
    const h1 = document.querySelector("h1");

    titleElement.textContent = newTitle;
    h1.textContent = newTitle;
    project.title = newTitle;
  }
}
