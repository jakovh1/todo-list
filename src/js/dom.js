import closeButtonSvg from '!!raw-loader!../assets/icons/close.svg'

const createElement = (tag, options = {}) => {
  const el = document.createElement(tag);

  if (options.class) el.classList.add(...[].concat(options.class));
  if (options.text) el.textContent = options.text;
  if (options.html) el.innerHTML = options.html;
  if (options.attrs) {
    for (const [key, value] of Object.entries(options.attrs)) {
      if (value === false || value === null || value === undefined) continue;
      el.setAttribute(key, value);
    }
  }
  if (options.onClick) el.addEventListener("click", options.onClick);
  if (options.onInput) el.addEventListener("input", options.onInput);


  return el;
}

// Projects sidebar UI

const newProjectComponent = () => {
  const divContainer = createElement('div', { class: ["new-project-component"] })
  const headerContainer = createElement('div', { class: ["new-project-header"] })
  const heading = createElement('h3', { text: "Create New Project" })
  const closeButton = createElement('button', {
    class: ['close-button'],
    html: closeButtonSvg,
    onClick: () => removeNewProjectComponent()
  })

  headerContainer.append(heading, closeButton)

  const ProjectNameInput = createElement('input', { 
    class: ["name-input"],
    "onInput": () => toggleCreateProjectButton(),
    attrs: { id: "project-name-input", type: "text", placeholder: "Project Name" } })

  const createProjectButton = createElement('button', { 
    text: "Create Project", 
    class: ["create-project-button"],
    attrs: { id: "create-project-button", disabled: true} 
  })

  divContainer.append(headerContainer, ProjectNameInput, createProjectButton);
  return divContainer;
}

const addNewProjectComponent = (button) => {
  const projectsContainer = document.getElementById("projects-container")
  projectsContainer.append(newProjectComponent())
  
  button.style.display = "none"
}

const removeNewProjectComponent = () => {
  document.querySelector('.new-project-component').remove()
  document.getElementById('new-project-button').style.display = "block"
}

const addNewProjectButton = () => {
  const projectsContainer = document.getElementById("projects-container")
  projectsContainer.append(createElement('button', { 
    text: 'New Project', 
    onClick: (e) => addNewProjectComponent(e.target),
    attrs: { id: 'new-project-button' }
  }))
}

const toggleCreateProjectButton = () => {
  const projectNameInput = document.getElementById("project-name-input")
  const createProjectButton = document.getElementById("create-project-button")
  
  createProjectButton.disabled = projectNameInput.value.trim() === ""
  
}

const createListItem = (key, item, itemType, projectName = '') => {

  const itemContainer = createElement('li', {
    class: [itemType + '-item'],
    attrs: {
      id: key,
      'data-name': item.name
    }
  })

  const itemHeading = createElement('h5', {
    text: item.name
  })

  const a = createElement('a', {
    class: [itemType + '-link'],
    attrs: {
      href: itemType === 'todo' ? '#' + projectName + '/' + item.name : '#'+item.name
    }
  })

  a.append(itemHeading)
  if (itemType == 'project') {
    itemContainer.addEventListener('click', () => {
      document.getElementById('todo-view').innerHTML = ""
    })
  }

  itemContainer.append(a)
  return itemContainer
}

const renderProjects = (projects) => {
  const projectList = document.getElementById('projects')
  projectList.innerHTML = ""
  Object.keys(projects).forEach(key => projectList.append(createListItem(key, projects[key], 'project')))
}

const highlightSelectedItem = (selectedItem, type) => {
  const previouslySelectedProject = document.querySelector('.' + type + '-item.active')

  if (previouslySelectedProject) {
    previouslySelectedProject.classList.remove('active')
  }

  document.querySelector(`li[data-name="${selectedItem}"]`).classList.add('active')
}

// Todos sidebar

const renderTodos = (todos, currentProjectName) => {
  const todosList = document.getElementById('todos')
  todosList.innerHTML = ''
  Object.keys(todos).forEach(key => todosList.append(createListItem(key, todos[key], 'todo', currentProjectName)))
}

// Todo View

const addNewTodoButton = () => {
  if (document.getElementById('new-todo-button') === null) {

    const button = createElement('button', {
      text: "New Todo",
      attrs: {
        id: "new-todo-button"
      }
    })

    document.getElementById('todos-container').append(button)
    button.addEventListener('click', () => {
      window.location.hash = decodeURIComponent(window.location.hash).split('/')[0]
      renderTodoView()
    })

  }
}

