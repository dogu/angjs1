function FirstCtrl($scope, DataSource) {

    $scope.data = DataSource;

    function updatePercent() {
        DataSource.completed = DataSource.messages.length * 10;
    }

    $scope.addMessage = function () {
        DataSource.messages.push({txt: $scope.data.message});
        updatePercent();
    }

    $scope.removeMessage = function () {
        DataSource.messages.splice(DataSource.messages.length - 1);
        updatePercent();
    }
}

function TwitterCtrl($scope, $http, $routeParams) {

    $scope.twitter = {twitterSearchTerm: ""};

    function getRemoteTweets(screenName) {

        $http.jsonp('http://api.dogu.no/api/TwitterApi/Get/jsonp/?screenName=' + screenName + '&numberOfTweets=10&callback=JSON_CALLBACK').success(function (response) {
            $scope.twitterData = response;
        });

    }

    $scope.getTweets = function () {
        getRemoteTweets($scope.twitter.twitterSearchTerm);
    }

    getRemoteTweets($routeParams.twitterScreenName ? $routeParams.twitterScreenName : "Dogu_AS");

}