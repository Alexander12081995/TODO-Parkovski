import { todos } from "./store.js";

const ul = document.querySelector("ul");
const addTask = document.querySelector(".addTask");
const form = document.querySelector(".form");
const buttonThemeLight = document.querySelector(".button_theme__light");
const buttonThemeDark = document.querySelector(".button_theme__dark");

buttonThemeLight.addEventListener("click", () => {
  const themeName = document.body.getAttribute("data-theme");
  if (themeName !== "light") {
    document.body.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
  }
});

buttonThemeDark.addEventListener("click", () => {
  const themeName = document.body.getAttribute("data-theme");
  if (themeName !== "dark") {
    document.body.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  }
});

function renderTodo() {
  ul.innerHTML = null;
  todos.todoList.forEach((todo) => {
    ul.innerHTML += `
        <li class="list_task">
        <div>
          <p>"${todo.taskName}"</p>
              <div class="completed">
                <input type="checkbox" class="checkbox" data-checkbox-id="${todo.id}">
                <p class="completed_checkbox">"${todo.completed}"</p>
              </div>
        </div>  
        
          
        <div class="group_button">
        <button type="submit" data-edit-id="${todo.id}" class="task_edit">Изменить</button>
        <button type="submit" data-delete-id="${todo.id}" class="task_delete">Удалить</button>
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

function deleteTodo() {
  ul.addEventListener("click", (e) => {
    const taskId = e.target.getAttribute("data-delete-id");
    if (taskId) {
      todos.deleteTask(Number(taskId));
      renderTodo();
    }
  });
}

addTodo();
deleteTodo();
