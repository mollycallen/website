class TodoList {
  constructor() {
    this.list = [];
  }

  toggleCheck(todo) {
    // toogle boolean
    todo.completed = !todo.completed;

    const name = todo.row.children[0];
    const date = todo.row.children[1];
    const checkIcon = todo.row.children[3];
    name.classList.toggle("checked");
    date.classList.toggle("checked");
    checkIcon.classList.toggle("checked");

    // save the revised list in local storage
    this.saveListToStorage();
  }

  togglePriority(todo) {
    todo.priority = !todo.priority;
    const name = todo.row.children[0];
    const date = todo.row.children[1];
    const priorityIcon = todo.row.children[2];

    name.classList.toggle("priority");
    date.classList.toggle("priority");
    priorityIcon.classList.toggle("priority");

    // save the revised list in local storage
    this.saveListToStorage();
  }

  add(todo) {
    if (this.list.length === 0) {
      this.removeEmptyTodo();
    }
    // add new todo to list
    this.list.push(todo);
    //console.log(`adding ${todo}`);
    // save revised list to storage
    this.saveListToStorage();

    // build todo div in html
    this.buildRow(todo);
  }

  remove(todo) {
    //console.log(`removing ${todo}`);

    // find the index of the todo in the list
    const listIndex = this.list.indexOf(todo);
    // remove todo from list
    this.list.splice(listIndex, 1);
    // save revised list to storage
    this.saveListToStorage();

    // remove html
    // add a little animation
    todo.row.classList.add("remove");
    todo.row.addEventListener("transitionend", () => {
      todo.row.remove();
      if (this.list.length === 0) {
        this.showEmptyTodo();
      }
    });
  }

  buildRow(todo) {
    // make html for new todo

    // <div class="todo">
    //   <p class="todo-name">todo name</p>
    //   <p class="todo-date">date entered</p>
    //   <i class="fas fa-star"></i>
    //   <i class="fas fa-check-circle"></i>
    //   <i class="fas fa-trash-alt"></i>
    // </div>
    const listDiv = document.querySelector(".todo-list");
    todo.row = document.createElement("div");
    todo.row.classList.add("todo");

    const name = document.createElement("p");
    name.classList.add('todo-name');
    const date = document.createElement("p");
    date.classList.add('todo-date');
    // !! add formatting code
    date.innerText = 'added ' + todo.formatDate();

    if (todo.priority) {
      name.classList.add("priority");
      date.classList.add("priority");
    }
    if (todo.completed) {
      name.classList.add("checked");
      date.classList.add("checked");
    }
    name.innerText = todo.txt;


    // priority icon
    const priorityIcon = document.createElement("i");
    priorityIcon.setAttribute("title", "priority");
    priorityIcon.classList.add("fas", "fa-star");
    if (todo.priority) {
      priorityIcon.classList.add("priority");
    }

    // completed icon
    const checkIcon = document.createElement("i");
    checkIcon.setAttribute("title", "completed");
    checkIcon.classList.add("fas", "fa-check-circle");
    if (todo.completed) {
      checkIcon.classList.add("checked");
    }

    // delete icon
    const deleteIcon = document.createElement("i");
    deleteIcon.setAttribute("title", "delete");
    deleteIcon.classList.add("fas", "fa-trash-alt");

    // attach elements to parent
    todo.row.appendChild(name);
    todo.row.appendChild(date);
    todo.row.appendChild(priorityIcon);
    todo.row.appendChild(checkIcon);
    todo.row.appendChild(deleteIcon);
    listDiv.appendChild(todo.row);

    // add event listeners to icons
    priorityIcon.addEventListener("click", () => {
      this.togglePriority(todo);
    });
    checkIcon.addEventListener("click", () => {
      this.toggleCheck(todo);
    });
    deleteIcon.addEventListener("click", () => {
      this.remove(todo);
    });
  }

  removeEmptyTodo() {
    //console.log("hiding empty row");
    const emptyRow = document.querySelector(".empty");
    emptyRow.style.display = "none";
  }
  showEmptyTodo() {
    //console.log("show empty row");
    const emptyRow = document.querySelector(".empty");
    emptyRow.style.display = "block";
  }

  getListFromStorage() {
    // get todos from local storage if any exist
    let storageList = [];
    if (localStorage.getItem("todos") != null) {
      storageList = JSON.parse(localStorage.getItem("todos"));
    }
    storageList.forEach((item) => {
      // item is an array of values
      const todoArray = JSON.parse(item);
      const todo = new Todo(todoArray[0], todoArray[1], todoArray[2], todoArray[3]);
      this.add(todo);
    });
  }

  saveListToStorage() {
    // remove all values for key="todos" from local storage
    // and save list back to local storage
    localStorage.removeItem("todos");
    let storageList = [];
    this.list.forEach((todo) => {
      const todoArray = [todo.txt, todo.date, todo.completed, todo.priority];
      //console.log(todoArray);
      const todoValue = JSON.stringify(todoArray);
      storageList.push(todoValue);
    });
    localStorage.setItem("todos", JSON.stringify(storageList));
  }
}

// Todo class
class Todo {
  constructor(txt = "", date = Date.now(), completed = false, priority = false) {
    this.txt = txt;
    this.date = date; // saved as milliseconds
    this.completed = completed;
    this.priority = priority;
    this.row;
  }
  formatDate() {

    const formatter = new Intl.RelativeTimeFormat('en-us',
      { style: 'long', numeric: 'auto' });

    const DIVISIONS = [
      { amount: 60, name: 'seconds' },
      { amount: 60, name: 'minutes' },
      { amount: 24, name: 'hours' },
      { amount: 7, name: 'days' },
      { amount: 4.34524, name: 'weeks' },
      { amount: 12, name: 'months' },
      { amount: Number.POSITIVE_INFINITY, name: 'years' }
    ];
    const nowMilli = Date.now();
    const thenMilli = this.date;

    // needs to be negative to be in the past (ago, yesterday)
    let lapsedTime = (thenMilli - nowMilli) / 1000;

    for (let i = 0; i <= DIVISIONS.length - 1; i++) {
      const division = DIVISIONS[i]

      if (Math.abs(lapsedTime) < division.amount) {
        return formatter.format(Math.round(lapsedTime), division.name);
      }
      lapsedTime /= division.amount;
    }
  }
}


// create list
const todoList = new TodoList();
todoList.getListFromStorage();
const addBtn = document.querySelector(".add-button");
const printIcon = document.querySelector('.fa-print');

// Event Listeners

// add a new todo to the list
addBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const todoInput = document.querySelector(".todo-input");

  // don't add an empty todo
  if (todoInput.value != "") {
    const todo = new Todo(todoInput.value, Date.now(), false, false);
    todoList.add(todo);
    todoInput.value = "";
  }
});

printIcon.addEventListener('click', () => {
  window.print();
})
function updateDates() {
  if (todoList.list.length > 0) {
    todoList.list.forEach(todo => {
      const dateP = todo.row.children[1];
      dateP.innerText = todo.formatDate();
    });
  };
}

// update dates every minute
window.setInterval(updateDates, 60000);