const inputWrapper = (child) => {
  const div = createElement('div', {
                class: ['input-wrapper']
              })
  div.append(child)
  return div
}

const renderTodoForm = (idValue, nameValue, descriptionValue, dueDateValue, priorityValue) => {
  const isDisabled = Boolean(nameValue)
  
  const todoForm = createElement('form', {
    attrs: { id: "todo-form" }
  })

  const todoNameLabel = createElement('label', {
    text: "Name:",
    attrs: {
      for: 'todo-name-input'
    }
  })

  todoNameLabel.append(createElement('input', {
    class: ['todo-form-input'],
    attrs: {
      type: "text",
      name: "name",
      value: nameValue,
      id: "todo-name-input",
      placeholder: "Todo's name",
      minlength: "3",
      required: "true",
      disabled: isDisabled
    }
  }))

  const todoDescriptionLabel = createElement('label', {
    text: 'Description',
    attrs: {
      for: 'todo-description-input'
    }
  })

  todoDescriptionLabel.append(createElement('textarea', {
    text: descriptionValue,
    class: ['todo-form-input'],
    attrs: {
      name: "description",
      id: "todo-description-input",
      rows: "3",
      cols: "30",
      placeholder: "Todo's Description",
      disabled: isDisabled
    }
  }))

  const todoDueDateLabel = createElement('label', {
    text: 'Due Date',
    attrs: {
      for: 'due-date-input'
    }
  })

  todoDueDateLabel.append(createElement('input', {
    class: ['todo-form-input'],
    attrs: {
      name: "dueDate",
      value: dueDateValue,
      type: "date",
      id: "due-date-input",
      required: "true",
      disabled: isDisabled
    }
  }))

  const todoPriorityLabel = createElement('label', {
    text: 'Priority: ',
    attrs: {
      for: 'priority',

    }
  })

  const todoPriority = createElement('select', {
    class: ['todo-form-input'],
    attrs: {
      name: "priority",
      id: "priority",
      disabled: isDisabled
    }
  });

  ["low", "medium", "high"].forEach(element => {
    let selectItem = createElement('option', {
      text: element.charAt(0).toUpperCase() + element.slice(1),
      attrs: {
        value: element
      }
    })
    
    todoPriority.append(selectItem)
  })
  todoPriority.value = priorityValue
  todoPriorityLabel.append(todoPriority)

  todoForm.append(inputWrapper(todoNameLabel), inputWrapper(todoDescriptionLabel), inputWrapper(todoDueDateLabel), inputWrapper(todoPriorityLabel), createButton(isDisabled))
  document.getElementById('todo-view').append(todoForm)
  
}

const renderTodoView = (todo = {}) => {
  document.getElementById('todo-view').innerHTML = ''
  renderTodoForm(todo.id, todo.name, todo.description, todo.dueDate, todo.priority)
}

const createButton = (isShowTodo) => {
  let wrapper;

  if (isShowTodo) {
    const button = createElement('button', {
      text: 'Edit Todo',
      attrs: {
        id: 'edit-todo-button'
      }
    })

    wrapper = inputWrapper(button)

    const deleteButton = createElement('button', {
      text: 'Delete Todo',
      attrs: {
        id: 'delete-todo-button'
      }
    })

    wrapper.append(deleteButton)
  } else {
    const button = createElement('input', {
      attrs: {
        id: 'save-todo-button',
        value: 'Save Todo',
        type: 'submit'
      }
    })
    wrapper = inputWrapper(button)
  }
  return wrapper
}

const newTodoFormData = () => {
  const todoForm = document.getElementById('todo-form')
  const data = Object.fromEntries((new FormData(todoForm)).entries())
  
  return data
}

const enableEditMode = (editButton) => {
  document.querySelectorAll('.todo-form-input').forEach(input => {
    input.disabled = false
  })
  editButton.remove()

  document.getElementById('todo-form').append(createButton(false))
}

export { addNewProjectButton, newProjectComponent, renderProjects, removeNewProjectComponent, highlightSelectedItem, addNewTodoButton, newTodoFormData, renderTodos, renderTodoView, enableEditMode }