import { listingProps } from "../algorithms/Finder";

function removeDuplicates(listingsData: listingProps[]): listingProps[] {
  //Pull out a list of url from listingsData
  const listingsUrls = listingsData.map((item) => item.url);

  //Find repeated urls
  let repeatedIndices: any[] = [];

  listingsUrls.map((item, index) => {
    if (repeatedIndices.includes(index)) {
      return;
    }

    listingsUrls.filter((i, idx) => {
      if (index === idx || item !== i) {
        return false;
      } else {
        repeatedIndices.push(idx);
      }
    });
  });

  return listingsData.filter((item, index) => !repeatedIndices.includes(index));
}

export default removeDuplicates;
