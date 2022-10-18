export const generateSelectors = (
  platform: string
): { title: string; price: string; url: string } | undefined => {
  if (platform === "shpock") {
    return {
      title:
        ".ItemCard__ConversionWrapper-cy8zy7-2 .StyledAssets__Title-sc-1ojzb7j-0.cTnaCP",
      price: ".ItemCard__ConversionWrapper-cy8zy7-2 .ItemCard__Price-cy8zy7-0",
      url: ".ItemCard__ConversionWrapper-cy8zy7-2 .Anchor-sc-1jg1j9m-0",
    };
  }

  if (platform === "gumtree") {
  }

  if (platform === "facebook") {
  }
};
