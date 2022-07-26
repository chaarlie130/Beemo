function sports() {
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