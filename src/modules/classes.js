import { v4 as uuidv4 } from "uuid";

export class Project {
  constructor(title) {
    this.title = title;
    this.taskList = [];
    this.isActive = false;
    this.taskIdCounter = 1;
    // Assign a unique UUID to each project
    this.id = uuidv4();
  }

  addTask(task) {
    task.id = this.taskIdCounter++;
    this.taskList.push(task);
  }

  setActiveProject(projects) {
    // Deactivate all projects before activating the current project
    for (const proj of projects) {
      proj.isActive = false;
    }

    this.isActive = true;
  }
}

export class Task {
  constructor(title) {
    this.title = title;
    this.dueDate = "";
    this.id = null;
    this.completed = false;
  }

  toggleCompleted() {
    this.completed = !this.completed;
  }
}
