$(function () {
  $("#email_error_message2").hide();
  $("#password_error_message2").hide();

  var error_email2 = false;
  var error_password2 = false;

  $("#form_email2").keyup(function () {
    check_email2();
  });
  $("#form_password2").keyup(function () {
    check_password2();
  });

  function check_email2() {
    var pattern = /^([a-z\d\.-_]{2,20})@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/;
    var email = $("#form_email2").val();
    if (pattern.test(email) && email !== "") {
      $("#email_error_message2").hide();
      $("#form_email2").css("border-bottom", "2px solid #34F458");
      error_email2 = false;
    } else {
      $("#email_error_message2").html(
        "<p class='error_form' >Username can only contain letters, numbers, periods (.), and underscores (_).</p>"
      );
      $("#email_error_message2").show();
      $("#form_email2").css("border-bottom", "2px solid #F90A0A");
      error_email2 = true;
    }
  }

  function check_password2() {
    var pat3 = /^[a-zA-Z0-9]+$/;
    var password = $("#form_password2").val();
    if (password.length > 8 && pat3.test(password) && password !== "") {
      $("#password_error_message2").hide();
      $("#form_password2").css("border-bottom", "2px solid #34F458");
      error_password2 = false;
    } else {
      $("#password_error_message2").html(
        "<p class='error_form' >Should contain  more than 8 symbols and only letters and numbers</p>"
      );
      $("#password_error_message2").show();
      $("#form_password2").css("border-bottom", "2px solid #F90A0A");
      error_password2 = true;
    }
  }

  $("#button_of_login").click(function () {
    check_email2();
    check_password2();

    if (error_email2 === false && error_password2 === false) {
      var email2 = $("#form_email2").val();
      var password2 = $("#form_password2").val();
      $.ajax({
        method: "Post",
        url: "../../php/sign/sign-in.php",
        async: false,
        data: {
          action: "sign-in",
          email2: email2,
          password2: password2,
        },
        success: function (data_sign) {
          data_sign = data_sign.trim();
          if (data_sign == "Account with this email isn't registered") {
            alert(data_sign);
          } else if (data_sign == "Please activate") {
            alert(data_sign);
            $(".sign-in").css("display", "block");
            $(".signup").css("display", "none");

            $(".signin-form").css("display", "none");
            $(".fin_sign-in").css("display", "block");
          } else if ((data_sign = "Welcome")) {
            alert(data_sign);
            document.location.href = "../../php/acc.php";
          } else {
            alert(data_sign);
          }
        },
      });
      //
      //return the form to the default view

      // $(".form_inp").val("");

      //border-bottom color return to the default view

      $(".form_inp").css("border-bottom", "1px solid #999");
      //
      return true;
    } else {
      alert("Please Fill the form Correctly");
      //
      //return the form to the default view

      $(".form_inp").val("");

      //border-bottom color return to the default view

      $(".form_inp").css("border-bottom", "1px solid #999");
      //
      return false;
    }
  });
});
