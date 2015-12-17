var user = require('../fluid-api/tictactoeFluid').user;
var given = require('../fluid-api/tictactoeFluid').given;

it('Should play 100 games in 6 seconds.', function (done) {
  var doneCount = 0;
  var gamesToPlay = 100;
  var x = 10;

  this.timeout(x * 1000);

  var QED = function () {
    if (gamesToPlay === ++doneCount) {
      done();
    }
  };

  for (var gameId = 0; gameId < gamesToPlay; gameId++) {
   given(user("Keli").createsGame(gameId).commandHistory())
       .and(user('Addi').joinsGame(gameId).commandHistory())
        .and(user('Keli').placesMove(0, 0).gameIdentifier(gameId).setSide('X').commandHistory())
        .and(user('Addi').placesMove(2, 0).gameIdentifier(gameId).setSide('O').commandHistory())
        .and(user('Keli').placesMove(1, 0).gameIdentifier(gameId).setSide('X').commandHistory())
        .and(user('Addi').placesMove(0, 1).gameIdentifier(gameId).setSide('O').commandHistory())
        .and(user('Keli').placesMove(2, 1).gameIdentifier(gameId).setSide('X').commandHistory())
        .and(user('Addi').placesMove(1, 1).gameIdentifier(gameId).setSide('O').commandHistory())
        .and(user('Keli').placesMove(0, 2).gameIdentifier(gameId).setSide('X').commandHistory())
        .and(user('Addi').placesMove(1, 2).gameIdentifier(gameId).setSide('O').commandHistory())
        .and(user('Keli').placesMove(2, 2).gameIdentifier(gameId).setSide('X').commandHistory())
        .expect('Draw').isOk(done);
  }
});
