# US Visa Slot Finder

## Setup
* Clone the repository
* Run `npm install`
* Rename `.env_sample` to `.env` and replace the sample values as following:
    * EMAIL - The email that you use to login into the `https://ais.usvisa-info.com/en-ca/niv` account.
    * PASSWORD - The password that you use to login into the `https://ais.usvisa-info.com/en-ca/niv` account.
    * SCHEDULE_ID - When you login into the `https://ais.usvisa-info.com/en-ca/niv` account, the schedule id is appended to the URL. The URL patter is something like so, `https://ais.usvisa-info.com/en-ca/nivschedule/{SOME_NUMBERS}/appointment`. SOME_NUMBERS is your schedule id, copy it from the URL and replace the sample value in `.env` with real value.
    * NOTIFY_EMAILS - This is the email, where you'd like to get the notifications.
    * MAILGUN_DOMAIN - See Mailgun setup.
    * MAILGUN_API_KEY - See Mailgun setup.
    * NEXT_SCHEDULE_POLL - It defines the checking interval. To be safe, keep this at the default value of 5 minutes.
    * MAX_NUMBER_OF_POLL - It defines how many times should the process run before quitting. I have found dates well before 10K. So keep this at default as well.
    * NOTIFY_ON_DATE_BEFORE - It defines the date before which the email should be sent out. Change this based on your need. Use the format `YYYY-MM-DD`.
* Start the process with `npm start`

## Mailgun setup
* Create a free [mailgun account](https://signup.mailgun.com/new/signup?plan_name=flex_free&currency=USD)
* Click on Sending (in the left Navigation bar), and domains. Copy the default domain name. It should be something like `sandbox....mailgun.org`. This is your `MAILGUN_DOMAIN` in `.env`.
* Create a new API key, click on the sandbox and API Keys on the right. In Mailgun API keys, click on Add new key. Copy the newly generated API key, this is your `MAILGUN_API_KEY` in `.env`.
* You'll also need to add the authorized recipeints in your sandbox domain. This would be the email address that you'd like to send the email to (NOTIFY_EMAILS). Again `Sending > Domains > Sandbox`, there is form on the right which says Authorized Recipients, add the email in the form.

This script has been inspired by [`US-visa-appointment-notifier`](https://github.com/theoomoregbee/US-visa-appointment-notifer/).