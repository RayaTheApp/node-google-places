var dotenv = require('dotenv');
dotenv.load();

var GooglePlaces = require('../lib/google-places');

var places = new GooglePlaces(process.env.GOOGLE_API_KEY);

places.search({keyword: 'Vermonster'}, function(err, response) {
  if(err) { console.log(err); return; }
  console.log("search: ", response.results);

  places.details({reference: response.results[0].reference}, function(err, response) {
    if(err) { console.log(err); return; }
    console.log("search details: ", response.result.website);
  });
});

places.autocomplete({input: 'Verm', types: "(cities)"}, function(err, response) {
  if(err) { console.log(err); return; }
  console.log("autocomplete: ", response.predictions);

  var success = function(err, response) {
    if(err) { console.log(err); return; }
    console.log("did you mean: ", response.result.name);
  };

  for(var index in response.predictions) {
    places.details({reference: response.predictions[index].reference}, success);
  }
});
