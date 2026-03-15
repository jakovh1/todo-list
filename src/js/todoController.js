import { Todo } from "./todo"
import { newTodoFormData } from "./dom"
import { storageHelper } from "./storage"

const createTodo = (projectId, data) => {
  
  const localStorageProjectsCopy = storageHelper.get('projects')

  if (projectId in localStorageProjectsCopy) {
    const newTodo = new Todo(data.name, data.description, data.dueDate, data.priority)
    localStorageProjectsCopy[projectId].items[newTodo.id] = newTodo
    localStorageProjectsCopy[projectId].itemOrder.push(newTodo.id)

    storageHelper.set('projects', localStorageProjectsCopy)
    return newTodo
  }
  
  return false
}

const handleTodoCreation = (projectNavItem) => {

  if (projectNavItem) {
    return createTodo(projectNavItem.id, newTodoFormData())
  }

  alert("The Project does not exist.")
  return false

}

const updateTodo = (projectId, todoId, data) => {

  const localStorageProjectsCopy = storageHelper.get('projects')

  if (projectId in localStorageProjectsCopy && todoId in localStorageProjectsCopy[projectId].items) {
    localStorageProjectsCopy[projectId].items[todoId].name = data.name
    localStorageProjectsCopy[projectId].items[todoId].description = data.description
    localStorageProjectsCopy[projectId].items[todoId].dueDate = data.dueDate
    localStorageProjectsCopy[projectId].items[todoId].priority = data.priority
    storageHelper.set('projects', localStorageProjectsCopy)
    return localStorageProjectsCopy[projectId].items[todoId]
  }

  alert("Either the project or the to-do (or both) do not exist.")
  return false
}

const handleTodoUpdate = (projectNavItem, todoNavItem) => {

  if (projectNavItem && todoNavItem) {
    return updateTodo(projectNavItem.id, todoNavItem.id, newTodoFormData())
  } else {
    alert("Either the project or the to-do (or both) do not exist.")
    return false
  }
  
}

const deleteTodo = (projectId, todoId) => {
  let localStorageProjectsCopy = storageHelper.get('projects')

  if (projectId in localStorageProjectsCopy && todoId in localStorageProjectsCopy[projectId].items) {
    delete localStorageProjectsCopy[projectId].items[todoId]
    localStorageProjectsCopy[projectId].itemOrder = localStorageProjectsCopy[projectId].itemOrder.filter(item => item !== todoId)
    storageHelper.set('projects', localStorageProjectsCopy)
    return true
  }

  alert("Either the project or the to-do (or both) do not exist.")
  return false 
}

const handleTodoDeletion = (projectNavItem, todoNavItem) => {

  if (projectNavItem && todoNavItem) {
    return deleteTodo(projectNavItem.id, todoNavItem.id)
  } else {
    alert("Either the project or the to-do (or both) do not exist.")
    return false
  }

}

export { handleTodoCreation, handleTodoUpdate, handleTodoDeletion }