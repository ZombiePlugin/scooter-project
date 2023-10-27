class Scooter {
  static nextSerial = 1;
  constructor(station) {
    this.station = station;
    this.user = null;
    this.serial = nextSerial;
    nextSerial += 1;
    this.charge = 100;
    this.isBroken = false;
  }
  rent(user) {
    if (this.charge > 20 && this.isBroken === false) {
      this.station = null;
      this.user = user;
    } else {
      throw new Error("scooter needs to be charged or scooter needs repair");
    }
  }
  dock(station) {
    this.station = station;
    this.user = null;
  }
}

module.exports = Scooter;
