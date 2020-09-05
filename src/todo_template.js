class Todo {
  /**
   *
   * @param {object} args This argument is an object that
   * determines all the arguments required to create a todo
   * item in the app.
   *
   *
   */
  constructor(
    {
      title,
      parent,
      description = null,
      reminder = null,
      deadline = null,
      notifTimeDelta = null,
      starred = false,
      done = false,
      status = 0,
      id = null,
    },
    onsuccess
  ) {
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
          this.notifTimeDelta = notifTimeDelta

          //Deadline should be a date object
          this.deadline = deadline
            ? deadline.getMonth
              ? deadline
              : new Date(deadline)
            : null
          this.starred = starred
          this.done = done
          this.status = status
          this.timeStamp = new Date()

          this.id = id || this.genId()

          if (typeof onsuccess === "function") onsuccess()
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
      res += strings[Math.floor(Math.random() * strings.length)]
    }
    return res
  }
}

class TodoList {
  constructor(name, oncreated, { id = null, onerror = undefined }) {
    if (window.database) {
      window.database.getByIndex("lists", "name", name).onsuccess = event => {
        if (event.target.result) {
          if (onerror) {
            onerror(
              `The list ${name} already exists. Please  choose a different name`
            )
          } else {
            throw Error(
              `The list ${name} already exists. Please  choose a different name`
            )
          }
        } else {
          this.name = name
          this.id = id || this.genId()
          this.members = []
          oncreated()
        }
      }
    } else {
      this.name = name
      this.id = id || this.genId()
      this.members = []
      console.log(name)
      oncreated()
    }
  }
  genId() {
    let strings = "abcdefghijklmnpoqrstuvwxyzABCDEFGGHIJKLMNOPQRSTUVWXYZ1234567890_".split(
      ""
    )
    let length = 16
    let res = ""
    for (let x = 0; x < length; x++) {
      res += strings[Math.floor(Math.random() * strings.length)]
    }
    return res
  }
}

export default { Todo: Todo, TodoList: TodoList }
