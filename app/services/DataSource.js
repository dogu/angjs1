app.factory("DataSource", function () {

    var messages = [
        {txt: "Dette er en eksempelmelding" },
        {txt: "Teksten er sortert"},
        {txt: "Alfabetisk"}
    ];
    var percent = messages.length * 10;

    return { messages: messages, completed: percent }
})