import { DisplayList } from "./DisplayList";

export class Task {
  static currentId = 1;

  constructor(title) {
    this.title = title;
    this.id = Task.currentId++;
  }
}

export const AddTask = () => {
  const list = [];

  const btn = document.querySelector(".add-btn");
  btn.addEventListener("click", () => {
    addToList(new Task(`Task ${Task.currentId}`));
  });

  function addToList(task) {
    list.push(task);
    DisplayList(list);
  }
};
