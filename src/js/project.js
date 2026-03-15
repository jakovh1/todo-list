export class Project {

  #id = crypto.randomUUID()
  #items = {}

  constructor(name) {
    this.name = name
  }

  get id() {
    return this.#id
  }

  toJSON() {
    return {
      [this.#id]: {
        name: this.name,
        items: this.#items,
        itemOrder: []
      }
    }
  }
}

