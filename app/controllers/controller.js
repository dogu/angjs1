function FirstCtrl($scope, DataSource) {

    $scope.data = DataSource;

    function updatePercent() {
        DataSource.completed = DataSource.messages.length * 10;
    }

    $scope.updateMessage = function () {
        // Get ID of message to update
        var idToUpdate = DataSource.messages[0].id;
        // Get the object from the database
        DataSource.Db.get({id: idToUpdate}, function (data) {
            // On success, update the text
            data.txt = $scope.data.message;
            // Store it to the database
            data.$update();
        });
    }

    $scope.addMessage = function () {
        // Store a new message to the database, id is automatically assigned
        var msg = DataSource.Db.save({name: $scope.data.name, txt: $scope.data.message}, function (data) {
            // Update the datasource messages to get new messages
            DataSource.messages = DataSource.Db.query({}, function () {
                updatePercent();

            });
            // OR add only one, but then without id :( ...
            //DataSource.messages.push(new DataSource.Db({txt:$scope.data.message}));

        });


    }

    $scope.removeMessage = function () {
        var id = $scope.data.messages[$scope.data.messages.length - 1].id;
        DataSource.Db.delete({id: id});
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