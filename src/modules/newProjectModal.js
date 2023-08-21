import { initProject } from "./app";
import { destroyAllFlatpickrInstances } from "./dueDate";

export function handleNewProjectClick() {
  const newProjectBtn = document.querySelector(".new-project-btn");
  const modal = document.querySelector(".modal");
  const form = document.querySelector(".new-project-form");
  const titleInput = form.querySelector("input");
  const cancelBtn = document.querySelector(".cancel-btn");

  newProjectBtn.addEventListener("click", () => {
    modal.showModal();
    titleInput.value = "";
  });

  cancelBtn.addEventListener("click", () => {
    modal.close();
  });

  modal.addEventListener("click", (e) => {
    const dialogDimensions = modal.getBoundingClientRect();
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      modal.close();
    }
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const trimmedTitle = titleInput.value.trim();
    if (!trimmedTitle) {
      titleInput.setCustomValidity("Please enter a project title.");
      titleInput.reportValidity();
      return;
    }

    destroyAllFlatpickrInstances();
    initProject(trimmedTitle);
    modal.close();
  });

  // Make enter key submission mimic the behavior of clicking the submit button
  form.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      form.dispatchEvent(new Event("submit"));
    }
  });
}
