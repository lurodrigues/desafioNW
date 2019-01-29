var challenge = angular.module('challenge', ["ngRoute"]);


// --------------------------------------------------------------- 

challenge.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "../views/dashboardView.html"
    })
    .when("/Create", {
        templateUrl : "../views/createView.html",
    })
    .when("/Edit/:id", {
        templateUrl : "../views/createView.html",
    })
    .otherwise({redirectTo:'/'});;
});
























