import { Project, Task } from "./classes";
import { renderProject, renderTask } from "./render";

export const projects = [];

export function initProject(title) {
  const project = new Project(`${title}`);
  renderProject(project);
  projects.push(project);
  initTaskList(project);
  project.setActiveProject(project, projects);
  // TODO: reset numbering when project is initiated
}

function initTaskList(project) {
  for (let i = 0; i < 3; i++) {
    addTaskToProjectAndRender(project);
  }
}

export function addTaskToProjectAndRender(project) {
  const task = new Task(`Task ${Task.currentId}`, "");
  project.addTask(task);
  renderTask(task, project);
}
