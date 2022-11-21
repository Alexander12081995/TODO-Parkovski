import { todos } from "./store.js";

const ul = document.querySelector("ul");
const addTask = document.querySelector(".addTask");
const form = document.querySelector(".form");

function renderTodo() {
  ul.innerHTML = null;
  todos.todoList.forEach((todo) => {
    ul.innerHTML += `
        <li class="list_task">
        <p>
        "${todo.taskName}"
        </p>
        <div class="group_button">
        <button type="submit" class="task_eddit">Изменить</button>
        <button type="submit" class="task_delete">Удалить</button>
        </div>
        </li>
        `;
  });
}

function addTodo() {
  const task = {
    completed: false,
  };
  addTask.addEventListener("click", (e) => {
    e.preventDefault();

    const inputTask = document.querySelector(".inputTask");
    task[inputTask.name] = inputTask.value;

    if (inputTask.value === "") {
      alert("ВВЕДИТЕ ЗАДАЧУ");
    } else {
      todos.anotherTask(task.taskName, task.completed);
      form.reset();
      renderTodo();
    }
  });
}

function deleteTodo() {}
addTodo();
