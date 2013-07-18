var app = angular.module('app', ['ui.bootstrap']);

// #### ROUTING ####
app.config(function ($routeProvider) {
    $routeProvider.when("/twitter/:twitterScreenName", {
        templateUrl: "twitter.html",
        controller: "TwitterCtrl"
    }).when("/twitter", {
        redirectTo: "/twitter/Dogu_AS/"
    }).otherwise({
        redirectTo: "/"
    })
});
