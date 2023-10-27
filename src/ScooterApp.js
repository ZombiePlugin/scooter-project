const User = require("./User");
const Scooter = require("./Scooter");

class ScooterApp {
  constructor() {
    const stations = { Paddington: [], Wembley: [], Battersea: [] };
    const registeredUsers = {};
  }
  registerUser(username, password, age) {
    if (username in this.registeredUsers === false && age >= 18) {
      this.registeredUsers[username] = new User(username, password, age);
      console.log("user has been registered");
      return this.registeredUsers[username];
    } else {
      throw new Error("already registered or too young to register");
    }
  }
  loginUser(username, password) {
    if (
      username in this.registeredUsers === false ||
      this.registeredUsers[username] != password
    ) {
      throw new Error("username or password is incorrect");
    } else {
      this.registeredUsers[username].login(password);
      console.log("user has been logged in");
    }
  }
  logoutUser(username) {
    if (username in this.registeredUsers) {
      this.registeredUsers[username].logout;
      console.log("user is logged out");
    } else {
      throw new Error("no such user is logged in");
    }
  }
  createScooter(station) {
    if (station in this.stations) {
      new Scooter(station);
      console.log("created new scooter");
    } else {
      throw new Error("no such station");
    }
  }
  dockScooter(scooter, station) {
    if (station in this.stations != true) {
      throw new Error("no such station");
    } else if (scooter in this.stations[station]) {
      throw new Error("scooter already at station");
    } else {
      stations[station].push(scooter);
      scooter.dock();
      console.log("scooter is docked");
    }
  }
  rentScooter(scooter, user) {
    for (const key in this.stations) {
      for (let i = 0; i < stations[key].length; i++) {
        if (stations[key][i] === scooter) {
          stations[key].splice(i, 1);
          scooter.rent(user);
          return;
        }
      }
    }
    throw new Error("scooter already rented");
  }
  print() {
    console.log(this.registeredUsers);
    console.log(this.stations);
    for (key in this.stations) {
      console.log(this.stations[key].length);
    }
  }
}

module.exports = ScooterApp;
