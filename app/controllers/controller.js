function ConvertCtrl($scope){
    $scope.data= {};
    $scope.data.m = 0;
}

function DialogCtrl($scope, dialog){
    $scope.close = function(result){
        dialog.close(result);
    };
}

function FirstCtrl($scope,$dialog, DataSource) {

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

    // Inling template for dialog
    var t = '<div class="modal-header">'+
        '<h3>Hvem er du?</h3>'+
        '</div>'+
        '<form><div class="modal-body">'+
        '<p>Fullt navn: <input ng-model="result" /></p>'+
        '</div>'+
        '<div class="modal-footer">'+
        '<button ng-click="close(result)" class="btn btn-primary" >OK</button>'+
        '</div></form>';

    var dialogOpts = {
        backdrop: true,
        keyboard: true,
        backdropClick: true,
        template:  t, // OR: templateUrl: 'path/to/view.html',
        controller: 'DialogCtrl'
    };

    $scope.nameDialog = function(){
        var d = $dialog.dialog(dialogOpts);
        d.open().then(function(result){
            if(result)
            {
                $scope.data.name = result;
            }
            this.close();
        });
    };

    $scope.removeMessage = function () {
        var id = $scope.data.messages[$scope.data.messages.length - 1].id;
        DataSource.Db.delete({id: id});
        DataSource.messages.splice(DataSource.messages.length - 1);
        updatePercent();
    };

    $scope.nameDialog();
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