angular.module('VerdictApp')

  .service('EightballService', ['$http', function($http) {
    this.getAllEightballs = function(callback) {
      $http({
        url: '/api/eightballs',
        method: 'GET'
      }).then(function success(res) {
        callback(res);
      }, function error(res) {
        console.log(res);
      });
    }
  }])
  .service("IdeaGenService", ["$http", function($http) {
    this.getIdea = function() {
     return  $http({
        url: "/random/",
        method: "GET"
      }).then(function(res) {
        console.log("idea response from service", res);
        return res.data;
      })
    };
  }]);