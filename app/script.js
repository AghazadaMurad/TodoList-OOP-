"use strict";

const addBtn = document.getElementById("add");
const taskListContainer = document.querySelector(".taskList");
const taskList = document.querySelector(".taskList ul");
const addInput = document.getElementById("input");
const greet = document.querySelector(".greet");
const message = document.querySelector(".message");

let currentUser = undefined;
let users = [];

class Todo {
  todos = [];
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.displayName();
    this.addTodo();
    this.getLocalStorage();
    addBtn.addEventListener("click", this.addTodo.bind(this));
  }

  displaytodos() {
    taskList.innerHTML = "";
    this.showMessage();
    this.todos.forEach((todo, index) => {
      const li = document.createElement("li");
      const span = document.createElement("span");
      const button = document.createElement("button");

      span.textContent = todo;
      button.className = "btn";
      button.textContent = "Delete Task";
      li.append(span, button);
      taskList.append(li);

      button.addEventListener("click", this.deleteTodo.bind(this, index));
    });
  }

  deleteTodo(index) {
    this.todos.splice(index, 1);
    this.displaytodos();
    this.addToLocalStorage();
  }

  addToLocalStorage() {
    localStorage.setItem("todos", JSON.stringify(this.todos));
  }

  addTodo() {
    const todo = addInput.value.trim();
    if (!todo) return;
    this.todos.push(todo);
    addInput.value = "";
    this.displaytodos();
    this.addToLocalStorage();
  }

  showMessage() {
    message.style.display = this.todos.length ? "none" : "block";
  }

  displayName() {
    greet.textContent = `Hello, ${this.firstName} ${this.lastName}`;
  }

  getLocalStorage() {
    const fetchedTodos = JSON.parse(localStorage.getItem("todos"));
    if (!fetchedTodos) return;
    this.todos = fetchedTodos;
    this.displaytodos();
  }
}

const murad = new Todo("Murad", "Aghazda");

console.log(murad);
