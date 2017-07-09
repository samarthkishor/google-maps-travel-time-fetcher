// Dependencies
const Nightmare = require('nightmare');
const nightmare = Nightmare();
const fs = require('fs');

// Change to the url of your Google Maps directions
const url = 'https://www.google.com/maps/dir/Hello,+Inc.,+2315+W+Broad+St,+Richmond,+VA+23220/World+of+Mirth,+West+Cary+Street,+Richmond,+VA/';

// Begin the script
nightmare
.goto(url)
.wait('div.section-directions-trip-duration.delay-light > span')
.evaluate(() => {
  const travelTimeText = document.querySelector('div.section-directions-trip-duration.delay-light > span').innerText;
  const routeText = document.title.replace(' - Google Maps', ''); // gets rid of the `- Google Maps` at the end of the page title
  const result = {
    route: routeText,
    time: travelTimeText,
  };
  return result;
})
.end()
.then((result) => {
  // `result` is the object returned from the evaluate function
  const time = new Date().toLocaleString();
  console.log(`On ${time}` + ', ' + `it took ${result.time} to drive from ${result.route}`);
  const travelTime = `${time}` + ',' + `${result.time},`
  fs.appendFile('./travelTimes.csv', '\r\n' + travelTime.trim(), 'utf8', (error) => {
    if (error) throw error;
  });
})
.catch((error) => {
  console.error('Search failed', error);
});
