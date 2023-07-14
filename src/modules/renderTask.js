import { editTask, focusNextInputOnEnter } from "./editTask";
import { deleteTask } from "./deleteTask";

export function renderTask(task) {
  const taskList = document.querySelector(".task-list");

  const listItem = document.createElement("li");
  listItem.innerHTML = `
    <div class="input-container">
      <input type="checkbox" name="task-checkbox" />
      <input onfocus="this.select();" type="text" name="task-input" value="${task.title}"/>
    </div>
    <div class="actions">
      <span class="due-date">July 20, 2023 @ 12:00 AM</span>
      <i class="fa-regular fa-calendar-days"></i>
      <i class="fa-regular fa-trash-can"></i>
    </div>
  `;
  listItem.setAttribute("data-id", task.id);

  taskList.appendChild(listItem);

  focusNextInputOnEnter();
  editTask(listItem);
  deleteTask();
}
