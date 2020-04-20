// TEST VALUES
const userId = 3;
const classId = 1;
const messageId = 1;
const assignmentId = 1;

// HTML ELEMENTS
var greetingBanner = document.getElementById("userGreeting");
var messagesSection = document.getElementById("overview");
var assigmentsSection = document.getElementById("assigments");

// GLOBAL VARIABLES
var user = {}

fetchUserDetails();
fetchsingleMessage();
fetchSingleAssigment();

function fetchUserDetails() {
    var request = new XMLHttpRequest()

    request.open('GET', 'https://obna011v2e.execute-api.us-east-1.amazonaws.com/prod/users/'+userId, true)
    //request.setRequestHeader('Access-Control-Allow-Origin', '*');
    
    request.onload = function () {
        // Begin accessing JSON data here
        var data = JSON.parse(this.response)

        if (request.status >= 200 && request.status < 400) {
            user = data
            greetingBanner.innerHTML = "Hello, " + user.name + ".";            
        } else {
            console.log('Error')
        }
    }

    request.send()
}

function fetchsingleMessage() {


    var request = new XMLHttpRequest()
    request.open('GET', 'https://obna011v2e.execute-api.us-east-1.amazonaws.com/prod/users/'+userId+
    '/classes/'+classId+'/messages/'+ messageId, true);
    //request.setRequestHeader('Access-Control-Allow-Origin', '*');

    request.onload = function () {
        var data = JSON.parse(this.response)

        if (request.status >= 200 && request.status < 400) {

            var mTitle = data[0].title;
            var mBody = data[0].content;

            var addMsg = "<section class=\"section--center mdl-grid mdl-grid--no-spacing mdl-shadow--2dp\" > <div class=\"mdl-card mdl-cell mdl-cell--12-col\"> <div class=\"mdl-card__supporting-text\"> <h4>" + mTitle + "</h4> " + mBody + " </div> </div> </section> </br>"

            console.log(addMsg);
            messagesSection.innerHTML += addMsg;
            
        } else {
            console.log('Error')
        }

    }

    request.send()
}

function fetchSingleAssigment() {

    var request = new XMLHttpRequest()
    request.open('GET', 'https://obna011v2e.execute-api.us-east-1.amazonaws.com/prod/users/'+userId+
    '/classes/'+classId+'/assigments/'+ assignmentId, true);
    //request.setRequestHeader('Access-Control-Allow-Origin', '*');

    request.onload = function () {
        var data = JSON.parse(this.response)

        if (request.status >= 200 && request.status < 400) {

            var mTitle = data[0].title;
            var mBody = data[0].dueDate;
            var mUrl = data[0].URL;

            var addMsg = "<section class=\"section--center mdl-grid mdl-grid--no-spacing mdl-shadow--2dp\" > <div class=\"mdl-card mdl-cell mdl-cell--12-col\"> <div class=\"mdl-card__supporting-text\"> <h4>" + mTitle + "</h4> Due date:" + mBody + " </div> <div class=\"mdl-card__actions\"> <a href=\"" + mUrl + "\" class=\"mdl-button\">View in platform</a> </div> </div> </section> </br>"

            console.log(addMsg);
            assigmentsSection.innerHTML += addMsg;
            
        } else {
            console.log('Error')
        }

    }

    request.send()
}


