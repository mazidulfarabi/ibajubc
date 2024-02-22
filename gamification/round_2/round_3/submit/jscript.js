// Get the value of the 'score' query parameter from the URL
const urlParams = new URLSearchParams(window.location.search);
const u = urlParams.get('u')/55;
const r = urlParams.get('r')/66;
const l = urlParams.get('l')/77;

// Set the value of the input field
document.getElementById("u").value = u;
document.getElementById("r").value = r;
document.getElementById("l").value = l;
console.log(u,r,l);

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