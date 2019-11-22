var stompClient = null;

function setConnected(connected) {
    $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);
    if (connected) {
        $("#conversation").show();
    }
    else {
        $("#conversation").hide();
    }
    $("#greetings").html("");
}

function connect() {
    var socket = new SockJS('/gs-guide-weblog');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        setConnected(true);
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/greetings/'+PageId, function (greeting) {
            showGreeting(JSON.parse(greeting.body).content);
        });
    });
}

function disconnect() {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
    setConnected(false);
    console.log("Disconnected");
}

function sendName() {
    stompClient.send("/app/GetWeblog/" + PageId, {}, JSON.stringify({'name': $("#name").val()}));
}

function showGreeting(message) {
    for (var i = 0; i < message.length; i++) {
        // $("#greetings").insertBefore("<tr><td>" + message[i] + "</td></tr>");
        // $("#greetings").insertAfter("<tr><td>" + message[i] + "</td></tr>");
        $("#greetings").append("<tr><td>" + message[i] + "</td></tr>");
    }
}

$(function () {
    $("form").on('submit', function (e) {
        e.preventDefault();
    });
    // $("#connect").click(function () {
    //     connect();
    // });
    // $("#disconnect").click(function () {
    //     disconnect();
    // });
    // $("#send").click(function () {
    //     sendName();
    // });
    $("#clear").click(function () {
        clear();
    });
});

//------------------------------------------------------------------------------------------

var socketCreated = false;
var connected = false;

setInterval(function () {
    if (!socketCreated) {
        var socket = new SockJS('/gs-guide-weblog');
        stompClient = Stomp.over(socket);
        stompClient.connect({}, function (frame) {
            setConnected(true);
            console.log('Connected: ' + frame);
            console.log(1);
            stompClient.subscribe('/topic/weblog/' + PageId, function (greeting) {
                console.log(3);
                showGreeting(JSON.parse(greeting.body).content);
                stompClient.send("/app/GetWeblog/" + PageId, {}, JSON.stringify({'name': $("").val()}));
            });
        });
        socketCreated = true;
    } else if (!connected) {
        try {
            console.log(2);
            stompClient.send("/app/GetWeblog/" + PageId, {}, JSON.stringify({'name': $("").val()}));
            connected = true;
        } catch (e) {
        }
    }
}, 1000);


function clear() {
    $("#greetings")[0].innerHTML = "";
}