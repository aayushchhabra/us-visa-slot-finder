const puppeteer = require('puppeteer');
const { parseISO, isBefore } = require('date-fns')
require('dotenv').config();

const { siteInfo, NEXT_SCHEDULE_POLL, MAX_NUMBER_OF_POLL, NOTIFY_ON_DATE_BEFORE } = require('./config');
const { wait } = require('./utils');
const { log, logAvailability } = require('./log');
const { notify } = require('./email');
const { login, checkAvailability } = require('./portal');

var filesystem = require('fs');

let maxTries = MAX_NUMBER_OF_POLL

const process = async () => {
  log(`Starting process, tries remaining ${maxTries} ...`);
  const browser = await puppeteer.launch({headless: true});
  const page = await browser.newPage();
  await login(page);
  urls = siteInfo.APPOINTMENTS_JSON_URLS;
  for (const url of urls) {
    const earliestDate = await checkAvailability(page, url);
    console.log(`Earliest date - ${earliestDate}`);
    await logAvailability(earliestDate, url);
    if(earliestDate && isBefore(earliestDate, parseISO(NOTIFY_ON_DATE_BEFORE))){
      await notify(earliestDate, url);
    }
  }
  await browser.close();
  log(`Proces complete, re-running in ${NEXT_SCHEDULE_POLL/(1000*60)} mins`);
}

const main = async () => {
  if(maxTries-- <= 0){
    console.log('Maximum tries have been reached! Quitting ...')
    return
  }
  await process();
  await wait(NEXT_SCHEDULE_POLL)
  await main()
}

(async () => {
  try{
    await main();
  }catch(err){
    console.error(err);
  }
})();