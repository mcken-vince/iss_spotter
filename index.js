const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');


// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log(`It didn't work! ${error}`);
//     return;
//   }
//   fetchCoordsByIP(ip, (coords) => console.log(coords));
// });

fetchISSFlyOverTimes({ latitude: '49.27670', longitude: '-123.13000' }, (error, data) => {
  if (error) {
    console.log(`It didn't work! ${error}`);
    return;
  }
  console.log(data);
});