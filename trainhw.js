$(document).ready(function () {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyCFyUXXQYpzJeS-Iwawh2gSckdkIdIKqlw",
        authDomain: "train-schedule-hw-b7476.firebaseapp.com",
        databaseURL: "https://train-schedule-hw-b7476.firebaseio.com",
        projectId: "train-schedule-hw-b7476",
        storageBucket: "train-schedule-hw-b7476.appspot.com",
        messagingSenderId: "75225956342"
    };
    firebase.initializeApp(config);

    var database = firebase.database();


    $("#train-button").on("click", function (event) {

        event.preventDefault();

        // Create object with properties
        var trainName = $("#train-name").val().trim();
        var destination = $("#destination").val().trim();
        var firstTrainTime = $("#first-train-time").val().trim();
        var frequency = $("#frequency").val().trim();
        var train = {
            name: trainName,
            place: destination,
            first: firstTrainTime,
            freq: frequency
        }

        database.ref().push(train);
        // Clears all of the text-boxes
        $("#train-name").val("");
        $("#destination").val("");
        $("#first-train-time").val("");
        $("#frequency").val("");
    });

    database.ref().on("child_added", function (snapshot) {

        var train = snapshot.val();
        console.log("child:", train);

        var trainFrequency = train.freq;

        var chosenTrainTime = train.first;
        console.log("I choose this train time: " + chosenTrainTime);

        var setTrainTime = moment(chosenTrainTime, "hh:mm").subtract(1, "years");

        var currentTime = moment();

        var compareTimes = currentTime.diff(moment(setTrainTime), "minutes");

        var timeRemainder = compareTimes % trainFrequency;

        var minutesAway = trainFrequency - timeRemainder;

        var nextTrain = moment().add(minutesAway, "minutes");

        var millitaryTime = moment(nextTrain).format("hh:mm");

        var newRow = $("<tr>").append(
            $("<td>").text(train.name),
            $("<td>").text(train.place),
            $("<td>").text(train.freq),

            //below will be where next arrival and minutes away will be 
            $("<td>").text(millitaryTime),
            $("<td>").text(minutesAway)
        );
        $("#theTable > tbody").append(newRow);
    });
});