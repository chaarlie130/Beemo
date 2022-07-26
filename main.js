function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const arr = ['https://wallpapercave.com/wp/wp5424185.jpg','https://wallpapercave.com/wp/wp5309339.jpg','https://wallpapercave.com/wp/wp5309365.jpg','https://wallpaperaccess.com/full/7294.jpg','https://cdn4.geckoandfly.com/wp-content/uploads/2012/06/Zebra-MBP.jpg','https://cdn4.geckoandfly.com/wp-content/uploads/2018/03/macos_high_sierra_stock_5k-5120x2880.jpg','https://cdn2.geckoandfly.com/wp-content/uploads/2018/03/yosemite-5932x3337-5k-4k-wallpaper-8k-forest-osx-apple-mountains-181.jpg','https://images.unsplash.com/photo-1554502785-b8b0724b4cbd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1','https://images.unsplash.com/photo-1442953827601-b6dea5af04c4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1','https://images.unsplash.com/photo-1555117746-a7c449e5d0ff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8',                          'https://images.unsplash.com/photo-1560517961-1cdc66f62d3f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8',                 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8','https://images.unsplash.com/photo-1499678329028-101435549a4e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1',]
var t = arr.length
var x = getRandomInt(t)
var w = arr[x];

document.body.style.background = `url(${w})`;
document.body.style.backgroundRepeat = 'no-repeat';
document.body.style.backgroundSize = '100% 100%';

var today = new Date();
weekday = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'),
months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December')	
curMonth = months[today.getMonth()]
dayOfWeek = weekday[today.getDay()]

domEnder = function() { 
	var a = today; 
	if (/1/.test(parseInt((a + "").charAt(0)))) return "th"; 
	a = parseInt((a + "").charAt(1)); 
	return 1 == a ? 
	"st" : 2 == a ? 
	"nd" : 3 == a ? 
	"rd" : "th" 
}(),

dayOfMonth = ( today + ( today.getDate() < 10) ? '0' + today.getDate() + domEnder : today.getDate() + domEnder )
if(dayOfMonth.toString().length >= 3) {
	dayOfMonth = dayOfMonth.substr(1)
}
else {dayOfMonth = dayOfMonth};
document.getElementById('dte').innerHTML = dayOfWeek + ', ' + curMonth + ' ' + dayOfMonth
function updateClock() {
    var now = new Date(), // current date
        months = ['January', 'February', '...']; // you get the idea
        Hours = (now.getHours() + 24) % 12 || 12
        time = Hours + ':' + now.getMinutes(), // again, you get the idea

        // a cleaner way than string concatenation
        date = [now.getDate(), 
                months[now.getMonth()],
                now.getFullYear()].join(' ');
    // set the content of the element with the ID time to the formatted string
    document.getElementById('tme').innerHTML = time;

    // call this function again in 1000ms
    setTimeout(updateClock, 1000);
}
//updateClock();
function newsCreate() {
  var opts = {
    method: 'GET',      
    headers: {}
  };
  fetch('https://api.nytimes.com/svc/mostpopular/v2/emailed/7.json?api-key=HXuO0UIMyCN7NUbKmjYuc5PiJgAc2Hfh', opts).then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data)
    for (i = 0; i <6; i++) {
      var titleAPI = data['results'][i]['title']
      var medlen = data['results'][i]['media'].length

      if(medlen == 0 ) {
        var thumb = 'https://i.imgur.com/JIPi2Uq.png'
      }
      else {var thumb = data['results'][i]['media'][0]['media-metadata'][0]['url']
      }
      var url = data['results'][i]['url'];

      console.log(data)

      var block = document.createElement('div');
      var title = document.createElement('h1');
      var thumbnail = document.createElement('img');

      block.classList.add('newsblck');
      title.classList.add('newstle');
      thumbnail.classList.add('newsthumb');

      block.onClick = `location.href=${data['results'][i]['url']}`
      title.innerHTML = titleAPI;
      thumbnail.src = thumb;

      block.append(title,thumbnail);
      (document.getElementsByClassName('newscont')[0]).append(block)
    }
  });

}
function weather() {
  var images = {
    'rainy': 'https://worldweather.wmo.int/images/8.png',
    'dark-rainy' : 'https://worldweather.wmo.int/images/9.png',
    'sunny-with-showers': 'https://worldweather.wmo.int/images/10.png'
  }
  
  var link = 'http://api.weatherapi.com/v1/current.json?key=c477073d709d461891e25237210803&q=Portland&aqi=no'
  fetch(link).then(function (response) {
  	return response.json();
  })
  .then(function (data) {
    //defining variables
    var weatherIcon = data['current']['condition']['icon'];
    var currentTemp = data['current']['temp_f'];
    var condition = data['current']['condition']['text'];
    var iconElement = document.createElement('img');
    var weatherContainer = document.getElementsByClassName('weatherContainer')[0];
    var weatherEle = document.getElementsByClassName('weather')[0];
    var tempTitle = document.createElement('h1');
    var breakEle = document.createElement('div')
    
    tempTitle.classList.add('Temperature');
    tempTitle.innerHTML = (currentTemp);
     
    iconElement.classList.add('weatherIcon');
    iconElement.src = 'https://' + (weatherIcon.replace('//',''));

    weatherContainer.append(iconElement) //one at a time to ensure correct order when placed
    weatherContainer.append(tempTitle)
  });
}function sports() {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '23244e9904msh2aaebc31a2099c0p1555a4jsncb053900f6a2',
      'X-RapidAPI-Host': 'sportscore1.p.rapidapi.com'
    }
  };
  var link = 'https://sportscore1.p.rapidapi.com/sports/2/events/live?page=1'
  fetch(link,options).then(function (response) {
  	return response.json();
  })
  .then(function (data) {
    var source = data['data'][0]
	console.log(source)
    //defining variables
    var playerOne = source['away_team']['name']
    var playerTwo = source['home_team']['name']
    var playerOneSetScore = source['home_score']['peroid_1']
    var playerTwoSetScore = source['away_score']['peroid_1']
    var playerOnePoints = source['home_score']['point']
    var playerTwoPoints = source['away_score']['point']
    var TennisScoresContainer = document.getElementById('tennisScoresContainers');
    var TennisScoresContainer = document.getElementById('tennisScoresContainers');
    if(playerOnePoints == undefined) {playerOnePointsU = 0;}else {playerOnePointsU = playerOnePoints}
    if(playerTwoPoints == undefined) {playerTwoPointsU = 0;}else {playerTwoPointsU = playerTwoPoints}

    (document.getElementsByClassName('tennisScoresOne')[0]).innerHTML = (`${playerOne.replace('.','')} : ${playerOnePointsU}`);
    (document.getElementsByClassName('tennisScoresTwo')[0]).innerHTML = (`${playerTwo.replace('.','')} : ${playerTwoPointsU}`);   
  	document.getElementById('playerOne').innerHTML =  source['away_score']['period_1']   
  	document.getElementById('playerTwo').innerHTML =  source['home_score']['period_1']
    
    if (source['away_score']['period_1'] > source['home_score']['period_1']) {
      document.getElementById('playerTwo').classList.add('winner')
      document.getElementById('playerOne').classList.add('loser')
    }
    if (source['away_score']['period_1'] < source['home_score']['period_1']) {
      document.getElementById('playerOne').classList.add('winner')
      document.getElementById('playerTwo').classList.add('loser')
    }
    if (source['status_more'] == "1st set") {console.log('')}
    (document.getElementsByClassName('tennisTitle')[0]).innerHTML = source['season']['name']
  	//UPDATE: everything working, just add more sets ^^
  });
}
sports()
weather()