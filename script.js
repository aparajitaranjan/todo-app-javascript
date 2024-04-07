document.addEventListener("DOMContentLoaded", function () {
  const todoForm = document.querySelector(".todo-form");
  const todoInput = document.querySelector(".todo-input");
  const todoList = document.querySelector(".todo-list");
  const todoSubmit = document.querySelector(".todo-submit");

  let editMode = false;
  let editItem = null;

  // Load tasks from local storage when the page loads
  loadTasks();

  todoForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const todoText = todoInput.value.trim();
    if (todoText !== "") {
      if (editMode) {
        editItem.firstChild.textContent = todoText;
        todoSubmit.innerText = "Add Todo";
        editMode = false;
        editItem = null;
      } else {
        addTodoItem(todoText);
      }
      // Save tasks to local storage after adding or editing
      saveTasks();
      todoInput.value = "";
    } else {
      alert("Please Enter a valid Task");
    }
  });

  todoList.addEventListener("click", function (e) {
    const target = e.target;
    if (target.tagName === "BUTTON") {
      const todoItem = target.parentNode;
      if (target.innerText === "❌") {
        todoItem.remove(); //delete todo
      } else if (target.innerText === "🖊") {
        editMode = true;
        editItem = todoItem;
        todoSubmit.innerText = "Edit Todo";
        todoInput.value = todoItem.firstChild.textContent;
        todoForm.focus();
      }
      // Save tasks to local storage after deleting
      saveTasks();
    }
  });

  function addTodoItem(todoText) {
    const todoItem = document.createElement("li");
    const editButton = document.createElement("button");
    const deleteButton = document.createElement("button");

    todoItem.innerHTML = `<span>${todoText}</span>`;
    editButton.innerText = "🖊";
    deleteButton.innerText = "❌";

    todoItem.appendChild(editButton);
    todoItem.appendChild(deleteButton);
    todoList.appendChild(todoItem);
  }

  function saveTasks() {
    const tasks = [];
    todoList.querySelectorAll("li").forEach(function (todoItem) {
      tasks.push(todoItem.querySelector("span").textContent);
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    if (tasks) {
      tasks.forEach(function (task) {
        addTodoItem(task);
      });
    }
  }
});
