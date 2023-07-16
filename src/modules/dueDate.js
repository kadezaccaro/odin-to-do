import flatpickr from "flatpickr";
import "flatpickr/dist/themes/dark.css";

export function toggleDueDate(listItem) {
  const dateInput = listItem.querySelector(".due-date");
  const calendarIcon = listItem.querySelector(".fa-calendar-days");

  calendarIcon.addEventListener("click", () => {
    dateInput.classList.toggle("hide-due-date");
    handleDatePicker(dateInput);
  });
}

const flatpickrInstances = new Map();

function handleDatePicker(dateInput) {
  const instance = flatpickrInstances.get(dateInput);
  const isDateVisible = !dateInput.classList.contains("hide-due-date");

  if (isDateVisible) {
    if (!instance) {
      createFlatpickrInstance(dateInput);
    }
  } else {
    if (instance) {
      destroyFlatpickrInstance(dateInput);
    }
  }
}

function createFlatpickrInstance(dateInput) {
  const newInstance = flatpickr(dateInput, {
    enableTime: true,
    dateFormat: "M j, Y h:i K",
    defaultDate: new Date(),
  });
  flatpickrInstances.set(dateInput, newInstance);
}

function destroyFlatpickrInstance(dateInput) {
  const instance = flatpickrInstances.get(dateInput);
  instance.destroy();
  flatpickrInstances.delete(dateInput);
}
