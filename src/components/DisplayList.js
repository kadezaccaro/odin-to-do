import { EditTask } from "./EditTask";
import { DeleteTask } from "./DeleteTask";

export const DisplayList = (list) => {
  const taskList = document.querySelector(".task-list");
  taskList.innerHTML = ""; // Clear before rendering to prevent duplicates

  list.forEach((task) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
      <div class="input-container">
        <input type="checkbox" />
        <input type="text" value="${task.title}"/>
      </div>
      <div class="actions">
        <!-- <span class="due-date">July 20, 2023 @ 12:00 AM</span> -->
        <i class="fa-regular fa-calendar-days"></i>
        <i class="fa-regular fa-trash-can"></i>
      </div>
    `;
    listItem.setAttribute("data-id", task.id);
    taskList.appendChild(listItem);

    EditTask(listItem, list);
  });

  DeleteTask(list);
};
