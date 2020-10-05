const todoForm = document.querySelector(".js-todoForm"),
    todoInput = todoForm.querySelector("input"),
    todoList = document.querySelector(".js-todoList");

const TODOS_LS = 'todos';

let todos = [];

function deleteTodo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    todoList.removeChild(li);
    const cleanTodos = todos.filter(function(todo){
        return todo.id !== parseInt(li.id);
    })               // 배열중에 함수가 true인 값만 가져온다.
    console.log(cleanTodos);
    todos = cleanTodos;
    saveTodos();
}

function saveTodos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(todos));  // 그냥 저장하면 OBJECT라고만 뜬다. local storage는 string으로 저장하려고 한다.
}

function paintTodo(text) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = todos.length + 1
    delBtn.innerHTML = "X";
    delBtn.addEventListener("click", deleteTodo);
    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(span);    
    li.id = newId;              // 아이디 지정, 삭제용
    todoList.appendChild(li);
    const todoObj = {
        text: text,
        id: newId
    };
    todos.push(todoObj);
    saveTodos(); 
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = todoInput.value;
    paintTodo(currentValue);
    todoInput.value = "";
}

function loadTodos(){
    const loadTodos = localStorage.getItem(TODOS_LS);
    if (loadTodos !== null) {
        const parsedTodos = JSON.parse(loadTodos);          // string -> object
        parsedTodos.forEach(function(todo) {                // foreach = array내부 값 하나씩 함수를 실행한다.
            paintTodo(todo.text);
        });
    }
}

function init() {
    loadTodos();
    todoForm.addEventListener("submit", handleSubmit)
}

if (null !==localStorage.getItem(USER_LS)){
    init();
}
