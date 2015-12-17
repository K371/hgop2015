var should = require('should');
var request = require('supertest');
var async = require('async');
var acceptanceUrl = process.env.ACCEPTANCE_URL;
var ID = 0;

function given(userApi) {
  var expectedArr = [];
  var expectApi = {
    withName: function (gameName) {
      expectedArr[expectedArr.length - 1].name = gameName;
      return expectApi;
    },
    expect: function (eventName) {
      expectedArr.push({
        event: eventName
      });
      return expectApi;
    },
    and: function (eEvent){
      userApi = userApi.concat(eEvent);
      return expectApi;
    },
    withGameId: function (gameId){
      expectedArr[expectedArr.length - 1].gameId = gameId;
      return expectApi;
    },
    byUser: function(userName){
      expectedArr[expectedArr.length - 1].userName = userName;
      return expectApi;
    },
    isOk: function (done) {
      async.eachSeries(userApi, (userCommand, cb) => {
        var url = '';
        if(userCommand.comm === 'MakeMove'){
          url = '/api/placeMove';
        }
        else{

            url = '/api/' + (userCommand.comm);

        }
        var cmd = {
          id:        ID.toString(),
          comm:      userCommand.comm,
          userName:  userCommand.userName,
          gameId:    userCommand.gameId,
          timeStamp: new Date().toJSON().slice(0, 19)
        };
        if(userCommand.comm === 'MakeMove'){
          cmd.x = userCommand.x;
          cmd.y = userCommand.y;
          cmd.side = userCommand = userCommand.side;
        }
        ID++;
        request(acceptanceUrl).post(url)
          .type('json')
          .send(cmd)
          .expect(200)
          .expect('Content-Type', /json/)
          .end((err, res) => {
            if (err)
              return done(err);
            res.body.should.be.instanceof(Array);
            cb();
          });
      }, () => {
        var gameId = userApi[0].gameId;
        request(acceptanceUrl).get('/api/gameHistory/' + gameId)
          .expect(200)
          .expect('Content-Type', /json/)
          .end((err, res) => {
            if(err)
              return done(err);
            done();
          });
      });
    }
  };

  return expectApi;
}

function user(userName) {
  var commands = [];
  var userApi = {
    createsGame: function (gameId) {
      commands.push({
        gameId: gameId,
        comm: 'CreateGame',
        userName: userName,
      });
      return userApi;
    },
    joinsGame: function (gameId) {
      commands.push({
        gameId: gameId,
        comm: 'JoinGame',
        userName: userName
      });
      return userApi
    },
    withId : function(gameId){
      userApi._command.gameId = gameId;
      return userApi;
    },
    placesMove: function(col, row){
      commands.push({
        comm: 'MakeMove',
        userName: userName,
        x: col,
        y: row
      });
      return userApi;
    },
    setSide: function(side){
      commands[commands.length -1].side = side;
      return userApi;
    },
    gameIdentifier: function(gameId){
      commands[commands.length -1].gameId = gameId;
      return userApi;
    },
    commandHistory: function(){
      return commands;
    }
  };
  return userApi
}

module.exports.user = user;
module.exports.given = given;
