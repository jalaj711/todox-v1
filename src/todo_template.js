class Todo {
  /**
   *
   * @param {object} args This argument is an object that
   * determines all the arguments required to create a todo
   * item in the app.
   * 
   *
   */
  constructor({
    title,
    parent,
    description = null,
    reminder = null,
    deadline = null,
    starred = false,
    done = false,
    status = 0,
    priority = 1,
  }) {
    //These props are required
    if (title === null || parent === null) {
      throw Error(
        `Cannot create a todo without a ${title ? "parent" : "title"}`
      )
    } else {
      // Get the database
      window.database.get("lists", parent).onsuccess = evt => {
        //Check if the provided parent exists or not
        if (evt.target.result) {
          this.title = title
          this.parent = parent
          this.description = description
          this.reminder = reminder

          //Deadline should be a date object
          this.deadline = deadline.getMonth ? deadline : new Date(deadline)
          this.starred = starred
          this.done = done
          this.status = status
          this.priority = priority

          this.id = this.genId()

        } else {
          throw Error(
            `Cannot create a todo with a non-existent parent. (Provided parent "${parent}" was not found)`
          )
        }
      }
    }
  }

  genId() {
    let strings = "abcdefghijklmnpoqrstuvwxyzABCDEFGGHIJKLMNOPQRSTUVWXYZ1234567890_".split(
      ""
    )
    let length = 16
    let res = ""
    for (let x = 0; x < length; x++) {
      res += strings[Math.round(Math.random() * strings.length)]
    }
    return res
  }
}

class TodoList {
  constructor(name, oncreated) {
    window.database.getByIndex("lists", "name", name).onsuccess = event => {
      if (event.target.result) {
        throw Error(
          `The list ${name} already exists. Please  choose a different name`
        )
      } else {
        this.name = name
        this.id = this.genId()
        this.members = []
        oncreated()
      }
    }
  }
  genId() {
    let strings = "abcdefghijklmnpoqrstuvwxyzABCDEFGGHIJKLMNOPQRSTUVWXYZ1234567890_".split(
      ""
    )
    let length = 16
    let res = ""
    for (let x = 0; x < length; x++) {
      res += strings[Math.round(Math.random() * strings.length)]
    }
    return res
  }
}

export default { Todo: Todo, TodoList: TodoList }
