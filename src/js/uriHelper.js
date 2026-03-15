

const getProject = () => {
  const hash = decodeURIComponent(window.location.hash.slice(1))
  const projectName = hash.split('/')[0];
  const projectNavItem = document.querySelector(`li[data-name="${projectName}"]`)

  return [projectName, projectNavItem]
}

const getTodo = () => {
  const hash = decodeURIComponent(window.location.hash.slice(1))
  const todoName = hash.split('/')[1];
  const todoNavItem = document.querySelector(`li[data-name="${todoName}"]`)

  return [todoName, todoNavItem]
}

export { getProject, getTodo }