export function handleNewProjectClick() {
  const newProjectBtn = document.querySelector(".new-project-btn");
  const modal = document.querySelector(".modal");
  const form = document.querySelector("form");
  const titleInput = form.querySelector("input");
  const projectsContainer = document.querySelector(".projects-container");
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
    createProjectLink();
    modal.close();
  });

  function createProjectLink() {
    const li = document.createElement("li");
    li.innerHTML = `
      <div class="project">
        <a class="project-link" href="#">${titleInput.value}</a>
        <i class="fa-regular fa-square-plus"></i>
      </div>
    `;

    projectsContainer.appendChild(li);
  }
}
