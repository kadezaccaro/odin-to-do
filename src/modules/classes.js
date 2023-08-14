export class Project {
  constructor(title) {
    this.title = title;
    this.taskList = [];
    this.isActive = false;
    this.taskIdCounter = 1;
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
}

export class Task {
  static currentId = 1;

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
