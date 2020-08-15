class db {
  constructor(databasename) {
    //Database name
    databasename = databasename || "todox-v1"

    //Open the database
    this.request = window.indexedDB.open(databasename)

    //Handle some events
    this.request.onsuccess = this.onsuccess
    this.request.onerror = this.onerror
    this.request.onupgradeneeded = this.onupgradeneeded

    this.objectStores = {}
  }
  upgradeneeded(evt) {
    let db = evt.target.result

    //Create object stores
    this.objectStores.lists = db.createObjectStore("lists", { keyPath: "id" })
    this.objectStores.tasks = db.createObjectStore("tasks", { keyPath: "id" })
    this.objectStores.meta = db.createObjectStore("meta")

    //Create search indexes
    this.onjectStores.lists.createIndex("name", "name", { unique: true })
    this.objectStores.tasks.createIndex("name", "name", { unique: false })
    this.objectStores.tasks.createIndex("date", "date", { unique: false })
    this.objectStores.tasks.createIndex("starred", "starred", { unique: false })
  }

  //Handle the error event
  error(evt) {
    this.onerror
      ? this.onerror(evt)
      : console.log("[indexedDB] Database error:" + this.request.errorCode)
  }

  //Database success event
  success(evt) {
    this.db = evt.target.result
    this.onsuccess
      ? this.onsuccess(evt)
      : console.log("[indexedDB] DB creation success")
  }

  //Add data to a objectStore
  add(objectStore, data, onerror, onsuccess) {
    let transaction = this.db.transacion([objectStore], "readwrite")
    transaction.onerrror =
      onerror || (evt => console.log("[indexedDB] DB Add error: " + evt))
    transaction.oncomplete =
      onsuccess || (evt => console.log("[indexedDB] Task success: " + evt))

    // Return the request object
    return transaction.objectStore(objectStore).add(data)
  }

  //Delete data from a store
  delete(objStore, id, onerror, onsuccess) {
    let transaction = this.db.transacion([objStore], "readwrite")
    transaction.onerrror =
      onerror || (evt => console.log("[indexedDB] DB Add error: " + evt))
    transaction.oncomplete =
      onsuccess || (evt => console.log("[indexedDB] Task success: " + evt))

    // Return the request object
    return transaction.objectStore(objStore).delete(id)
  }

  //Get data from a objectStore
  get(objStore, id, onerror, onsuccess) {
    let transaction = this.db.transacion([objStore], "readwrite")
    transaction.onerrror =
      onerror || (evt => console.log("[indexedDB] DB Add error: " + evt))
    transaction.oncomplete =
      onsuccess || (evt => console.log("[indexedDB] Task success: " + evt))

    // Return the request object
    return transaction.objectStore(objStore).get(id)
  }

  update(objStore, id, newData, onsuccess, onerror) {
    let transaction = this.db.transacion([objStore], "readwrite")
    transaction.onerrror =
      onerror || (evt => console.log("[indexedDB] DB Add error: " + evt))
    transaction.oncomplete =
      onsuccess || (evt => console.log("[indexedDB] Task success: " + evt))

    let objectStore = transaction.objectStore(objStore)
    objectStore.get(id).onsuccess = evt => {
      var data = evt.target.result
      data = { ...data, newData }

      return objectStore.put(data)
    }
  }

  getByIndex(objStore, index, value, onerror, onsuccess) {
    let transaction = this.db.transacion([objStore], "readwrite")
    transaction.onerrror =
      onerror || (evt => console.log("[indexedDB] DB Add error: " + evt))
    transaction.oncomplete =
      onsuccess || (evt => console.log("[indexedDB] Task success: " + evt))

    return transaction.objectStore(objStore).index(index).get(value)
  }

  getMultipleByKey(objStore, key, value, limit) {
    let store = this.db.transacion([objStore]).objctStore(objStore)
    let matched = []

    store.openCursor().onsucces = evt => {
      var cursor = evt.target.result
      if (cursor) {
        if (cursor.value[key] === value) {
          matched.push(cursor.value)
        }
        if (!limit || matched.length <= limit) {
          cursor.continue()
        }
      }
    }
    return matched
  }
}
