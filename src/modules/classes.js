export class Project {
  constructor(title) {
    this.title = title;
    this.taskList = [];
    this.isActive = false;
    this.taskIdCounter = 1;
    this.id = Project.getNextProjectId();
  }

  addTask(task) {
    task.id = this.taskIdCounter++;
    this.taskList.push(task);
  }

  setActiveProject(project, projects) {
    // Deactivate all projects before activating the current project
    for (const proj of projects) {
      proj.isActive = false;
    }

    project.isActive = true;
  }

  static getNextProjectId() {
    if (!Project.projectIdCounter) {
      Project.projectIdCounter = 1;
    }
    return Project.projectIdCounter++;
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
