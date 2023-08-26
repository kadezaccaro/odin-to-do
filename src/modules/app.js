import { Project, Task } from "./classes";
import { getSavedProjects, saveProjects } from "./localStorage";
import { renderProject, renderTask } from "./render";
import { switchProject, handleLinkFocus } from "./projectSwitching";

export const projects = getSavedProjects() || [];

export function initWithSavedProjects() {
  for (const project of projects) {
    renderProject(project);

    for (const task of project.taskList) {
      renderTask(task, project);
    }
  }

  // On page refresh, switch to first project
  const firstProject = projects[0];
  switchProject(firstProject);
}

export function initProject(title) {
  const project = new Project(title);
  renderProject(project);
  projects.push(project);
  initTaskList(project);
  project.setActiveProject(projects);
  handleLinkFocus();
}

function initTaskList(project) {
  for (let i = 0; i < 3; i++) {
    addTaskToProjectAndRender(project);
  }
}

export function addTaskToProjectAndRender(project) {
  const task = new Task(`Task ${project.taskIdCounter}`);
  project.addTask(task);
  renderTask(task, project);
  saveProjects();
}
