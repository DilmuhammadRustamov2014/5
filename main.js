const todoInput = document.getElementById('todo-input');
        const addTodoButton = document.getElementById('add-todo');
        const todoList = document.getElementById('todo-list');
        const toggleThemeButton = document.getElementById('toggle-theme');

        addTodoButton.addEventListener('click', () => {
            const text = todoInput.value.trim();
            if (text === '') return;

            const li = document.createElement('li');
            li.className = 'todo-item';
            li.innerHTML = `
                <label>
                    <input type="checkbox">
                    ${text}
                </label>
                <div class="actions">
                    <button class="edit">✏️</button>
                    <button class="delete">🗑️</button>
                </div>
            `;
            todoList.appendChild(li);
            todoInput.value = '';

            attachEvents(li);
        });

        function attachEvents(item) {
            const checkbox = item.querySelector('input[type="checkbox"]');
            const deleteButton = item.querySelector('.delete');

            checkbox.addEventListener('change', () => {
                item.classList.toggle('completed', checkbox.checked);
            });

            deleteButton.addEventListener('click', () => {
                item.remove();
            });
        }

        document.querySelectorAll('.todo-item').forEach(attachEvents);

        toggleThemeButton.addEventListener('click', () => {
            document.body.classList.toggle('light');
            toggleThemeButton.textContent = document.body.classList.contains('light') 
                ? 'Switch to Dark Mode' 
                : 'Switch to Light Mode';
        });
        document.addEventListener("DOMContentLoaded", () => {
            const todoInput = document.getElementById("todo-input");
            const addTodoButton = document.getElementById("add-todo");
            const todoList = document.getElementById("todo-list");
            function loadTodos() {
                const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
                todoList.innerHTML = "";
                savedTodos.forEach(todo => addTodoItem(todo.text, todo.completed));
            }
            function saveTodos() {
                const todos = Array.from(todoList.children).map(item => ({
                    text: item.querySelector("label").innerText.trim(),
                    completed: item.querySelector("input").checked
                }));
                localStorage.setItem("todos", JSON.stringify(todos));
            }
            function addTodoItem(text, completed = false) {
                const li = document.createElement("li");
                li.classList.add("todo-item");
                if (completed) li.classList.add("completed");
        
                li.innerHTML = `
                    <label>
                        <input type="checkbox" ${completed ? "checked" : ""}>
                        ${text}
                    </label>
                    <div class="actions">
                        <button class="edit">✏️</button>
                        <button class="delete">🗑️</button>
                    </div>
                `;
                li.querySelector("input").addEventListener("change", () => {
                    li.classList.toggle("completed");
                    saveTodos();
                });
                li.querySelector(".delete").addEventListener("click", () => {
                    li.remove();
                    saveTodos();
                });
                li.querySelector(".edit").addEventListener("click", () => {
                    const newText = prompt("Редактировать задачу:", text);
                    if (newText !== null && newText.trim() !== "") {
                        li.querySelector("label").innerText = newText;
                        saveTodos();
                    }
                });
        
                todoList.appendChild(li);
                saveTodos();
            }
            addTodoButton.addEventListener("click", () => {
                const text = todoInput.value.trim();
                if (text) {
                    addTodoItem(text);
                    todoInput.value = "";
                }
            });
            todoInput.addEventListener("keypress", (e) => {
                if (e.key === "Enter") {
                    addTodoButton.click();
                }
            })
            loadTodos();
        });