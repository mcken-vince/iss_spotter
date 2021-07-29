const { nextISSTimesForMyLocation } = require('./iss');


nextISSTimesForMyLocation((error, passTimes) => {
  if (error || !passTimes) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  const passTimesObject = JSON.parse(passTimes);

  for (const time of passTimesObject.response) {
    console.log(`Next pass at ${new Date(time.risetime * 1000)} for ${time.duration} seconds!`);
  }
});