const Mailgun = require('mailgun.js');
const formData = require('form-data');

const mailgun = new Mailgun(formData);
const config = require('./config');

const { log } = require('./log');

const mailer = mailgun.client({username: 'api', key: config.mailgun.API_KEY});

const { format } = require('date-fns')

const notify = async (earliestDate, url) => {
  const formattedDate = format(earliestDate, 'dd-MM-yyyy');
  log(`sending an email to schedule for ${formattedDate}`);
  await sendEmail({
    subject: `US Visa - Early date found ${formattedDate} in ${config.getFacility(url)}`,
    text: `US Visa - Early date found ${formattedDate} in ${config.getFacility(url)}`
  })
}

const sendEmail = async (params) => {
  const data = {
    from: 'No reply <noreply@us-visa-availability>',
    to: config.NOTIFY_EMAILS,
    ...params
  };
  await mailer.messages.create(config.mailgun.DOMAIN, data)
};

module.exports = {
  notify
}