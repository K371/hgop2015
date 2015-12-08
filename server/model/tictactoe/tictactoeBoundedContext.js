var _ = require('lodash');
var q = require('q');

module.exports = function(eventStore, commandHandler){
  return {
    handleCommand : function(cmd){
      var defer = q.defer();
      eventStore.loadEvents(cmd.gameId).then(function(eventStream){
        var events;
<<<<<<< HEAD
	try{
         events = commandHandler(eventStream).executeCommand(cmd);
=======

        try{
          events = commandHandler(eventStream).executeCommand(cmd);
>>>>>>> stefaneg/master
        } catch(e){
          defer.reject(e);
        }

        eventStore.storeEvents(cmd.gameId, events).then(function(){
          defer.resolve(events);
        }, function(err){
          defer.reject(err);
        });
      });
      return defer.promise;
    }
  }
};
