const User = require("../src/User");

const user = new User("Joe Bloggs", "test123", 21);

// User tests here
describe("User tests", () => {
  // create a new user instance
  test("should create a new User", () => {
    expect(user).toBeInstanceOf(User);
    expect(user.username).toBe("Joe Bloggs");
    expect(user.password).toBe("test123");
    expect(user.age).toBe(21);
    expect(user.loggedIn).toBe(false);
  });

  // test username
  test("username should be a string", () => {
    expect(typeof user.username).toBe("string");
  });
  // test login
  test("should log in a user with the correct password", () => {
    user.login("test123");
    expect(user.loggedIn).toBe(true);
  });

  test("should throw an error when logging in with incorrect password", () => {
    expect(() => user.login("wrongpassword")).toThrow("Incorrect password");
  });

  // test logout
  test("should log out a user", () => {
    user.login("test123");
    user.logout();
    expect(user.loggedIn).toBe(false);
  });
});
