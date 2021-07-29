const request = require('request-promise-native');

const fetchMyIP = () => {
  return request('https://api.ipify.org?format=json');
};

const fetchCoordsByIP = (body) => {
  const ip = JSON.parse(body).ip;
  return request(`https://freegeoip.app/json/${ip}`);
};

const fetchISSFlyOverTimes = (coordinates) => {
  const coords = (({latitude, longitude}) => ({latitude, longitude}))(JSON.parse(coordinates));
  return request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`);
};

const nextISSTimesForMyLocation = (passTimes) => {
  const times = JSON.parse(passTimes);

  for (const time of times.response) {
    console.log(`Next pass at ${new Date(time.risetime * 1000)} for ${time.duration} seconds!`);
  }
};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation }