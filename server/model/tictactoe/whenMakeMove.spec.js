var tictactoeCommandHandler = require('./tictactoeCommandHandler');

describe('when make move command', function(){

  var given, when, then;

  beforeEach(function(){
    given= [{
      id:"1234",
      event:"GameCreated",
      name:"TheFirstGame",
      userName: "Gulli",
      timeStamp: "2015.12.02T11:29:44"
    }, {
      id:"12345",
      event:"GameJoined",
      userName: "Halli",
      otherUserName: "Gulli",
      timeStamp: "2015.12.02T11:30:50"
    }];
  });

  describe('on new game', function(){
    it('should join game',function(){
      when={
        id:"12345",
        comm:"MakeMove",
        userName : "Halli",
        x:0,
        y:1,
        side:'X',
        timeStamp: "2015.12.02T11:30:50"
      };
      then=[{
        id:"12345",
        event:"MoveMade",
        userName:"Halli",
        name:"TheFirstGame",
        x:0,
        y:1,
        side:'X',
        timeStamp: "2015.12.02T11:30:50"
      }];

      var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

      JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));
    })
  });

  describe("one previous move", function(){
    it('placing move in same place should be illegal',function(){
      given.push({
        id:"12345",
        event:"MoveMade",
        userName:"Halli",
        name:"TheFirstGame",
        x:0,
        y:1,
        side:'X',
        timeStamp: "2015.12.02T11:30:50"
      });

      when={
        id:"12345",
        comm:"MakeMove",
        userName : "Halli",
        x:0,
        y:1,
        side:'X',
        timeStamp: "2015.12.02T11:30:50"
      };

      then=[{
        id:"12345",
        event:"IllegalMove",
        userName:"Halli",
        name:"TheFirstGame",
        x:0,
        y:1,
        side:'X',
        timeStamp: "2015.12.02T11:30:50"
      }];

      var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

      JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));

    });
  });

  describe("x wins", function(){
    it('x winning horizontally should be possible',function(){
      given = given.concat([
        {
          id:"12345",
          event:"MoveMade",
          userName:"Halli",
          name:"TheFirstGame",
          x:0,
          y:0,
          side:'X',
          timeStamp: "2015.12.02T11:30:50"
        },
        {
          id:"12346",
          event:"MoveMade",
          userName:"Keli",
          name:"TheFirstGame",
          x:0,
          y:1,
          side:'O',
          timeStamp: "2015.12.02T11:30:50"
        },
        {
          id:"12347",
          event:"MoveMade",
          userName:"Halli",
          name:"TheFirstGame",
          x:1,
          y:0,
          side:'X',
          timeStamp: "2015.12.02T11:30:50"
        },
        {
          id:"12348",
          event:"MoveMade",
          userName:"Keli",
          name:"TheFirstGame",
          x:0,
          y:2,
          side:'O',
          timeStamp: "2015.12.02T11:30:50"
        }
      ]);

      when={
        id:"12350",
        comm:"MakeMove",
        userName : "Halli",
        x:2,
        y:0,
        side:'X',
        timeStamp: "2015.12.02T11:30:50"
      };

      then=[
      {
        id:"12350",
        event:"MoveMade",
        userName:"Halli",
        name:"TheFirstGame",
        x:2,
        y:0,
        side:'X',
        timeStamp: "2015.12.02T11:30:50"
      },
      {
        id:"12350",
        event:"GameWon",
        userName:"Halli",
        name:"TheFirstGame",
        side:'X',
        timeStamp: "2015.12.02T11:30:50"
      }];

      var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

      JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));

    });
    it('x winning vertically should be possible',function(){
      given = given.concat([
        {
          id:"12345",
          event:"MoveMade",
          userName:"Halli",
          name:"TheFirstGame",
          x:0,
          y:0,
          side:'X',
          timeStamp: "2015.12.02T11:30:50"
        },
        {
          id:"12346",
          event:"MoveMade",
          userName:"Keli",
          name:"TheFirstGame",
          x:1,
          y:0,
          side:'O',
          timeStamp: "2015.12.02T11:30:50"
        },
        {
          id:"12347",
          event:"MoveMade",
          userName:"Halli",
          name:"TheFirstGame",
          x:0,
          y:1,
          side:'X',
          timeStamp: "2015.12.02T11:30:50"
        },
        {
          id:"12348",
          event:"MoveMade",
          userName:"Keli",
          name:"TheFirstGame",
          x:2,
          y:2,
          side:'O',
          timeStamp: "2015.12.02T11:30:50"
        }
      ]);

      when={
        id:"12350",
        comm:"MakeMove",
        userName : "Halli",
        x:0,
        y:2,
        side:'X',
        timeStamp: "2015.12.02T11:30:50"
      };

      then=[{
        id:"12350",
        event:"MoveMade",
        userName:"Halli",
        name:"TheFirstGame",
        x:0,
        y:2,
        side:'X',
        timeStamp: "2015.12.02T11:30:50"
      },
      {
        id:"12350",
        event:"GameWon",
        userName:"Halli",
        name:"TheFirstGame",
        side:'X',
        timeStamp: "2015.12.02T11:30:50"
      }];

      var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

      JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));

    });
    it('x winning diagonally should be possible',function(){
      given = given.concat([
        {
          id:"12345",
          event:"MoveMade",
          userName:"Halli",
          name:"TheFirstGame",
          x:0,
          y:0,
          side:'X',
          timeStamp: "2015.12.02T11:30:50"
        },
        {
          id:"12346",
          event:"MoveMade",
          userName:"Keli",
          name:"TheFirstGame",
          x:1,
          y:0,
          side:'O',
          timeStamp: "2015.12.02T11:30:50"
        },
        {
          id:"12347",
          event:"MoveMade",
          userName:"Halli",
          name:"TheFirstGame",
          x:1,
          y:1,
          side:'X',
          timeStamp: "2015.12.02T11:30:50"
        },
        {
          id:"12348",
          event:"MoveMade",
          userName:"Keli",
          name:"TheFirstGame",
          x:1,
          y:2,
          side:'O',
          timeStamp: "2015.12.02T11:30:50"
        }
      ]);

      when={
        id:"12350",
        comm:"MakeMove",
        userName : "Halli",
        x:2,
        y:2,
        side:'X',
        timeStamp: "2015.12.02T11:30:50"
      };

      then=[{
        id:"12350",
        event:"MoveMade",
        userName:"Halli",
        name:"TheFirstGame",
        x:2,
        y:2,
        side:'X',
        timeStamp: "2015.12.02T11:30:50"
      },
      {
        id:"12350",
        event:"GameWon",
        userName:"Halli",
        name:"TheFirstGame",
        side:'X',
        timeStamp: "2015.12.02T11:30:50"
      }];

      var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

      JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));

    });
   it('x winning diagonally #2 should be possible',function(){
      given = given.concat([
        {
          id:"12345",
          event:"MoveMade",
          userName:"Halli",
          name:"TheFirstGame",
          x:1,
          y:1,
          side:'X',
          timeStamp: "2015.12.02T11:30:50"
        },
        {
          id:"12346",
          event:"MoveMade",
          userName:"Keli",
          name:"TheFirstGame",
          x:1,
          y:0,
          side:'O',
          timeStamp: "2015.12.02T11:30:50"
        },
        {
          id:"12347",
          event:"MoveMade",
          userName:"Halli",
          name:"TheFirstGame",
          x:2,
          y:0,
          side:'X',
          timeStamp: "2015.12.02T11:30:50"
        },
        {
          id:"12348",
          event:"MoveMade",
          userName:"Keli",
          name:"TheFirstGame",
          x:1,
          y:2,
          side:'O',
          timeStamp: "2015.12.02T11:30:50"
        }
      ]);

      when={
        id:"12350",
        comm:"MakeMove",
        userName : "Halli",
        x:0,
        y:2,
        side:'X',
        timeStamp: "2015.12.02T11:30:50"
      };

      then=[{
        id:"12350",
        event:"MoveMade",
        userName:"Halli",
        name:"TheFirstGame",
        x:0,
        y:2,
        side:'X',
        timeStamp: "2015.12.02T11:30:50"
      },
      {
        id:"12350",
        event:"GameWon",
        userName:"Halli",
        name:"TheFirstGame",
        side:'X',
        timeStamp: "2015.12.02T11:30:50"
      }];

      var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

      JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));

    });
  });
 describe("draw scenario should happen", function(){
    it('should be possible to have a draw',function(){
      given = given.concat([
        {
          id:"12345",
          event:"MoveMade",
          userName:"Halli",
          name:"TheFirstGame",
          x:0,
          y:0,
          side:'X',
          timeStamp: "2015.12.02T11:30:50"
        },
        {
          id:"12346",
          event:"MoveMade",
          userName:"Keli",
          name:"TheFirstGame",
          x:2,
          y:0,
          side:'O',
          timeStamp: "2015.12.02T11:30:50"
        },
        {
          id:"12347",
          event:"MoveMade",
          userName:"Halli",
          name:"TheFirstGame",
          x:1,
          y:0,
          side:'X',
          timeStamp: "2015.12.02T11:30:50"
        },
        {
          id:"12348",
          event:"MoveMade",
          userName:"Keli",
          name:"TheFirstGame",
          x:0,
          y:1,
          side:'O',
          timeStamp: "2015.12.02T11:30:50"
        },
        {
          id:"12349",
          event:"MoveMade",
          userName:"Halli",
          name:"TheFirstGame",
          x:2,
          y:1,
          side:'X',
          timeStamp: "2015.12.02T11:30:50"
        },
        {
          id:"12350",
          event:"MoveMade",
          userName:"Keli",
          name:"TheFirstGame",
          x:1,
          y:1,
          side:'O',
          timeStamp: "2015.12.02T11:30:50"
        },
        {
          id:"12351",
          event:"MoveMade",
          userName:"Halli",
          name:"TheFirstGame",
          x:0,
          y:2,
          side:'X',
          timeStamp: "2015.12.02T11:30:50"
        },
        {
          id:"12352",
          event:"MoveMade",
          userName:"Keli",
          name:"TheFirstGame",
          x:1,
          y:2,
          side:'O',
          timeStamp: "2015.12.02T11:30:50"
        }
      ]);

      when={
        id:"12353",
        comm:"MakeMove",
        userName : "Halli",
        x:2,
        y:2,
        side:'X',
        timeStamp: "2015.12.02T11:30:50"
      };

      then=[{
        id:"12353",
        event:"MoveMade",
        userName:"Halli",
        name:"TheFirstGame",
        x:2,
        y:2,
        side:'X',
        timeStamp: "2015.12.02T11:30:50"
      },
      {
        id:"12353",
        event:"Draw",
        userName:"Halli",
        name:"TheFirstGame",
        side:'X',
        timeStamp: "2015.12.02T11:30:50"
      }];

      var actualEvents = tictactoeCommandHandler(given).executeCommand(when);

      JSON.stringify(actualEvents).should.be.exactly(JSON.stringify(then));

    });
  });
});
