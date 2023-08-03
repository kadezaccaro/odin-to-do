import { initProject } from "./app";
import { destroyAllFlatpickrInstances } from "./dueDate";

export function handleNewProjectClick() {
  const newProjectBtn = document.querySelector(".new-project-btn");
  const modal = document.querySelector(".modal");
  const form = document.querySelector("form");
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
    destroyAllFlatpickrInstances();
    initProject(titleInput.value);
    modal.close();
  });
}
