import { createElement } from "./dom"

const newProjectComponent = () => {
  const divContainer = createElement('div', { class: ["new-project-component"] })
  const heading = createElement('h3', { text: "Create New Project" })
  const ProjectNameInput = createElement('input', { class: ["name-input"], attrs: { type: "text", placeholder: "Project Name" } })
  const createProjectButton = createElement('button', { 
    text: "Create Project", 
    class: ["create-project-button"],
    attrs: { disabled: true} })

  divContainer.append(heading, ProjectNameInput, createProjectButton);
}

export { newProjectComponent }