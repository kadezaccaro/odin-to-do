export const EditTask = (listItem, list) => {
  listItem.addEventListener("change", handleTaskChange);

  function handleTaskChange(event) {
    const taskElement = event.target.closest("li");
    const taskId = taskElement.dataset.id;
    const taskObj = list.find((task) => task.id == taskId);
    const inputVal = taskElement.querySelector('input[type="text"]').value;
    taskObj.title = inputVal;
  }
};
