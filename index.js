import { Store, DiscountOffer } from "./store";

import fs from "fs";

const discountOffers = [
  new DiscountOffer("Velib", 20, 30),
  new DiscountOffer("Naturalia", 10, 5),
  new DiscountOffer("Vinted", 5, 40),
  new DiscountOffer("Ilek", 15, 40)
];
const store = new Store(discountOffers);

let log = "";

/* We test the updateDiscounts by running it over 30 days and concat the results into "log" */
for (let elapsedDays = 0; elapsedDays < 30; elapsedDays++) {
  log = log.concat(JSON.stringify(store.updateDiscounts()), ",");
}
log = log.slice(0, -1);

/* eslint-disable no-console */
fs.writeFile("output.txt", log, err => {
  if (err) {
    console.log("error");
  } else {
    console.log("success");
  }
});
/* eslint-enable no-console */
