import { renderTaskListContainer, renderTask } from "./render";
import { projects } from "./app";
import { destroyAllFlatpickrInstances } from "./dueDate";

export function handleLinkFocus(event) {
  const projectLinks = document.querySelectorAll(".project-link");
  projectLinks.forEach((link) => link.classList.remove("active"));

  if (event) {
    // If a click event occurs on a project link or its dropdown menu, activate the link
    const closestProjectLink = event.target.closest(".project-link");
    if (closestProjectLink) {
      closestProjectLink.classList.add("active");
    }
  } else {
    // Make newly-created project links active by default
    const newProjectIndex = projectLinks.length - 1;
    projectLinks[newProjectIndex].classList.add("active");
  }
}

export function switchProject(project) {
  clearProject();
  renderTaskListContainer(project);

  // Loop through the tasks in the project and render each task
  for (const task of project.taskList) {
    renderTask(task, project);
  }

  project.setActiveProject(project, projects);
}

export function clearProject() {
  const mainContainer = document.querySelector("main");
  mainContainer.innerHTML = "";

  destroyAllFlatpickrInstances();
}
