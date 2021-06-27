/*using a function to
 get the target elements
*/

//Select DOM
function getElement(elment){
  
  return document.querySelector(elment)
  
 }
 
 
 //getting elements by caalling getElement function
 const todoInput = getElement(".todo-input");
 const todoButton = getElement(".todo-button");
 const todoList = getElement(".todo-list");
 const filterOption = getElement(".filter-todo");




/*
using function to add 
addEventListener s
*/

const eventListener=(variable,action,func)=>{
  return variable.addEventListener(action,func)
}

//calling eventListener function 
eventListener(document,"DOMContentLoaded", getTodos);
eventListener(todoButton,"click", addTodo);
eventListener(todoList,"click", deleteTodo);
eventListener(filterOption,"click", filterTodo);




/*--------------------------------Functions-----------------------------*/

/*-----add todo function----*/
function addTodo(e) {

  //Prevent natural behaviour 
  e.preventDefault();
  
  //if input field is not empty
    if (todoInput.value) {
      
      const newTodo = document.createElement("li");
      const todoDiv = document.createElement("div");
      todoDiv.classList.add("todo");

      //Create list
      newTodo.innerText = todoInput.value;
       saveLocalTodos(todoInput.value);
       newTodo.classList.add("todo-item");
       todoDiv.appendChild(newTodo);
       todoInput.value = "";

       //Create Completed Button
       const completedButton = document.createElement("button");
       completedButton.innerHTML = `<i class="fas fa-check"></i>`;
       completedButton.classList.add("complete-btn");
       todoDiv.appendChild(completedButton);

       //Create trash button
       const trashButton = document.createElement("button");
       trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
       trashButton.classList.add("trash-btn");
       todoDiv.appendChild(trashButton);

       //attach final Todo
       todoList.appendChild(todoDiv);
     }

     //if input field is empty 
     else{

      alert("please type in some task")
     }
  
  
}


/*-------delete todo function--------*/

function deleteTodo(e) {
  const item = e.target;

  if (item.classList[0] === "trash-btn") {

    // e.target.parentElement.remove();
    const todo = item.parentElement;
    todo.classList.add("fall");

    //at the end
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", e => {
      todo.remove();
    });
  }
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
    console.log(todo);
  }
}


/*-------filter todo function-----*/

/*changing the traditional loop
 to a forEach function
imperative to declarative 
 */ 
function filterTodo(e) {
  const todos = todoList.childNodes;
    todos.forEach(function(todo) {
      switch (e.target.value) {
        case "all":
          todo.style.display = "flex";
          break;
        case "completed":
          if (todo.classList.contains("completed")) {
            todo.style.display = "flex";
          } else {
            todo.style.display = "none";
          }
          break;
        case "uncompleted":
          if (!todo.classList.contains("completed")) {
            todo.style.display = "flex";
          } else {
            todo.style.display = "none";
          }
      }
    });

}

/*-----save todo in local storage function----*/

function saveLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}
function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

/*--------get todo function------*/

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  
    //from traditional for loop to map function
    //imperative to declarative 
      todos.map((todo)=>{

    //Create todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //Create list
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    todoInput.value = "";

    //Create Completed Button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = `<i class="fas fa-check"></i>`;
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    //Create trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    //attach final Todo
    todoList.appendChild(todoDiv);
  });
}
