const Scooter = require("../src/Scooter");
const User = require("../src/User");
const ScooterApp = require("../src/ScooterApp");

const scooterApp = new ScooterApp();

describe("ScooterApp tests", () => {
  // Log in tests
  describe("loginUser method tests", () => {
    test("Should log in a registered user", () => {
      scooterApp.registerUser("Joe Bloggs", "test123", 21);
      scooterApp.loginUser("Joe Bloggs", "test123");
      expect(scooterApp.registeredUsers["Joe Bloggs"].loggedIn).toBe(true);
    });

    test("Should throw an error for an incorrect password", () => {
      scooterApp.registerUser("Joe Boggs", "test123", 21);
      expect(() => scooterApp.loginUser("Joe Boggs", "wrongpass")).toThrow(
        "Incorrect password"
      );
    });

    test("Should throw an error for an unregistered user", () => {
      expect(() => scooterApp.loginUser("Unknown User", "test123")).toThrow(
        "Username or password is incorrect"
      );
    });
  });

  // Log out tests
  describe("logoutUser method tests", () => {
    test("Should log out a logged-in user", () => {
      scooterApp.registerUser("Joe Bggs", "test123", 21);
      scooterApp.loginUser("Joe Bggs", "test123");
      scooterApp.logoutUser("Joe Bggs");
      expect(scooterApp.registeredUsers["Joe Bggs"].loggedIn).toBe(false);
    });

    test("Should throw an error for logging out an unregistered user", () => {
      expect(() => scooterApp.logoutUser("Unknown User")).toThrow(
        "No such user is logged in"
      );
    });
  });

  // Rent scooter tests
  describe("rentScooter method tests", () => {
    test("Should rent a scooter to a logged-in user", () => {
      scooterApp.print();
      scooterApp.createScooter("Paddington");
      scooterApp.loginUser("Joe Bggs", "test123");
      const scooter = scooterApp.stations["Paddington"][0];
      scooterApp.rentScooter(scooter, scooterApp.registeredUsers["Joe Bggs"]);
      expect(scooter.user).toBe(scooterApp.registeredUsers["Joe Bggs"]);
    });

    test("Should throw an error for renting a scooter already rented", () => {
      scooterApp.createScooter("Paddington");
      scooterApp.loginUser("Joe Bloggs", "test123");
      const scooter = scooterApp.stations["Paddington"][0];
      scooterApp.rentScooter(scooter, scooterApp.registeredUsers["Joe Bloggs"]);
      expect(() =>
        scooterApp.rentScooter(
          scooter,
          scooterApp.registeredUsers["Joe Bloggs"]
        )
      ).toThrow("scooter already rented");
    });

    test("Should throw an error for renting a scooter with low charge", () => {
      scooterApp.createScooter("Paddington");
      scooterApp.loginUser("Joe Bloggs", "test123");
      const scooter = scooterApp.stations["Paddington"][0];
      scooter.charge = 10;
      expect(() =>
        scooterApp.rentScooter(
          scooter,
          scooterApp.registeredUsers["Joe Bloggs"]
        )
      ).toThrow("Scooter needs to charge or needs repair");
    });
  });

  // Dock scooter tests
  describe("dockScooter method tests", () => {
    test("Should dock a scooter at a station", () => {
      scooterApp.createScooter("Paddington");
      scooterApp.loginUser("Joe Bloggs", "test123");
      const scooter = scooterApp.stations["Paddington"][0];
      scooterApp.rentScooter(scooter, scooterApp.registeredUsers["Joe Bloggs"]);
      scooterApp.dockScooter(scooter, "Wembley");
      expect(scooter.user).toBeNull();
      expect(scooter.station).toBe("Wembley");
    });

    test("Should throw an error for docking a scooter at an unknown station", () => {
      scooterApp.createScooter("Paddington");
      scooterApp.loginUser("Joe Bloggs", "test123");
      const scooter = scooterApp.stations["Paddington"][0];
      expect(() => scooterApp.dockScooter(scooter, "Unknown Station")).toThrow(
        "no such station"
      );
    });
  });
});
