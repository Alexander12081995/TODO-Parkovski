export const todos = {
  todoList: [],
  setTodos(todos) {
    this.todoList = todos;
  },

  anotherTask(taskName, completed) {
    const newTask = {
      id: Math.random(),
      taskName,
      completed,
    };
    this.todoList.unshift(newTask);
  },
  deleteTask(taskId) {
    this.todoList = this.todoList.filter((task) => task.id !== taskId);
  },
};
