import database from "./database"

class Todo {
  /**
   *
   * @param {object} args This argument is an object that
   * determines all the arguments required to create a todo
   * item in the app.
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
      let db = new database()
      db.onsuccess = evt => {
        db.get("lists", parent).onsuccess = evt => {
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
          } else {
            throw Error(
              `Cannot create a todo with a non-existent parent. (Provided parent "${parent}" was not found)`
            )
          }
        }
      }
    }
  }
}
