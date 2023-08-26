import "./styles.css";
import { initWithSavedProjects, initProject } from "./modules/app";
import { handleNewProjectClick } from "./modules/newProjectModal";
import { getSavedProjects } from "./modules/localStorage";

const savedProjects = getSavedProjects();

if (savedProjects && savedProjects.length > 0) {
  initWithSavedProjects();
} else {
  initProject("Untitled");
}

handleNewProjectClick();
