// Retrieve and parse the JSON data from sessionStorage
const storedData = JSON.parse(sessionStorage.getItem('data'));

// Access individual values
const u = window.atob(storedData.u);
const r = window.atob(storedData.r);
const l = window.atob(storedData.l);

// Set the value of the input field
document.getElementById("u").value = u;
document.getElementById("r").value = r;
document.getElementById("l").value = l;

document.getElementById("s").value = u+r+l;

//selector from your HTML form
$('#my-form').submit(function(e) {
  //prevent the form from submiting so we can post to the google form
  e.preventDefault();
  //AJAX request
  $.ajax({
    url: 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSfODy3aiL46SiWM0o4xc8QnsVYjXj-C47nZG1Jq4hGJULQ0dg/formResponse',     //The public Google Form url, but replace /view with /formResponse
    data: $('#my-form').serialize(), //Nifty jquery function that gets all the input data 
    type: 'POST', //tells ajax to post the data to the url
    dataType: "json", //the standard data type for most ajax requests
    statusCode: { //the status code from the POST request
      0: function(data) { //0 is when Google gives a CORS error, don't worry it went through
        //success
        $('#form-success').text('hooray!');
        window.location.href="https://ibajubc.netlify.app/registration/";
      }, 
      200: function(data) {//200 is a success code. it went through!
        //success
        $('#form-success').text('hooray!');
        window.location.href="https://ibajubc.netlify.app/registration/";
        alert(`Thank you for playing! Your scores have been recorded.`);
      },
      403: function(data) {//403 is when something went wrong and the submission didn't go through
        //error
        alert('Oh no! something went wrong.');
      }
    }  
  });
});

history.pushState(null, null, document.URL);
window.addEventListener('popstate', function () {
    history.pushState(null, null, document.URL);
});