app.factory("DataSource", function ($resource, $q) {
    // The percentage is based on number of messages which I have yet to fetch,
    // instead, make a deferred object and return its promise
    var percentagePromise = $q.defer();

    // Connect to the MongoDB Rest Backend using a AngularJS $resource REST-service object
    var Db = $resource('http://cpanel02.cloudapp.net\\:28000/Rest2012/angjs1/messages/:id',
        {id: '@id'},
        {
            update: {
                method: 'PUT'
            },
            delete: {
                method: 'DELETE'
            }
        });

    // Get all messages from the rest service
    var messages = Db.query({}, function (data) {
        // Resolve the promise with the new percentage
        var percentage = data.length * 10;
        percentagePromise.resolve(percentage);
    });

    return { Db: Db, messages: messages, completed: percentagePromise.promise}
})