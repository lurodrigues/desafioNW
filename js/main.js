var challenge = angular.module('challenge', ["ngRoute"]);


// --------------------------------------------------------------- 

challenge.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "../views/dashboardView.html"
    })
    .when("/Create", {
        templateUrl : "../views/createView.html",
        controller: 'createCtrl'
    })
    .when("/Edit", {
        templateUrl : "../views/editView.html",
        controller: 'editCtrl'
    });
});






















