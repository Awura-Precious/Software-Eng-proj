describe('testing add.js', () => {

    beforeAll(() => {
        document.body.innerHTML = `
        <header>
            <h1>My Todo List</h1>
        </header>
        <form>
            <input type="text" class="todo-input" />
            <button class="todo-button" type="submit">
            <i class="fas fa-plus-square"></i>
            </button>
            <div class="select">
                <select name="todos" class="filter-todo">
                    <option value="all">All</option>
                    <option value="completed">Completed</option>
                    <option value="uncompleted">Uncompleted</option>
                </select>
            </div>
        </form>
        <div class="todo-container">
            <ul class="todo-list"></ul>
        </div>
    `

        require('../app.js');
    });

    test('Adds a todo', () => {
        document.querySelector('.todo-input').value = "Awura";
        document.querySelector('.todo-button').click();

        expect(document.querySelector('.todo-list').children).toHaveLength(1);
        expect(document.querySelector('.todo-item').innerText).toMatch("Awura");
        expect(document.querySelector('.complete-btn').innerHTML).toMatch(`<i class="fas fa-check"></i>`);
        expect(document.querySelector('.trash-btn').innerHTML).toMatch(`<i class="fas fa-trash"></i>`)
    });

    test('delete todo',()=>{
        document.querySelector('.trash-btn').click();
        expect(document.querySelector('.todo-item').parentElement.classList).toContain('fall')
    })

    test('filters by completed',()=>{
        document.querySelector('.filter-todo').value = "completed"
        document.querySelector('.filter-todo').click()
        expect(document.querySelector('.todo-list').childNodes[0].style.display).toMatch('none');
    })

    test('filter by all',()=>{
        document.querySelector('.filter-todo').value='all'
        document.querySelector('.filter-todo').click()
        expect(document.querySelector('.todo-list').childNodes[0].style.display).toMatch('flex');
    })

    test('filter by uncompleted',()=>{
        document.querySelector('.filter-todo').value='uncompleted'
        document.querySelector('.filter-todo').click()
        expect(document.querySelector('.todo-list').childNodes[0].style.display).toMatch('flex');
    })

    test('saving todo to localstorage',()=>{
        
    })
})