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
