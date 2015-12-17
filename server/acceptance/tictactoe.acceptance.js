'use strict';

var should = require('should');
var request = require('supertest');
var acceptanceUrl = process.env.ACCEPTANCE_URL;

var given = require('../fluid-api/tictactoeFluid').given;
var user = require('../fluid-api/tictactoeFluid').user;

describe('TEST ENV GET /api/gameHistory', function () {

  it('Should have ACCEPTANCE_URL environment variable exported.', function () {
    /*jshint -W030 */
    acceptanceUrl.should.be.ok;
  });

  it('should execute same test using old style', function (done) {

    var command = {
      id: "1234",
      gameId: "100000",
      comm: "CreateGame",
      userName: "Keli",
      name: "TheFirstGame",
      timeStamp: "2014-12-02T11:29:29"
    };

    var req = request(acceptanceUrl);
    req
      .post('/api/createGame')
      .type('json')
      .send(command)
      .end(function (err, res) {
        if (err) return done(err);
        request(acceptanceUrl)
          .get('/api/gameHistory/100000')
          .expect(200)
          .expect('Content-Type', /json/)
          .end(function (err, res) {
            if (err) return done(err);
            res.body.should.be.instanceof(Array);
            should(res.body).eql(
              [{
                "id": "1234",
                "gameId": "100000",
                "event": "GameCreated",
                "userName": "Keli",
                "name": "TheFirstGame",
                "timeStamp": "2014-12-02T11:29:29"
              }]);
            done();
          });
      });
  });


   it('Should execute fluid API test', function (done) {
     given(user("YourUser").createsGame("TheFirstGame").commandHistory())
     .expect("GameCreated").withName("TheFirstGame").isOk(done);
   });
   it('Should have movemade functionality', function (done) {
      given(user('Keli').createsGame('230792').commandHistory())
         .and(user('Addi').joinsGame('230792').commandHistory())
         .and(user('Keli').placesMove(0, 1).gameIdentifier('230792').setSide('X').commandHistory())
         .expect('MoveMade').byUser('Keli').isOk(done);
  });

   it('Should play game until won or drawn', function (done) {
       given(user("Keli").createsGame("2089").commandHistory())
       .and(user('Addi').joinsGame('2089').commandHistory())
        .and(user('Keli').placesMove(0, 0).gameIdentifier('2089').setSide('X').commandHistory())
        .and(user('Addi').placesMove(2, 0).gameIdentifier('2089').setSide('O').commandHistory())
        .and(user('Keli').placesMove(1, 0).gameIdentifier('2089').setSide('X').commandHistory())
        .and(user('Addi').placesMove(0, 1).gameIdentifier('2089').setSide('O').commandHistory())
        .and(user('Keli').placesMove(2, 1).gameIdentifier('2089').setSide('X').commandHistory())
        .and(user('Addi').placesMove(1, 1).gameIdentifier('2089').setSide('O').commandHistory())
        .and(user('Keli').placesMove(0, 2).gameIdentifier('2089').setSide('X').commandHistory())
        .and(user('Addi').placesMove(1, 2).gameIdentifier('2089').setSide('O').commandHistory())
        .and(user('Keli').placesMove(2, 2).gameIdentifier('2089').setSide('X').commandHistory())
        .expect('Draw').isOk(done);
     });

});
