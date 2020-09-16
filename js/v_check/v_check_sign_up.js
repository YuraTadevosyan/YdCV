$(function () {
  //SIGN-UP

  //confirm Sign-up
  $("#button_of_confirm_SUP").on("click", function () {
    var hash_checker_SUP = $("#inp_of_confirm_SUP").val();
    $.ajax({
      method: "POST",
      url: "../../php/sign/sign-up.php",
      data: {
        action: "v_check_SUP",
        hash_checker: hash_checker_SUP,
        mail_SUP: $("#form_email").val().trim(),
      },
      success: function (data_mail_SUP) {
        data_mail_SUP = data_mail_SUP.trim();
        if (data_mail_SUP === "no_con") {
          alert("Don't match");
          $("#inp_of_confirm_SUP").css("border-bottom", "2px solid #F90A0A");
        } else if (data_mail_SUP === "sful_con") {
          alert("Successful Connect");
          $("#inp_of_confirm_SUP").css("border-bottom", "2px solid #34F458");
          $(".sign-in").css("display", "block");
          $(".signup").css("display", "none");

          $(".signup-form").css("display", "block");
          $(".fin_sign-up").css("display", "none");
        }
      },
    });
  });

  //send the messege again ....Sign-Up
  $("#get_the_gen_code_sign_up").on("click", function () {
    $.ajax({
      async: false,
      method: "POST",
      url: "../../php/sign/sign-up.php",
      data: {
        action: "send_SUP",
        send_c: $("#form_email").val().trim(),
      },
      success: function (send_mess_SUP) {
        send_mess_SUP = send_mess_SUP.trim();
        if (send_mess_SUP === "no_conect") {
          alert("Sorry,no connection");
        } else if (send_mess_SUP === "yes_connect") {
          alert("Check Email");
        } else {
          alert(send_mess_SUP);
        }
      },
    });
  });
});
