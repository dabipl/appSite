var app = angular.module('ngAppSite', ['ngAnimate']);

app.controller('GoodController1', ['$scope', function($scope) {
  $scope.a = 1;
  $scope.b = 2;
  $scope.show = true;
  $scope.class = "slide";

  $scope.elements = ["asdasd","aaasssa","aaasddfx"];

  $scope.showFun = function(){
    $scope.show = true;
    $scope.a = 2;
    $scope.b = 2;
    $scope.class = "slide";
    console.log("show");
  };

  $scope.hideFun = function(){
    $scope.show = false;
    $scope.a = 4;
    $scope.b = 3;
    $scope.class = "slide2";
    console.log("hide");
  };

  $scope.add = function(){
            $scope.elements.push($scope.new);
            $scope.new = "";
        }



}])
/*
<div ng-controller="GoodController1">
  <p ng-class="class" ng-show="show">BLA BLA BLA1</p>
  <div ng-class="class" ng-show="!show">BLA BLA BLA2</div>
  <div ng-class="class">
      I can add: {{a}} + {{b}} =  {{ a+b }}

      <p>This renders because the controller does not fail to
         instantiate, by using explicit annotation style (see
         script.js for details)
      </p>
      <button  ng-click="showFun()">Show</button >
      <button  ng-click="hideFun()">Hide</button >
      <img class="animate-repeat" src="img/surface.png"></img>
  </div>
  <input type="search" ng-model="q" placeholder="filter friends..." />
  <input type="search" ng-model="new" placeholder="filter friends..." />
  <ul class="example-animate-container">
    <li class="animate-repeat" ng-repeat="element in elements  | filter:q">[{{$index+1}}] {{element}}</li>
     <li class="animate-repeat" ng-if="elements.length == 0">
        <strong>No results found...</strong>
      </li>
  </ul>
  <button  href="" ng-click="add()">add</button >
</div>
*/
