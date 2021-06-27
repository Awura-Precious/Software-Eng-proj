//Select DOM
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteTodo);
filterOption.addEventListener("click", filterTodo);



//Functions
function addTodo(e) {
  //Prevent natural behaviour
  e.preventDefault();
  
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
     else{

      alert("please type in some notes")
     }
  
  
}

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

function filterTodo(e) {
  const todos = todoList.childNodes;
  for(var i=0; i<todos.length; ++i){
 
  

     switch (e.target.value) {
       case "all":
          todos[i].style.display = "flex";
         break;
       case "completed":
         if (todos[i].classList.contains("completed")) {
          todos[i].style.display = "flex";
         } else {
          todos[i].style.display = "none";
         }
         break;
       case "uncompleted":
         if (!todos[i].classList.contains("completed")) {
          todos[i].style.display = "flex";
         } else {
          todos[i].style.display = "none";
         }
     }
    

  };

}

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


function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  
    for(var i=0; i<todos.length;i++){
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
  };
}
