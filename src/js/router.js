import { highlightSelectedItem, renderTodos, renderTodoView, addNewTodoButton } from "./dom"
import { getProject, getTodo } from "./uriHelper"
import { storageHelper } from "./storage"

const handleProjectRoute = () => {

  const [projectName, projectNavItem] = getProject()

  if (!projectName) {
    return false
  }
    
  if (!projectNavItem) {
    alert("Requested project does not exist.")
    return false
  }

  highlightSelectedItem(projectName, 'project')
  const currentProject = storageHelper.get('projects')[projectNavItem.id]
  renderTodos(currentProject.items, projectName)
  addNewTodoButton()

  return currentProject
}

const handleTodoRoute = (currentProject) => {
  if (!currentProject) return

  const [todoName, todoNavItem] = getTodo()

  if (todoName) {

    if (!todoNavItem) {
      alert("Requested task does not exist.")
      return
    }

    highlightSelectedItem(todoName, 'todo')
    
    renderTodoView(currentProject.items[todoNavItem.id])

  }
}

export { handleProjectRoute, handleTodoRoute }