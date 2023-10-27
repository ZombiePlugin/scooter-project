class User {
  constructor(username, password, age) {
    this.username = username;
    this.password = password;
    this.age = age;
    let loggedIn = false;
  }
  login(password) {
    if (password === this.password) {
      loggedIn = true;
    } else {
      throw new Error("incorrect password");
    }
  }
  logout() {
    loggedIn = false;
  }
}

module.exports = User;
