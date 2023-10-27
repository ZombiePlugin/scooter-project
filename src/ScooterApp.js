const User = require("./User");
const Scooter = require("./Scooter");

class ScooterApp {
  constructor() {
    this.stations = { Paddington: [], Wembley: [], Battersea: [] };
    this.registeredUsers = {};
  }
  registerUser(username, password, age) {
    if (this.registeredUsers[username]) {
      throw new Error("User already registered");
    }

    if (age < 18) {
      throw new Error("Too young to register");
    }

    const user = new User(username, password, age);
    this.registeredUsers[username] = user;
    return user;
  }
  loginUser(username, password) {
    const user = this.registeredUsers[username];
    if (!user) {
      throw new Error("Username or password is incorrect");
    }
    user.login(password);
  }

  logoutUser(username) {
    const user = this.registeredUsers[username];
    if (!user) {
      throw new Error("No such user is logged in");
    }

    user.logout();
  }
  createScooter(station) {
    if (!this.stations[station]) {
      throw new Error("No such station");
    }
    const scooter = new Scooter(station);
    this.stations[station].push(scooter);
    console.log("Created new scooter");
    return scooter;
  }
  dockScooter(scooter, station) {
    if (!this.stations[station]) {
      throw new Error("no such station");
    }
    if (this.stations[station].includes(scooter)) {
      throw new Error("scooter already at station");
    }
    this.stations[station].push(scooter);
    scooter.dock(station);
    console.log("scooter is docked");
  }
  rentScooter(scooter, user) {
    for (const station in this.stations) {
      for (let i = 0; i < this.stations[station].length; i++) {
        if (this.stations[station][i] === scooter) {
          this.stations[station].splice(i, 1);
          scooter.rent(user);
          return;
        }
      }
    }
    throw new Error("scooter already rented");
  }
  print() {
    console.log("Registered Users:");
    for (const username in this.registeredUsers) {
      console.log(username);
    }

    console.log("Stations and Scooters:");
    for (const station in this.stations) {
      console.log(
        station + " - " + this.stations[station].length + " scooters"
      );
    }
  }
}

module.exports = ScooterApp;
