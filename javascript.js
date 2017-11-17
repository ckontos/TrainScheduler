
// Initialize Firebase
var config = {
    apiKey: "AIzaSyAqWlCt-mD_jH-N_Y01YRdmYu-KOfuRr_k",
    authDomain: "trainscheduler-480d1.firebaseapp.com",
    databaseURL: "https://trainscheduler-480d1.firebaseio.com",
    projectId: "trainscheduler-480d1",
    storageBucket: "trainscheduler-480d1.appspot.com",
    messagingSenderId: "882756685727"
  };
firebase.initializeApp(config);

//Creating variable for database ref
var database = firebase.database();



$("#addTrainBtn").on('click', function(response) {
    event.preventDefault();

    var name = $("#trainNameInput").val().trim();
    var destination = $("#destinationInput").val().trim();
    var time = $("#trainTimeInput").val().trim();
    var frequency = $("#frequencyInput").val().trim();

    //new variable to push to firebase
    var newTrain = {
        trainName: name,
        tDestination: destination,
        tTime: time,
        tFrequency: frequency
    };

    //push to firebase
    database.ref().push(newTrain);

    //empty the input boxes
    $("#trainNameInput").val("");
    $("#destinationInput").val("");
    $("#trainTimeInput").val("");
    $("#frequencyInput").val("");
});

database.ref().on("child_added", function(childSnapshot, prevChildKey) {

    var name = childSnapshot.val().trainName;
    var destination = childSnapshot.val().tDestination;
    var time = childSnapshot.val().tTime;
    var frequency = childSnapshot.val().tFrequency;

    //--variable for minutes away--//
    var timeConverted = moment(time, "hh:mm").subtract(1, "years");
    var currentTime = moment();
    var diffTime = moment().diff(moment(timeConverted), "minutes");
    var tRemainder = diffTime % frequency;
    var minsTillTrain = frequency - tRemainder;
    
    //--variable for next arrival--//
    var nextArrival = moment().add(minsTillTrain, "minutes").format("hh:mm");


    //appending info user types into table
    $("#tableBody").append("<tr><th>" + name + "</th><th>" + destination + "</th><th>" + frequency + "</th><th>" + nextArrival + "</th><th>" + minsTillTrain + "</th></tr>");

});




