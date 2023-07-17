import { editTask, focusNextInputOnEnter } from "./editTask";
import { toggleDueDate } from "./dueDate";
import { deleteTask } from "./deleteTask";

export function renderTask(task) {
  const taskList = document.querySelector(".task-list");

  const listItem = document.createElement("li");
  listItem.innerHTML = `
    <div class="input-container">
      <input type="checkbox" name="task-checkbox" />
      <input onfocus="this.select();" type="text" name="task-input" value="${task.title}" autocomplete="off"/>
    </div>
    <div class="actions">
      <input type="text" class="due-date hide-due-date" id="date-input-${task.id}" name="due-date" autocomplete="off" />
      <i class="fa-regular fa-calendar-days"></i>
      <i class="fa-regular fa-trash-can"></i>
    </div>
  `;
  listItem.setAttribute("data-id", task.id);

  taskList.appendChild(listItem);

  focusNextInputOnEnter(listItem);
  toggleDueDate(listItem);
  editTask(listItem);
  deleteTask(listItem);
}
