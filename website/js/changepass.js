var registerURL = serverUrl + "/api/signup";


function resetInput() {
  $("#OldPassword").val("");
  $("#Password1").val("");
  $("#Password2").val("");
}

$('#profileForm').submit(function(e) {
  // get all the inputs into an array.
  var $inputs = $('#registerForm :input');

  // not sure if you wanted this, but I thought I'd add it.
  // get an associative array of just the values.
  var values = {};
  $inputs.each(function() {
    values[this.name] = $(this).val();
  });

  var registerData = {
    passwordOld: values["OldPassword"],
    password1: values["Password1"],
    password2: values["Password2"],
  };
  //send to server
  $.ajax({
    url: registerURL,
    type: "POST",
    data: JSON.stringify(registerData),
    dataType: "json",
    contentType: "application/json",
    success: function(data) {
      //window.open('verify.html', '_self', 'resizable=yes')
      resetInput();
      DisableButton();
      addSuccessMessage("Account created successfully!");
      $("#serverMessage").append(`
          <p style="color: black;">Please
           <button id="btn_SignUp" type="button" e,
            onclick="window.open('login.html', '_self', 'resizable=yes')"
             class="btn btn-primary btn-sm">Log In</button> </p>`);
      console.log(data);
    },
    error: function(err) {
        try{
        addErrorMessage(err.responseJSON.message);
        resetInput();
        DisableButton();
      }
      catch(e){
        addErrorMessage("Cannot send your request! Please try again!");
        DisableButton();
      }
      console.log(err);
    }
  });

  e.preventDefault();
});

async function main(){
  var user = await isLoggedIn();
  //var isSignedIn = true;
  if(user === null){
    showLoadingScreenMessage("You are not logged in",`
    <p style="color: black;">Please
     <button id="btn_SignUp" type="button" e,
      onclick="window.open('login.html', '_self', 'resizable=yes')"
     class="btn btn-primary btn-sm">Log In</button>
    `);
  }
  else{
    $("#EmailAddress").val(user.email);
    $("#UserName").val(user.username);
    $("#profileNav").html("Welcome "+user.username+" ");
    $(".fadeMe").fadeOut();
    hideLoadingScreen();
  }
}

$(document).ready(function() {
      main();
});
