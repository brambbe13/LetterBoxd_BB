import { BasePage } from "./pageObjects/pageObjects"; 
import { By, until,  } from "selenium-webdriver";
import * as signInData from "./signInData.json"
const fs = require("fs");

export class myDressPage extends BasePage {
    constructor(driver, url,) {
      super(driver, url)
      
    }
    
    LoginButton: By = By.className("login") //$$('a[class="login"]')
    
    
  
      //navigating to the url
      async navigate() {
      await this.driver.get(this.url);
      };
      //sign in
      async signIn(): Promise<void> {
        await this.driver.wait(until.elementLocated(this.LoginButton));
        await this.driver.findElement(this.LoginButton).click();
        await this.driver.findElement(this.usernameField).sendKeys(signInData.username);
        await this.driver.sleep(1000)
        await (await this.driver.findElement(this.passwordField)).sendKeys(signInData.password);
        await (await this.driver.findElement(this.SignInEmailButton)).click();
        return await this.driver.wait(until.elementLocated(this.customerAccount)).click();
      };
      
      
      async takeScreenshot(filepath: string) {
        fs.writeFile(
          `${filepath}.png`,
          await this.driver.takeScreenshot(),
          "base64",
          (e) => {
            if (e) console.log(e);
            else console.log("screenshot saved successfully");
          }
        );
      };
      
      async sendKeys(elementBy: By, keys ) {
        await this.driver.wait(until.elementLocated(elementBy));
        return this.driver.findElement(elementBy).sendKeys(keys);
      
      };
      async findElement(elementBy: By, keys){
        await this.driver.wait(until.elementLocated(elementBy));
        await this.driver.findElement(elementBy).click();
  
      };
      async getText(elementBy: By){
        await this.driver.wait(until.elementLocated(this.reviewTitle));
        return (await this.driver.findElement(elementBy)).getText();
      };
      
      
  
  }
        