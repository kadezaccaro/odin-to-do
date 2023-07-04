export const DeleteTask = (list) => {
  const trashIcons = document.querySelectorAll(".fa-trash-can");
  trashIcons.forEach((icon) => {
    icon.addEventListener("click", handleDelete);
  });

  function handleDelete(event) {
    const liParent = event.target.parentElement.parentElement;
    const taskId = liParent.dataset.id;
    removeTaskById(taskId);
    liParent.remove();
  }

  function removeTaskById(taskId) {
    const index = list.findIndex((task) => task.id == taskId);
    list.splice(index, 1);
  }
};
