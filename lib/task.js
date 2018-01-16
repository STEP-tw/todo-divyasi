class Task {
  constructor(title) {
    this.title = title;
    this.status = false;
  }
  setTitle (title) {
    this.title = title;
  }
  setStatus (status) {
    this.status = status;
  }
  getStatus () {
    return this.status;
  }
  getTitle () {
    return this.title;
  }
}


module.exports = Task;
