class Scooter {
  static nextSerial = 1;
  constructor(station) {
    this.station = station;
    this.user = null;
    this.serial = Scooter.nextSerial;
    Scooter.nextSerial++;
    this.charge = 100;
    this.isBroken = false;
  }
  rent(user) {
    if (this.charge > 20 && !this.isBroken) {
      this.station = null;
      this.user = user;
      console.log("Scooter rented to", user.username);
    } else {
      throw new Error("Scooter needs to charge or needs repair");
    }
  }

  dock(station) {
    this.station = station;
    this.user = null;
    console.log("Scooter docked at", station);
  }
}

module.exports = Scooter;
