import { handleLinkFocus, switchProject } from "./projectSwitching";
import { addTaskToProjectAndRender } from "./app";
import { editTask, focusNextInputOnEnter } from "./editTask";
import { toggleDueDate, createFlatpickrInstance } from "./dueDate";
import { deleteTask } from "./deleteTask";

export function renderProject(project) {
  renderProjectLink(project);
  renderTaskListContainer(project);
}

function renderProjectLink(project) {
  const projectsContainer = document.querySelector(".projects-container");

  const li = document.createElement("li");
  li.innerHTML = `
    <a class="project project-link" href="#">
      ${project.title}
      <i class="fa-regular fa-square-plus"></i>
    </a>
  `;

  projectsContainer.appendChild(li);

  // Activate the link by default when creating a new project
  handleLinkFocus();

  const projectLink = li.querySelector(".project-link");
  projectLink.addEventListener("click", (event) => {
    handleLinkFocus(event);
    switchProject(project);
  });
}

export function renderTaskListContainer(project) {
  const mainContainer = document.querySelector("main");
  mainContainer.innerHTML = `
      <div class="task-list-container">
        <header class="task-list-header">
          <h1>${project.title}</h1>
          <button class="add-btn">Add task</button>
        </header>
        <ul class="task-list"></ul>
      </div>
    `;

  const addBtn = mainContainer.querySelector(".add-btn");
  addBtn.addEventListener("click", () => {
    addTaskToProjectAndRender(project);
  });
}

export function renderTask(task, project) {
  const taskList = document.querySelector(".task-list");

  const listItem = document.createElement("li");
  listItem.innerHTML = `
      <div class="input-container">
        <input type="checkbox" name="task-checkbox" />
        <input onfocus="this.select();" type="text" name="task-input" value="${task.title}" autocomplete="off"/>
      </div>
      <div class="actions">
        <input type="text" class="due-date hide-due-date" id="date-input-${task.id}" name="due-date" placeholder="Select due date" autocomplete="off" />
        <i class="fa-regular fa-calendar-days"></i>
        <i class="fa-regular fa-trash-can"></i>
      </div>
    `;
  listItem.setAttribute("data-id", task.id);

  taskList.appendChild(listItem);

  editTask(listItem, project);
  focusNextInputOnEnter(listItem, project);
  toggleDueDate(listItem, task);
  deleteTask(listItem, project);

  checkCompletedTask(task);
  checkDueDate(task, listItem);
}

function checkCompletedTask(task) {
  if (task.completed) {
    const listItem = document.querySelector(`li[data-id="${task.id}"]`);
    const checkbox = listItem.querySelector('input[type="checkbox"]');
    listItem.classList.add("complete");
    checkbox.checked = true;
  }
}

function checkDueDate(task, listItem) {
  if (task.dueDate) {
    const dateInput = listItem.querySelector(".due-date");
    dateInput.value = task.dueDate;
    dateInput.classList.remove("hide-due-date");
    createFlatpickrInstance(dateInput, task);
  }
}
