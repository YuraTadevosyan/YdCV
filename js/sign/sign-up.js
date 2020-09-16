$(function () {
  $("#fname_error_message").hide();
  $("#email_error_message").hide();
  // $("#file_error_message").hide();
  $("#password_error_message").hide();
  $("#retype_password_error_message").hide();

  var error_fname = false;
  var error_email = false;
  //var error_iamge = false;
  var error_password = false;
  var error_retype_password = false;

  $("#form_fname").keyup(function () {
    check_fname();
  });

  $("#form_email").keyup(function () {
    check_email();
  });

  // $("#form_image").change(function () {
  //   check_image();
  // });

  $("#form_password").keyup(function () {
    check_password();
  });

  $("#form_retype_password").keyup(function () {
    check_retype_password();
  });

  function check_fname() {
    var pat1 = /^[a-zA-Z][a-zA-Z0-9-_\.]+$/;
    var fname = $("#form_fname").val();
    if (fname.length < 2) {
      $("#fname_error_message").html(
        "<p class='error_form' >Less than 2 symbols</p>"
      );
      $("#fname_error_message").show();
      $("#form_fname").css("border-bottom", "2px solid #F90A0A");
      error_fname = true;
    } else if (fname.length > 12) {
      $("#fname_error_message").html(
        "<p class='error_form' >More than 12 symbols</p>"
      );
      $("#fname_error_message").show();
      $("#form_fname").css("border-bottom", "2px solid #F90A0A");
      error_fname = true;
    } else if (pat1.test(fname) && fname !== "") {
      $("#fname_error_message").hide();
      $("#form_fname").css("border-bottom", "2px solid #34F458");
      error_fname = false;
    } else {
      $("#fname_error_message").html(
        "<p class='error_form' >It's not correct User Firstname</p>"
      );
      $("#fname_error_message").show();
      $("#form_fname").css("border-bottom", "2px solid #F90A0A");
      error_fname = true;
    }
  }

  function check_password() {
    var pat3 = /^[a-zA-Z0-9]+$/;
    var password = $("#form_password").val();
    if (password.length > 8 && pat3.test(password) && password !== "") {
      $("#password_error_message").hide();
      $("#form_password").css("border-bottom", "2px solid #34F458");
      error_password = false;
    } else {
      $("#password_error_message").html(
        "<p class='error_form' >Should contain  more than 8 symbols and only letters and numbers</p>"
      );
      $("#password_error_message").show();
      $("#form_password").css("border-bottom", "2px solid #F90A0A");
      error_password = true;
    }
  }

  function check_retype_password() {
    var password = $("#form_password").val();
    var retype_password = $("#form_retype_password").val();
    if (password !== retype_password) {
      //l erku resov stugel pordze axper jan...recover.jsi pes era
      $("#retype_password_error_message").html(
        "<p class='error_form' >Passwords Did not Matched</p>"
      );
      $("#retype_password_error_message").show();
      $("#form_retype_password").css("border-bottom", "2px solid #F90A0A");
      error_retype_password = true;
    } else {
      $("#retype_password_error_message").hide();
      $("#form_retype_password").css("border-bottom", "2px solid #34F458");
      error_retype_password = false;
    }
  }

  function check_email() {
    var pattern = /^([a-z\d\.-_]{2,20})@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/;
    var email = $("#form_email").val();
    if (pattern.test(email) && email !== "") {
      $("#email_error_message").hide();
      $("#form_email").css("border-bottom", "2px solid #34F458");
      error_email = false;
    } else {
      $("#email_error_message").html(
        "<p class='error_form' >Username can only contain letters, numbers, periods (.), and underscores (_).</p>"
      );
      $("#email_error_message").show();
      $("#form_email").css("border-bottom", "2px solid #F90A0A");
      error_email = true;
    }
  }

  // function check_image() {
  //   var item = $("#form_image").prop("files")[0].type;
  //   var size = $("#form_image").prop("files")[0].size;
  //   if (
  //     (item === "image/jpeg" || item === "image/gif" || item === "image/png") &&
  //     size < 52428800
  //   ) {
  //     error_iamge = false;
  //     $("#file_error_message").hide();
  //     $("#form_image").css("border-bottom", "2px solid #34F458");
  //   } else {
  //     $("#file_error_message").html("<p>Invalid foto</p>");
  //     $("#file_error_message").show();
  //     $("#form_image").css("border-bottom", "2px solid #F90A0A");
  //     error_email = true;
  //   }
  // }

  $("#button_of_register").click(function () {
    check_fname();
    check_email();
    check_password();
    check_retype_password();
    // check_image();

    if (
      error_fname === false &&
      error_email === false &&
      // error_iamge === false &&
      error_password === false &&
      error_retype_password === false
    ) {
      var name = $("#form_fname").val();
      var email = $("#form_email").val();
      var password = $("#form_password").val();

      // form_data.append("image", $("#form_image").prop("files")[0]);

      $.ajax({
        method: "POST",
        url: "../../php/sign/sign-up.php",
        data: {
          action: "sign-up",
          name: name,
          email: email,
          password: password,
        },
        success: function (data_of_sign_up) {
          data_of_sign_up = data_of_sign_up.trim();
          if (data_of_sign_up === "acc_no") {
            alert("If you have an account with this email please sign in!!!"); //poxel error messegeov
          } else if (data_of_sign_up === "acc_yes") {
            $(".signup-form").css("display", "none");
            $(".fin_sign-up").css("display", "block");
          } else {
            alert("Fatal error");
            return;
          }
        },
      });
      //
      //return the form to the default view

      //   $(".form_inp").val("");

      //border-bottom color return to the default view

      $(".form_inp").css("border-bottom", "1px solid #999");
      //
      return true;
    } else {
      alert("Please Fill the form Correctly");
      $(".form_inp").css("border-bottom", "2px solid #F90A0A");
      //
      //return the form to the default view
      $(".form_inp").val("");

      //border-bottom color return to the default view

      //  $(".form_inp").css("border-bottom", "1px solid #999");
      //
      return false;
    }
  });
});
