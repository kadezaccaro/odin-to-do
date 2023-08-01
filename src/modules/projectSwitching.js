import { renderTaskListContainer, renderTask } from "./render";
import { projects } from "./app";

export function handleLinkFocus(event) {
  const projectLinks = document.querySelectorAll(".project-link");
  projectLinks.forEach((link) => link.classList.remove("active"));

  if (event) {
    event.target.classList.add("active");
  } else {
    // Add "active" class to newly created project links by default
    const newProjectIndex = projectLinks.length - 1;
    projectLinks[newProjectIndex].classList.add("active");
  }
}

export function switchProject(project) {
  const mainContainer = document.querySelector("main");
  mainContainer.innerHTML = "";

  renderTaskListContainer(project);

  // Loop through the tasks in the project and render each task
  for (const task of project.taskList) {
    renderTask(task, project);
  }

  project.setActiveProject(project, projects);
}
