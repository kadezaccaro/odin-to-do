import { initProject } from "./app";

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

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    initProject(titleInput.value);
    modal.close();
  });
}
