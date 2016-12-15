(function() {
  angular.module('VerdictApp')
  .component('eightballMessage', {
    templateUrl: 'app/components/eightballMessage/eightballMessage.html',
    controller: EightballMessage,
    controllerAs: 'eightballmsg'
  });

  function EightballMessage(EightballService) {
    var eightballmsg = this;
    eightballmsg.eightballs = [];

    EightballService.getAllEightballs(function(data) {
      eightballmsg.eightballs = data.data;

      var randomIndex = Math.floor((Math.random() * 29));
      eightballmsg.randommsg = data.data[randomIndex].message;
    });

    eightballmsg.shakeIt = function() {
      var eightballmsg = this;
      eightballmsg.eightballs = [];

      EightballService.getAllEightballs(function(data) {
        eightballmsg.eightballs = data.data;

        var randomIndex = Math.floor((Math.random() * 29));
        eightballmsg.randommsg = data.data[randomIndex].message;
      });

        $('#message1').css("z-index", -1);
        $('#eightball').effect("shake");
        setTimeout(function() {
          eightballmsg.shaking = false;
          $('#message1').css("z-index", 1);
        }, 1000);
    }
  }

  EightballMessage.$inject = ['EightballService'];
})()