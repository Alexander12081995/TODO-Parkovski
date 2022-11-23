export const todos = {
  todoList: [],
  anotherTask(taskName, completed) {
    const newTask = {
      id: Math.random(),
      taskName,
      completed,
    };
    this.todoList.push(newTask);
  },
  deleteTask(taskId) {
    this.todoList = this.todoList.filter((task) => task.id !== taskId);
  },
};
