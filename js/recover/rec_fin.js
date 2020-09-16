//polni bdi verapoxvi
$(function () {
  $("#email_error_message_rec_final").hide();
  $("#password_error_message_rec_final").hide();
  $("#retype_password_error_message_rec_final").hide();

  var error_email_rec_final = false;
  var error_password_rec_final = false;
  var error_retype_password_rec_final = false;

  $("#form_email_recover_final").keyup(function () {
    check_email_rec_final();
  });

  $("#form_password_recover_final").keyup(function () {
    check_password_rec_final();
  });

  $("#form_retype_password_recover_final").keyup(function () {
    check_retype_password_rec_final();
  });

  function check_email_rec_final() {
    var pattern = /^([a-z\d\.-_]{2,20})@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/;
    var email = $("#form_email_recover_final").val();
    if (pattern.test(email) && email !== "") {
      $("#email_error_message_rec_final").hide();
      $("#form_email_recover_final").css("border-bottom", "2px solid #34F458");
      error_email_rec_final = false;
    } else {
      $("#email_error_message_rec_final").html(
        "<p class='error_form' >Username can only contain letters, numbers, periods (.), and underscores (_).</p>"
      );
      $("#email_error_message_rec_final").show();
      $("#form_email_recover_final").css("border-bottom", "2px solid #F90A0A");
      error_email_rec_final = true;
    }
  }

  function check_password_rec_final() {
    var pat3 = /^[a-zA-Z0-9]+$/;
    var password = $("#form_password_recover_final").val();
    if (password.length > 8 && pat3.test(password) && password !== "") {
      $("#password_error_message_rec_final").hide();
      $("#form_password_recover_final").css(
        "border-bottom",
        "2px solid #34F458"
      );
      error_password_rec_final = false;
    } else {
      $("#password_error_message_rec_final").html(
        "<p class='error_form' >Should contain  more than 8 symbols and only letters and numbers</p>"
      );
      $("#password_error_message_final").show();
      $("#form_password_recover_final").css(
        "border-bottom",
        "2px solid #F90A0A"
      );
      error_password_rec_final = true;
    }
  }

  function check_retype_password_rec_final() {
    var password = $("#form_password_recover_final").val();
    var retype_password = $("#form_retype_password_recover_final").val();
    if (password !== retype_password && retype_password !== password) {
      $("#retype_password_error_message_rec_final").html(
        "<p class='error_form' >Passwords Did not Matched</p>"
      );
      $("#retype_password_error_message_rec_final").show();
      $("#form_retype_password_recover_final").css(
        "border-bottom",
        "2px solid #F90A0A"
      );
      error_retype_password_rec_final = true;
    } else {
      $("#retype_password_error_message_rec_final").hide();
      $("#form_retype_password_recover_final").css(
        "border-bottom",
        "2px solid #34F458"
      );
      error_retype_password_rec_final = false;
    }
  }

  $("#button_of_recover_final").click(function () {
    check_email_rec_final();
    check_password_rec_final();
    check_retype_password_rec_final();

    if (
      error_email_rec_final === false &&
      error_password_rec_final === false &&
      error_retype_password_rec_final === false
    ) {
      $.ajax({
        method: "POST",
        url: "../../php/recover/recover.php",
        data: {
          action: "recover_final",
          rec_email_final: $("#form_email_recover_final").val().trim(),
          rec_password_final: $("#form_password_recover_final").val().trim(),
        },
        success: function (data_of_rec_final) {
          data_of_rec_final = data_of_rec_final.trim();
          if (data_of_rec_final === "sful_change") {
            alert("Successfully change!!!");
            $(".signup").css("display", "none");
            $(".fin_rec_act").css("display", "none");
            $(".fin_rec_pend").css("display", "none");
            $(".recover-form_final").css("display", "none");
            $(".recover-form_head").css("display", "block");
            $(".forgot_password").css("display", "none");
            $(".sign-in").css("display", "block");
            $(".form_inp").val("");
          } else if (data_of_rec_final === "rec_no") {
            alert("Sorry,but your account isn't activ");
            $(".recover-form_head").css("display", "none");
            $(".fin_rec_pend").css("display", "block");
            $(".recover-form_final").css("display", "none");
            $(".fin_rec_act").css("display", "none");
          } else if (data_of_rec_final === "acc_not") {
            alert("Don't find this mail");
            $(".form_inp").val("");
          } else if (data_of_rec_final === "no_new_pass") {
            alert("Please write another password");
            $(".form_inp").val("");
          } else {
            alert(data_of_rec_final);
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
