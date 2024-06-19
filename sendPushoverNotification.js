const axios = require('axios');

const PUSHOVER_API_TOKEN = process.env.PUSHOVER_API_TOKEN;
const PUSHOVER_USER_KEY = process.env.PUSHOVER_USER_KEY;

async function sendPushNotif(message) {
  try {
    const response = await axios.post('https://api.pushover.net/1/messages.json', {
      token: PUSHOVER_API_TOKEN,
      user: PUSHOVER_USER_KEY,
      message: message,
      priority: 1
    });

    console.log('Notification sent successfully:', response.data);
  } catch (error) {
    console.error('Error sending notification:', error.response ? error.response.data : error.message);
  }
}

module.exports = {
  sendPushNotif
};
;
