
angular.module('state1',[])
  .config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('state1', {
      url: '/state1',
      views: {
        'main': {
          controller: 'State12Ctrl',
          templateUrl: 'state1/state1.html'
        }
      }
    })
  }])
  .controller('State12Ctrl', ['$scope', function($scope) {
      $scope.submit = function() {
      $scope.dataForTheTree = JSON.parse($scope.text);
    }





    //  [
       // { "name" : "1", "children" : [
         // { "name" : "1.1",  "children" : [] },
          //{ "name" : "2",  "children" : [
            //{ "name" : "2.1",  "children" : [
              //{ "name" : "2.1.1",  "children" : [] },
             // { "name" : "2.1.2",  "children" : [] }
           // ]}
          //]}
        //]},
       // { "name" : "3",  "children" : [] },
       // { "name" : "4",  "children" : [] }
      //];

  }])
