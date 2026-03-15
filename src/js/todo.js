export class Todo {

  constructor(name, description, dueDate, priority) {
    this.id = crypto.randomUUID()
    this.name = name
    this.description = description
    this.dueDate = dueDate
    this.priority = priority
    this.status = 'pending'
  }


}