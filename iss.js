const request = require('request');

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = (callback) => {
  // use request to fetch IP address from JSON API
  request('https://api.ipify.org?format=json', (error, response, data) => {
    if (error) return callback(error, null);
    
    if (response.statusCode !== 200) {
      callback(`Status Code ${response.statusCode} when fetching IP: ${data}`, null);
      return;
    }
    const ip = JSON.parse(data).ip;
    // console.log('IP within fetchMyIP:', ip); // for troubleshooting
    callback(null, ip);
  });
};

const fetchCoordsByIP = (ip, callback) => {
  request(`https://freegeoip.app/json/${ip}`, (error, response, data) => {
    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      callback(`Status Code ${response.statusCode} when fetching geolocation: ${data}`, null);
      return;
    }

    const { latitude, longitude } = JSON.parse(data);
    callback({ latitude, longitude });
  });
};
/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */
const fetchISSFlyOverTimes = (coords, callback) => {
  request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, data) => {
    if (error) {
      return callback(error, null);
    }
    if (response.statusCode !== 200) {
      callback(`Status Code ${response.statusCode} when fetching ISS fly over times: ${data}`);
    }
    callback(null, data)
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };