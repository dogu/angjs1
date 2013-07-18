function FirstCtrl($scope, $resource, DataSource) {

    $scope.data = DataSource;

    var Db = $resource('http://cpanel02.cloudapp.net\\:28000/Rest2012/angjs1/:collection/:id',
        {collection: '@collection', id: '@id'});

    $scope.data.message = Db.get({collection: 'messages'});
    console.log($scope.data.message.get());

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