import Finder from "./algorithms/Finder";
import { IPHONE_CRITERIA } from "./config/IPHONE_CRITERIA";

// import { elementIsEnabled } from "selenium-webdriver/lib/until";

// const recipient = "recycle.traders@gmail.com";

// // return a list of qualified items
// const shpockFinder = new Finder({
//   url: "",
//   item: "",
//   criteria: {},
// });

// async shpockFinder.run();

// // const facebookFinder = new Finder().fb({
// //   url: "",
// //   item: "",
// //   criteria: {},
// // });

// //Send an email of all items
// sendEmail({
//   data: [
//     { platform: "shpock", data: shpockFinder },
//     { platform: "facebook", data: facebookFinder },
//   ],
//   recipient,
// });

(async function test() {
  const finder = new Finder({
    platform: "shpock",
    url:
      "https://www.shpock.com/en-gb/results?q=iphone&category=electronics_phones-accessories_mobile-phones&sort.type=date_listed&sort.direction=d",
    item: "iPhone",
    criteria: IPHONE_CRITERIA,
  });

  const data = await finder.find();

  console.log(data);
})();
