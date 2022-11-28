import { todos } from "./store.js";

const ul = document.querySelector("ul");
const addTask = document.querySelector(".addTask");
const form = document.querySelector(".form");
const buttonThemeLight = document.querySelector(".button_theme__light");
const buttonThemeDark = document.querySelector(".button_theme__dark");
const searchInput = document.querySelector(".search_input");
const buttonCompleted = document.querySelector(".button-comleted");

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

const themeFromStorage = localStorage.getItem("theme");
document.body.setAttribute("data-theme", themeFromStorage);

function renderTodo() {
  ul.innerHTML = null;
  if (todos.todoList.length === 0) {
    const text = document.createElement("p");
    text.classList.add("text_task");
    text.textContent = "СПИСОК ЗАДАЧ ПУСТ";
    return ul.append(text);
  }
  todos.todoList.forEach((todo) => {
    ul.innerHTML += `
        <li class="${todo.checked ? "list_task task_theme" : "list_task"}">
        <div>
          <p>${todo.taskName}</p>
              <div class="completed">
                <input type="checkbox" class="checkbox" data-checkbox-id="${
                  todo.id
                }" ${todo.checked ? "checked" : ""}>
                <p class="completed_checkbox">Выполнено</p>
              </div>
        </div>  
        
          
        <div class="group_button">
        <button type="submit" data-edit-id=${
          todo.id
        } class="task_edit">Изменить</button>
        <button type="submit" data-delete-id=${
          todo.id
        } class="task_delete">Удалить</button>
        </div>
        </li>
        `;
  });
}

function checkTask() {
  ul.addEventListener("click", (e) => {
    const checkId = e.target.getAttribute("data-checkbox-id");
    let taskId = todos.todoList.find((item) => item.id === +checkId);
    if (taskId) {
      taskId.checked = !taskId.checked;
    }
    localStorage.setItem("tasks", JSON.stringify(todos.todoList));
    renderTodo();
  });
}

function addTodo() {
  const task = {};
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
      localStorage.setItem("tasks", JSON.stringify(todos.todoList));
    }
  });
}

function taskCompleted() {
  buttonCompleted.addEventListener("click", (e) => {
    todos.todoList = todos.todoList.filter((todo) => todo.checked === true);
    renderTodo();
  });
}

taskCompleted();

function deleteTodo() {
  ul.addEventListener("click", (e) => {
    const taskId = e.target.getAttribute("data-delete-id");
    if (taskId) {
      todos.deleteTask(Number(taskId));
      localStorage.setItem("tasks", JSON.stringify(todos.todoList));
      renderTodo();
    }
  });
}

function searchTask() {
  searchInput.addEventListener("input", (e) => {
    if (e.target.value === "") {
      todos.todoList = JSON.parse(localStorage.getItem("tasks"));
    }
    todos.todoList = JSON.parse(localStorage.getItem("tasks"));
    todos.todoList = todos.todoList.filter(
      (todo) => todo.taskName.includes(e.target.value) === true
    );
    renderTodo();
  });
}

checkTask();
searchTask();
let todosFromStorage = JSON.parse(localStorage.getItem("tasks")) || [];
todos.setTodos(todosFromStorage);
renderTodo();
addTodo();
deleteTodo();
