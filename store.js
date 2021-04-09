const MAX_DISCOUNT_RATE_IN_PERCENT = 50;

export class DiscountOffer {
  constructor(partnerName, expiresIn, discountRateInPercent) {
    this.partnerName = partnerName;
    this.expiresIn = expiresIn;
    this.discountInPercent = discountRateInPercent;
  }
}

function getValueWithinBoundaries(value, minValue, maxValue) {
  const ceiledValue = Math.min(value, maxValue);
  return Math.max(ceiledValue, minValue);
}

export class Store {
  constructor(discountOffers = []) {
    this.discountOffers = discountOffers;
  }

  updateDiscounts() {
    for (var i = 0; i < this.discountOffers.length; i++) {
      switch (this.discountOffers[i].partnerName) {
        case "Naturalia": {
          if (this.discountOffers[i].expiresIn <= 0) {
            this.discountOffers[i].discountInPercent += 2;
          } else {
            this.discountOffers[i].discountInPercent += 1;
          }
          this.discountOffers[i].expiresIn -= 1;
          break;
        }
        case "Vinted": {
          if (this.discountOffers[i].expiresIn <= 0) {
            this.discountOffers[i].discountInPercent = 0;
          } else if (this.discountOffers[i].expiresIn <= 5) {
            this.discountOffers[i].discountInPercent += 3;
          } else if (this.discountOffers[i].expiresIn <= 10) {
            this.discountOffers[i].discountInPercent += 2;
          }
          this.discountOffers[i].expiresIn -= 1;
          break;
        }
        case "Ilek": {
          break;
        }
        default: {
          if (this.discountOffers[i].expiresIn <= 0) {
            this.discountOffers[i].discountInPercent -= 2;
          } else {
            this.discountOffers[i].discountInPercent -= 1;
          }
          this.discountOffers[i].expiresIn -= 1;
        }
      }
      this.discountOffers[i].discountInPercent = getValueWithinBoundaries(
        this.discountOffers[i].discountInPercent,
        0,
        MAX_DISCOUNT_RATE_IN_PERCENT
      );
    }

    return this.discountOffers;
  }
}
