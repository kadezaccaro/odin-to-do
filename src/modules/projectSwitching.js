import { renderTaskListContainer, renderTask } from "./render";
import { projects } from "./app";
import { destroyAllFlatpickrInstances } from "./dueDate";

export function switchProject(project) {
  clearProject();
  renderTaskListContainer(project);

  // Loop through the tasks in the project and render each task
  for (const task of project.taskList) {
    renderTask(task, project);
  }

  project.setActiveProject(projects);
  handleLinkFocus();
}

export function clearProject() {
  const mainContainer = document.querySelector("main");
  mainContainer.innerHTML = "";

  destroyAllFlatpickrInstances();
}

export function handleLinkFocus() {
  const projectLinks = document.querySelectorAll(".project-link");
  const activeProject = projects.find((project) => project.isActive === true);

  // Deactivate all project links before activation
  projectLinks.forEach((link) => link.classList.remove("active"));

  if (activeProject) {
    const activeProjectLink = document.querySelector(
      `.projects-container li[data-id="${activeProject.id}"] .project-link`
    );
    activeProjectLink.classList.add("active");
  }
}
