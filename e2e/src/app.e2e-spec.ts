import { AppPage } from './app.po';
import { browser, logging, by, element, WebElement } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display badge data', () => {
    page.navigateTo()
    browser.sleep(3000)
    element(by.buttonText('Zaloguj się')).click()
    browser.waitForAngular()
    browser.sleep(3000)
    element(by.buttonText('Twoje odznaki')).click()
    browser.waitForAngular()
    element(by.name('popularna')).click()
    browser.waitForAngular()
    browser.sleep(3000)
    expect(element(by.name('header')).getText()).toContain('Odznaka popularna')
    expect(element(by.name('pointsSum')).getText()).toContain('111')
  });

  it('should fill input fields with selected row data', async () => {
    browser.get('/dashboard')
    browser.sleep(1000)
    element(by.buttonText('Edytuj odcinki')).click()
    browser.waitForAngular()
    browser.sleep(1000)
    element(by.buttonText('Szukaj')).click()
    browser.waitForAngular()
    element(by.name('odcinki')).isDisplayed()
    browser.sleep(1000)

    browser.findElement(by.xpath(
      '/html/body/app-root/app-main-nav/mat-sidenav-container/mat-sidenav-content/div/div/app-edit-segment/div/table/tbody/tr[1]'))
      .click()

    browser.sleep(3000)

    let nameInput = element(by.name('name'))

    expect(element(by.name('name')).getAttribute("value")).toContain('AB')
    expect(element(by.name('p1')).getAttribute("value")).toContain('14')
    expect(element(by.name('p2')).getAttribute("value")).toContain('20')

    nameInput.clear()
    nameInput.sendKeys("AC")

    element(by.buttonText('Zapisz')).click();

    (await browser.switchTo().alert()).accept()

    browser.sleep(1000);

    expect((await browser.switchTo().alert()).getText()).toContain("Duplicate entry 'AC' for key 'Nazwa'")

  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
