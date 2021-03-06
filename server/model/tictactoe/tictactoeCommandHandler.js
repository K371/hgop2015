var _ = require('lodash');
module.exports = function tictactoeCommandHandler(events) {
  var gameState = {
    gameCreatedEvent : events[0],
    board: [['','',''],['','',''],['','','']]
  };

  var eventHandlers={
    'MoveMade': function(event){
      gameState.board[event.x][event.y] = event.side;
    }
  };

  _.each(events, function(event){
    var eventHandler = eventHandlers[event.event];
    if(eventHandler) eventHandler(event);
  });

  var handlers = {
    "CreateGame": function (cmd) {
      {
        return [{
          id: cmd.id,
          gameId: cmd.gameId,
          event: "GameCreated",
          userName: cmd.userName,
          timeStamp: cmd.timeStamp,
          name: cmd.name

        }];
      }
    },
    "JoinGame": function (cmd) {
      {
        if (gameState.gameCreatedEvent === undefined) {
          return [{
            id: cmd.id,
            event: "GameDoesNotExist",
            userName: cmd.userName,
            timeStamp: cmd.timeStamp
          }];
        }
        return [{
          id: cmd.id,
          event: "GameJoined",
          userName: cmd.userName,
          otherUserName: gameState.gameCreatedEvent.userName,
          timeStamp: cmd.timeStamp
        }];
      }
    },
    "MakeMove": function(cmd){
      var makeMoveReturn = {
        id: cmd.id,
        event: "MoveMade",
        userName: cmd.userName,
        name:gameState.gameCreatedEvent.name,
        x:cmd.x,
        y:cmd.y,
        side:cmd.side,
        timeStamp: cmd.timeStamp
      };
      var gameWinReturn = {
            id: cmd.id,
            event: "GameWon",
            userName: cmd.userName,
            name:gameState.gameCreatedEvent.name,
            side:cmd.side,
            timeStamp: cmd.timeStamp
          };

      if(gameState.board[cmd.x][cmd.y]!==''){
        return [{
          id: cmd.id,
          event: "IllegalMove",
          userName: cmd.userName,
          name:gameState.gameCreatedEvent.name,
          x:cmd.x,
          y:cmd.y,
          side:cmd.side,
          timeStamp: cmd.timeStamp
        }]
      }
      gameState.board[cmd.x][cmd.y] = cmd.side;
      /*
      console.log(gameState.board[0][0]+'\t'+gameState.board[1][0]+'\t'+gameState.board[2][0]+'\t'+'\n');
      console.log(gameState.board[0][1]+'\t'+gameState.board[1][1]+'\t'+gameState.board[2][1]+'\t'+'\n');
      console.log(gameState.board[0][2]+'\t'+gameState.board[1][2]+'\t'+gameState.board[2][2]+'\t'+'\n');
      */
      
      if(gameState.board[0][cmd.y] === cmd.side && 
         gameState.board[1][cmd.y] === cmd.side &&
         gameState.board[2][cmd.y] === cmd.side){
          return [makeMoveReturn, gameWinReturn]
      }
      if(gameState.board[cmd.x][0] === cmd.side && 
         gameState.board[cmd.x][1] === cmd.side &&
         gameState.board[cmd.x][2] === cmd.side){
          return [makeMoveReturn, gameWinReturn]
      }
      if((gameState.board[0][0] === cmd.side && 
         gameState.board[1][1] === cmd.side &&
         gameState.board[2][2] === cmd.side) ||
         (gameState.board[0][2] === cmd.side && 
         gameState.board[1][1] === cmd.side &&
         gameState.board[2][0] === cmd.side)){
          return [makeMoveReturn, gameWinReturn]
      }
      if(gameState.board[0][0] !== '' &&
         gameState.board[1][0] !== '' &&
         gameState.board[2][0] !== '' &&
         gameState.board[0][1] !== '' &&
         gameState.board[1][1] !== '' &&
         gameState.board[2][1] !== '' &&
         gameState.board[0][2] !== '' &&
         gameState.board[1][2] !== '' &&
         gameState.board[2][2] !== ''){
          return [makeMoveReturn, {
            id: cmd.id,
            event: "Draw",
            userName: cmd.userName,
            name:gameState.gameCreatedEvent.name,
            side:cmd.side,
            timeStamp: cmd.timeStamp
          }]
      }
      
      return [makeMoveReturn]
    }
  };

  return {
    executeCommand: function (cmd) {
      var handler = handlers[cmd.comm];
      if(!handler){
        throw new Error("No handler resolved for command " + JSON.stringify(cmd));
      }
      return handler(cmd);
    }
  };
};
