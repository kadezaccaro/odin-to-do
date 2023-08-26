import { projects } from "./app";
import { Project, Task } from "./classes";

export function saveProjects() {
  localStorage.setItem("projects", JSON.stringify(projects));
}

export function getSavedProjects() {
  const savedProjectsData = JSON.parse(localStorage.getItem("projects"));
  if (!savedProjectsData) return null;
  return reconstructProjectsFromData(savedProjectsData);
}

// Convert retrieved data (plain JS objects) back into instances of Project class
function reconstructProjectsFromData(savedProjectsData) {
  return savedProjectsData.map((projectData) => {
    const project = new Project(projectData.title);
    Object.assign(project, projectData);

    project.taskList = projectData.taskList.map((taskData) => {
      const task = new Task(taskData.title);
      Object.assign(task, taskData);
      return task;
    });

    return project;
  });
}
