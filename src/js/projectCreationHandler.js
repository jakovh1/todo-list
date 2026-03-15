import { storageHelper } from "./storage";
import { Project } from "./project";

const createProject = () => {
  const projectName = document.getElementById('project-name-input').value

    if (projectName.length > 0) {
      const newProject = new Project(projectName)

      let projects = storageHelper.get('projects')
      
      projects = {
        ...projects,
        ...newProject.toJSON()
      }
      storageHelper.set('projects', projects)
      return newProject
    } else {
      alert("Please enter the project name.")
    }
}

export { createProject }