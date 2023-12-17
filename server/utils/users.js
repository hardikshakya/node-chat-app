class Users {
  // Initialize an empty array of users
  constructor() {
    this.users = [];
  }

  // Method to add a user
  addUser(id, name, room) {
    const user = { id, name, room };
    this.users.push(user);
    return user;
  }

  // Method to remove a user
  removeUser(id) {
    const user = this.getUser(id);

    if (user) {
      this.users = this.users.filter((user) => user.id !== id);
    }

    return user;
  }

  // Method to get a user by id
  getUser(id) {
    return this.users.find((user) => user.id === id);
  }

  // Method to get a list of users in a room
  getUserList(room) {
    const users = this.users.filter((user) => user.room === room);
    const namesArray = users.map((user) => user.name);

    return namesArray;
  }
}

module.exports = { Users };
