angular
.module('tpAngularApp', [
  'ngAnimate',
  'ngCookies',
  'ngResource',
  'ngRoute',
  'ngSanitize',
  'ngTouch'
])
  .controller('pokemonSearch',['$scope','$log', function($scope,$log) {
    $scope.pokemons=[{id: '1', name: 'pidgeot'},{id:'2',name:'charmander'},{id:'3',name:'charizard'},{id:'4',name:'wartortle'},
      {id:'5',name:'blastoise'},{id:'6',name:'butterfree'},{id: '7', name: 'pidgey'}];
    $scope.logInfo = function()
    {$log.log($scope.selection);
      $log.info($scope.selection);
    };
  }])
  .controller('PokemonByRessource',['$scope','$log','PokeService','$http', function($scope, $log,PokeService,$http) {
    PokeService.queryAll().$promise.then(function(value) {
      $scope.pokApi = value.results;
      console.log($scope.pokApi);
    });
    $scope.$watch('select',function(){
        $scope.url=$scope.select.url;
        $http.get($scope.url).then(function(data) {
          $scope.pok=data;
          console.log($scope.pok);
        }, function(data) {
          document.getElementById("erreur").innerHTML = "Erreur lors de l'appel du json"
        });
          console.log($scope.pok);
      });

  }])

  .controller('PokemonListRessource',['$scope','PokeService',function($scope,PokeService) {
    PokeService.queryAll().$promise.then(function(value) {
      $scope.results = value.count;
      console.log($scope.results);
    });
  }])

  .controller('pokemonListHttp',['$scope','$http',function($scope, $http) {
    $http.get('https://pokeapi.co/api/v2/pokemon/').
    then(function(data) {
      $scope.donnees=data;
      console.log(data);
    },function(data) {
      document.getElementById("erreur").innerHTML = "Erreur lors de l'appel du json"
    });
  }])

  .controller('PokemonSet',['$scope','PokeService', 'serviceCommun',function($scope,PokeService,serviceCommun) {

    PokeService.queryAll().$promise.then(function(value) {
      $scope.poks = value.results;
    });
    $scope.$watch('selected',function(){
      serviceCommun.setC($scope.selected);




    });

  }])



  .controller('PokemonGet',['$scope','serviceCommun','$http',function($scope,serviceCommun,$http) {
    $scope.$watch( function() { return serviceCommun.obs; },function(){
      $scope.pok= serviceCommun.getC();
      $scope.url=$scope.pok.url;
      $http.get($scope.url).then(function(data) {
        $scope.InfoPok=data;
        console.log($scope.InfoPok);
      }, function(data) {
        document.getElementById("erreur").innerHTML = "Erreur lors de l'appel du json"
      });
      console.log($scope.InfoPok);
    });
  }])

  .factory('PokeService', function($resource){
    return $resource('https://pokeapi.co/api/v2/pokemon/:pokId', {pokId:'@id'},
      {queryAll: {
          url: 'https://pokeapi.co/api/v2/pokemon/',
          method: 'GET',
          cache: false,
          isArray: false
        }
      })
  })

  .service("serviceCommun", function(){
    var c;
    var obs;
    this.Obs= function() {
      return this.obs = this.c;
    }.bind (this);
    this.setC = function(c){
      this.c = c;
      return  this.Obs();
    }.bind(this);

    this.getC = function(){
      return this.c;
    };

  })
;



