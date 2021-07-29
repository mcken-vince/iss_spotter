const { fetchMyIP, fetchCoordsByIP } = require('./iss');


fetchMyIP((error, ip) => {
  if (error) {
    console.log(`It didn't work! ${error}`);
    return;
  }
  fetchCoordsByIP(ip, (coords) => console.log(coords));
});

