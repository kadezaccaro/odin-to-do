import { flatpickrInstances, destroyFlatpickrInstance } from "./dueDate";
import { projects } from "./app";
import { clearProject, switchProject } from "./projectSwitching";
import { Project } from "./classes";
import { saveProjects } from "./localStorage";

export function deleteTask(listItem, project) {
  const trashIcon = listItem.querySelector(".fa-trash-can");
  trashIcon.addEventListener("click", handleDelete);

  function handleDelete() {
    const taskId = listItem.dataset.id;
    removeTaskById(taskId);
    listItem.remove();
    clearFlatpickr();
    saveProjects();
  }

  function removeTaskById(taskId) {
    const index = project.taskList.findIndex((task) => task.id == taskId);
    project.taskList.splice(index, 1);

    // Reset task numbering if all tasks are deleted
    if (project.taskList.length === 0) {
      project.taskIdCounter = 1;
    }
  }

  function clearFlatpickr() {
    const dateInput = listItem.querySelector(".due-date");
    const instance = flatpickrInstances.get(dateInput);
    if (instance) {
      destroyFlatpickrInstance(dateInput);
    }
  }
}

export function deleteProject(li) {
  const deleteBtn = li.querySelector(".delete-btn");
  const projectLink = li.querySelector(".project-link");

  deleteBtn.addEventListener("click", handleDelete);

  function handleDelete() {
    const projectId = li.dataset.id;
    removeProjectById(projectId);
    li.remove();
    saveProjects();

    if (!projectLink.classList.contains("active")) return;

    const firstProject = projects[0];
    if (!firstProject) {
      clearProject();
    } else {
      switchProject(firstProject);
    }
  }

  function removeProjectById(projectId) {
    const index = projects.findIndex((project) => project.id == projectId);
    projects.splice(index, 1);
  }
}
