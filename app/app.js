var app = angular.module('app', ['ngResource', 'ui.bootstrap']);

// #### ROUTING ####
app.config(function ($routeProvider) {
    $routeProvider.when("/", {
        templateUrl:"home.html"
    }).when("/messages", {
        templateUrl: "messages.html",
        controller: "FirstCtrl"
    }).when("/twitter/:twitterScreenName", {
        templateUrl: "twitter.html",
        controller: "TwitterCtrl"
    }).when("/twitter", {
        redirectTo: "/twitter/Dogu_AS/"
    }).otherwise({
        redirectTo: "/"
    })
});
