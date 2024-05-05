module.exports = {
  credentials:{
    EMAIL: process.env.EMAIL,
    PASSWORD: process.env.PASSWORD
  },

  getFacility: function getFacility (url) {
    let facilities = new Map();
    facilities.set('89','Calgary');
    facilities.set('92','Ottawa');
    facilities.set('94','Toronto');
    facilities.set('95','Vancouver');
    var facility = url.split('.json')[0].slice(-2);
    return facilities.get(facility);
  },

  siteInfo: {
    COUNTRY_CODE: 'en-ca',
    FACILITY_IDS: '89,92,94,95',
    SCHEDULE_ID: process.env.SCHEDULE_ID,

    get APPOINTMENTS_JSON_URLS(){
      const facilityIds = this.FACILITY_IDS.split(',');
      return facilityIds.map(facility => `https://ais.usvisa-info.com/${this.COUNTRY_CODE}/niv/schedule/${this.SCHEDULE_ID}/appointment/days/${facility}.json?appointments%5Bexpedite%5D=false`)
    },

    get LOGIN_URL () {
      return `https://ais.usvisa-info.com/${this.COUNTRY_CODE}/niv/users/sign_in`
    }
  },
  IS_PROD: process.env.NODE_ENV === 'prod',
  NEXT_SCHEDULE_POLL: process.env.NEXT_SCHEDULE_POLL || 300_000,
  MAX_NUMBER_OF_POLL: process.env.MAX_NUMBER_OF_POLL || 10000, // number of polls before stopping
  NOTIFY_ON_DATE_BEFORE: process.env.NOTIFY_ON_DATE_BEFORE, // in ISO format i.e YYYY-MM-DD
  NOTIFY_EMAILS: process.env.NOTIFY_EMAILS, // comma separated list of emails

  AVAILABILITY_LOGGING_ENABLED: process.env.AVAILABILITY_LOGGING_ENABLED === 'true',
  mailgun: {
    USERNAME: process.env.MAILGUN_USERNAME,
    DOMAIN: process.env.MAILGUN_DOMAIN,
    API_KEY: process.env.MAILGUN_API_KEY,
  }
}