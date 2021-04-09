import { getValueWithinBoundaries } from "./utils";

const MAX_DISCOUNT_RATE_IN_PERCENT = 50;

export class DiscountOffer {
  constructor(partnerName, expiresIn, discountRateInPercent) {
    this.partnerName = partnerName;
    this.expiresIn = expiresIn;
    this.discountInPercent = discountRateInPercent;
  }

  updateDiscount() {
    switch (this.partnerName) {
      case "Naturalia": {
        if (this.expiresIn <= 0) {
          this.discountInPercent += 2;
        } else {
          this.discountInPercent += 1;
        }
        break;
      }
      case "Vinted": {
        if (this.expiresIn <= 0) {
          this.discountInPercent = 0;
        } else if (this.expiresIn <= 5) {
          this.discountInPercent += 3;
        } else if (this.expiresIn <= 10) {
          this.discountInPercent += 2;
        }
        break;
      }
      case "Ilek": {
        break;
      }
      case "BackMarket": {
        if (this.expiresIn <= 0) {
          this.discountInPercent -= 4;
        } else {
          this.discountInPercent -= 2;
        }
        break;
      }
      default: {
        if (this.expiresIn <= 0) {
          this.discountInPercent -= 2;
        } else {
          this.discountInPercent -= 1;
        }
      }
    }
    this.discountInPercent = getValueWithinBoundaries(
      this.discountInPercent,
      0,
      MAX_DISCOUNT_RATE_IN_PERCENT
    );
  }

  updateExpiration() {
    if (this.partnerName !== "Ilek") {
      this.expiresIn -= 1;
    }
  }
}

export class Store {
  constructor(discountOffers = []) {
    this.discountOffers = discountOffers;
  }

  updateDiscounts() {
    for (var i = 0; i < this.discountOffers.length; i++) {
      this.discountOffers[i].updateDiscount();
      this.discountOffers[i].updateExpiration();
    }

    return this.discountOffers;
  }
}
