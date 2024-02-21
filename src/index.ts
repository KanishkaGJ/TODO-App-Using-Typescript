import { v4 as uuidv4 } from 'uuid'
console.log(uuidv4())

type Task = {
    id:string, 
    title:string, 
    completed:boolean, 
    createdAt:Date
}

const list = document.querySelector<HTMLUListElement>('#list')
const form = document.querySelector('#form') as HTMLFormElement | null
const input = document.querySelector<HTMLInputElement>('#inputBox')

const tasks: Task[] = loadTasks()
tasks.forEach(addListItem)

form?.addEventListener("submit", e => {
    e.preventDefault()

    if (input?.value == "" || input?.value == null) return

    const newTask = {
        id: uuidv4(),
        title: input.value,
        completed: false,
        createdAt: new Date()
    }
    tasks.push(newTask)

    addListItem(newTask)
    input.value = ""
})

function addListItem(task: Task ) {
    const item = document.createElement('li')
    const label = document.createElement('label')
    const checkbox = document.createElement('input')

    checkbox.addEventListener("change", () => {
        task.completed = checkbox.checked
        console.log(tasks)
        saveTasks()
    })

    checkbox.type = 'checkbox'
    checkbox.checked = task.completed
    label.append(checkbox, task.title)
    item.append(label)
    list?.append(item)
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

function loadTasks() {
    const tasks = localStorage.getItem('tasks')
    if (tasks == null) return [] 
    return JSON.parse(tasks)  
}

