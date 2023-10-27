const Scooter = require("../src/Scooter");
const User = require("../src/User");

describe("scooter object", () => {
  test("Scooter class should create Scooter instance", () => {
    const scooter = new Scooter("Paddington");
    expect(scooter).toBeInstanceOf(Scooter);
  });
});

describe("scooter methods", () => {
  let scooter;
  let user;

  beforeEach(() => {
    scooter = new Scooter("Paddington");
    user = new User("user1", "password1", 25);
  });

  // Rent method test
  test("rent method should check out a scooter to a user if charged and not broken", () => {
    scooter.charge = 30;
    scooter.isBroken = false;
    scooter.rent(user);
    expect(scooter.user).toBe(user);
    expect(scooter.station).toBeNull();
  });

  test("rent method should throw an error if the scooter is not charged", () => {
    scooter.charge = 10;
    expect(() => scooter.rent(user)).toThrow(
      "Scooter needs to charge or needs repair"
    );
  });

  test("rent method should throw an error if the scooter is broken", () => {
    scooter.isBroken = true;
    expect(() => scooter.rent(user)).toThrow(
      "Scooter needs to charge or needs repair"
    );
  });

  // Dock method test
  test("dock method should return the scooter to a station", () => {
    scooter.rent(user);
    scooter.dock("Station B");
    expect(scooter.user).toBeNull();
    expect(scooter.station).toBe("Station B");
  });
});
