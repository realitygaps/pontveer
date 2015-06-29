var UI = require('ui');
var ajax = require('ajax');
var dataJSON = [];
var parseFeed = function(data) {
	var items = [];
	
	for(var i = 0; i < 8; i++) {
		var location = data[i].location;
		var destination = data[i].destination;
		var departuretime = data[i].departures[1].time;
		var nextdeparturetime = data[i].departures[2].time;
	
	items.push({
		title: location.substring(0,4) + "->" + destination.substring(0,4),
		subtitle: departuretime + "  |  " + nextdeparturetime
	});
	}
  return items;
};
  
ajax({
    url:'http://gpls.nl/pontveer.php',
    type:'json'
  },
  function(data) {
	dataJSON = parseFeed(data);
    console.log('data');
    console.log('SHOW MENU');

	var matchMenu = new UI.Menu({
		sections: [{
			title: 'Pontveer',
			items: dataJSON
		}]
	});
	matchMenu.show();
  },
  function(error) {
    console.log('Download failed: ' + error);
  }
);