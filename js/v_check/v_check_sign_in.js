$(function () {
  //SIGN-IN

  //confirm Sign-in
  $("#button_of_confirm_SIN").on("click", function () {
    var hash_checker_SIN = $("#inp_of_confirm_SIN").val();
    $.ajax({
      method: "POST",
      url: "../../php/sign/sign-in.php",
      data: {
        action: "v_check_SIN",
        hash_checker: hash_checker_SIN,
        mail_SIN: $("#form_email2").val().trim(),
      },
      success: function (data_mail_SIN) {
        data_mail_SIN = data_mail_SIN.trim();
        if (data_mail_SIN === "n_con") {
          alert("Don't match");
          $("#inp_of_confirm_SIN").css("border-bottom", "2px solid #F90A0A");
        } else if (data_mail_SIN === "s_con") {
          alert("Successful Connect");
          $("#inp_of_confirm_SIN").css("border-bottom", "2px solid #34F458");
          $(".sign-in").css("display", "block");
          $(".signup").css("display", "none");

          $(".signin-form").css("display", "block");
          $(".fin_sign-in").css("display", "none");
        }
      },
    });
  });

  //send the messege again ....Sign-In
  $("#get_the_gen_code_sign_in").on("click", function () {
    $.ajax({
      async: false,
      method: "POST",
      url: "../../php/sign/sign-in.php",
      data: {
        action: "send_SIN",
        send_code: $("#form_email2").val().trim(),
      },
      success: function (send_mess_SIN) {
        send_mess_SIN = send_mess_SIN.trim();
        if (send_mess_SIN === "n_conect") {
          alert("Sorry,no connection");
        } else if (send_mess_SIN === "y_connect") {
          alert("Check Email");
        } else {
          alert(send_mess_SIN);
        }
      },
    });
  });
});
