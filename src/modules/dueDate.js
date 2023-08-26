import flatpickr from "flatpickr";
import "flatpickr/dist/themes/dark.css";
import { saveProjects } from "./localStorage";

export function toggleDueDate(listItem, task) {
  const dateInput = listItem.querySelector(".due-date");
  const calendarIcon = listItem.querySelector(".fa-calendar-days");

  calendarIcon.addEventListener("click", () => {
    dateInput.classList.toggle("hide-due-date");
    handleDatePicker(dateInput, task);
  });
}

export const flatpickrInstances = new Map();

function handleDatePicker(dateInput, task) {
  const instance = flatpickrInstances.get(dateInput);
  const isDateVisible = !dateInput.classList.contains("hide-due-date");

  if (isDateVisible) {
    if (!instance) createFlatpickrInstance(dateInput, task);
  } else {
    if (instance) destroyFlatpickrInstance(dateInput);
    task.dueDate = "";
  }
}

export function createFlatpickrInstance(dateInput, task) {
  const newInstance = flatpickr(dateInput, {
    enableTime: true,
    dateFormat: "M j, Y h:i K",
    onChange: (selectedDates, dateStr) => {
      task.dueDate = dateStr;
    },
  });

  flatpickrInstances.set(dateInput, newInstance);
  saveProjects();
}

export function destroyFlatpickrInstance(dateInput) {
  const instance = flatpickrInstances.get(dateInput);
  instance.destroy();
  flatpickrInstances.delete(dateInput);
}

export function destroyAllFlatpickrInstances() {
  flatpickrInstances.forEach((instance) => {
    instance.destroy();
  });

  flatpickrInstances.clear();
}
