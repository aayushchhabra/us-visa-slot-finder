const { format } = require('date-fns');
const { getFacility, AVAILABILITY_LOGGING_ENABLED } = require('./config');
const { appendFile } = require('node:fs/promises');

const logAvailability = async (earliestDate, url) => {
  try {
    if (earliestDate && AVAILABILITY_LOGGING_ENABLED) {
      const earliestDateFormatted = format(earliestDate, 'dd-MM-yyyy');
      const todaysDateFormatted = format(new Date(), 'dd-MM-yyyy HH:mm:ss');
      const facility = getFacility(url);
      const file = 'availability.logs'
      await appendFile(file, `${todaysDateFormatted},${facility},${earliestDateFormatted}\n`);
    }
  } catch(err) {
    console.error(err);
    log(`Unable to log availability ... skipping`);
  }
}

const log = (step) => {
  console.log(`Event: ${step}`);
}

module.exports = {
  logAvailability,
  log
}