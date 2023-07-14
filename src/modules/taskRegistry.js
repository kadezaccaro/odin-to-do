import { renderTask } from "./renderTask";

export class Task {
  static currentId = 1;

  constructor(title, dueDate, complete = false) {
    this.title = title;
    this.dueDate = dueDate;
    this.id = Task.currentId++;
    this.complete = complete;
  }
}

export const list = [];

export function initTaskList() {
  addTask(new Task(`Task ${Task.currentId}`, ""));
  addTask(new Task(`Task ${Task.currentId}`, ""));
  addTask(new Task(`Task ${Task.currentId}`, ""));
}

export function handleAddBtnClick() {
  const btn = document.querySelector(".add-btn");
  btn.addEventListener("click", () => {
    addTask(new Task(`Task ${Task.currentId}`, ""));
  });
}

export function addTask(task) {
  list.push(task);
  renderTask(task);
}
