const { parseISO, compareAsc } = require('date-fns')

const { siteInfo, credentials, getFacility } = require('./config');
const { log } = require('./log');

const login = async (page) => {
  log('Logging in');
  await page.goto(siteInfo.LOGIN_URL);

  const form = await page.$("form#sign_in_form");

  const email = await form.$('input[name="user[email]"]');
  const password = await form.$('input[name="user[password]"]');
  const privacyTerms = await form.$('input[name="policy_confirmed"]');
  const signInButton = await form.$('input[name="commit"]');

  await email.type(credentials.EMAIL);
  await password.type(credentials.PASSWORD);
  await privacyTerms.click();
  await signInButton.click();

  await page.waitForNavigation();

  return true;
}

const checkAvailability = async (page, url) => {
  log(`Checking for schedules at ${getFacility(url)}`);
  await page.setExtraHTTPHeaders({
    'Accept': 'application/json, text/javascript, */*; q=0.01',
    'X-Requested-With': 'XMLHttpRequest'
  });
  await page.goto(url);

  const originalPageContent = await page.content();
  const bodyText = await page.evaluate(() => {
    return document.querySelector('body').innerText
  });

  try{
    const parsedBody =  JSON.parse(bodyText);
    if(!Array.isArray(parsedBody)) {
      throw "Failed to parse dates, probably because you are not logged in";
    }
    const dates = parsedBody.map(item => parseISO(item.date));
    const [earliest] = dates.sort(compareAsc);
    return earliest;
  }catch(err){
    console.log("Unable to parse page JSON content", originalPageContent);
    console.error(err)
  }
}


module.exports = {
  login,
  checkAvailability
}