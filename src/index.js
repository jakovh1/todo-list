import "./styles.scss";
import { addNewProjectButton,
         removeNewProjectComponent, 
         renderProjects, 
         renderTodos,
         renderTodoView,
         enableEditMode } from "./js/dom";
import { Project } from "./js/project.js"
import { storageHelper } from "./js/storage.js";
import { createProject } from "./js/projectCreationHandler.js";
import { handleTodoCreation, handleTodoUpdate, handleTodoDeletion } from "./js/todoController.js"
import { getProject, getTodo } from "./js/uriHelper.js";
import { handleProjectRoute, handleTodoRoute } from "./js/router.js";

document.addEventListener('click', (event) => {
  if (event.target.id == 'create-project-button') {

    const newProject = createProject()
    renderProjects(storageHelper.get('projects'))
    removeNewProjectComponent()
    
    window.location.hash = newProject.name
  } else if (event.target.id == 'save-todo-button') {
      event.preventDefault()
      
      const [projectName, projectNavItem] = getProject()
      const [todoName, todoNavItem] = getTodo()

      if (!todoName) {
        
        const newTodo = handleTodoCreation(projectNavItem, projectName)
        if (newTodo) {
          renderTodos(storageHelper.get('projects')[projectNavItem.id].items, projectName)
          window.location.hash = `${projectName}/${newTodo.name}`
        }
        

      } else if (handleTodoUpdate(projectNavItem, todoNavItem)) {

        renderTodoView(storageHelper.get('projects')[projectNavItem.id].items[todoNavItem.id])

      }
      
  } else if (event.target.id == 'delete-todo-button') {
    const [projectName, projectNavItem] = getProject()
    const [todoName, todoNavItem] = getTodo()

    if (handleTodoDeletion(projectNavItem, todoNavItem)) {
      document.getElementById('todo-view').innerHTML = ''
      renderTodos(storageHelper.get('projects')[projectNavItem.id].items, projectName)
      window.location.hash = projectName
    }
    
  } else if (event.target.id == 'edit-todo-button') {
    enableEditMode(event.target)
  }
})

window.addEventListener('hashchange', () => {

  const currentProject = handleProjectRoute()
  handleTodoRoute(currentProject)
  
})

window.addEventListener('load', () => {
  
  const currentProject = handleProjectRoute()
  handleTodoRoute(currentProject)

})


if (storageHelper.get('projects') === null) {
  const inboxProject = new Project('Inbox')
  storageHelper.set('projects', {...inboxProject.toJSON()})
}

renderProjects(storageHelper.get('projects'))
addNewProjectButton()
document.querySelector('a[href="#Inbox"]').click()