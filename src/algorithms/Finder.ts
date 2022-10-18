import { WebDriver, Builder, By, WebElement } from "selenium-webdriver";
import { Options } from "selenium-webdriver/chrome";
import removeDuplicates from "../utils/removeDuplicates";
import { generateSelectors } from "../utils/generateSelectors";

export interface listingProps {
  title: string;
  price: number;
  url?: string;
  description?: string;
  location?: string;
}

interface finderProps {
  platform: string;
  url: string;
  item: string;
  criteria: {
    title: RegExp;
    price: number;
  }[];
}

class Finder {
  driver: WebDriver | undefined;

  constructor(public finderProps: finderProps) {}

  async find(): Promise<listingProps[] | never> {
    const { platform, url, item, criteria } = this.finderProps;
    let data: listingProps[];

    try {
      await this.buildDriver(url);

      if (platform === "shpock") {
        await this.clickAcceptButton();
      }

      data = await this.collectData(platform);

      data = this.findTargetData(data, criteria);

      data = removeDuplicates(data);
    } catch (error) {
      throw new Error(error.message);
    } finally {
      await this.quitDriver();
    }

    return data;
  }

  async clickAcceptButton(): Promise<void> {
    if (this.driver) {
      //Click on 'Accept' button
      const accept = await this.driver.findElement(
        By.css(".Button-sc-1mt1e5c-0.fUPFXP")
      );
      await accept.click();
      await this.driver.sleep(3000);
    }
  }

  async buildDriver(url: string): Promise<void> {
    this.driver = await new Builder()
      .forBrowser("chrome")
      .setChromeOptions(new Options())
      .build();

    await this.driver.get(url);
  }

  async quitDriver(): Promise<void> {
    if (this.driver) {
      await this.driver.quit();
    }
  }

  async collectData(platform: string): Promise<listingProps[]> {
    if (!this.driver) {
      throw new Error("invalid driver");
    }

    let listings = [];
    const selectors = generateSelectors(platform);

    if (!selectors) {
      throw new Error("cant find selectors");
    }

    const { title, price, url } = selectors;
    const listingsTitle = await this.driver.findElements(By.css(title));
    const listingsPrice = await this.driver.findElements(By.css(price));
    const listingsUrl = await this.driver.findElements(By.css(url));

    //Build a list of listings data
    for (let i = 0; i < listingsTitle.length; i++) {
      const title = await listingsTitle[i].getText();
      let price = await listingsPrice[i].getText();
      const url = await listingsUrl[i].getAttribute("href");

      listings.push({
        title,
        price: parseFloat(price.substring(1)),
        url,
      });
    }

    return listings;
  }

  findTargetData(
    data: listingProps[],
    criteria: {
      title: RegExp;
      price: number;
    }[]
  ): listingProps[] {
    let targetListings: listingProps[] = [];

    for (let i = 0; i < criteria.length; i++) {
      const listings = data.filter(
        ({ title, price }) =>
          criteria[i].title.test(title) && price < criteria[i].price
      );
      targetListings = [...targetListings, ...listings];
    }

    return targetListings;
  }
}

export default Finder;
