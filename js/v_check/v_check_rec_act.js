$(function () {
  //RECOVER

  //Active Data
  $("#button_of_confirm_REC_act").on("click", function () {
    $.ajax({
      method: "POST",
      url: "../../php/recover/recover.php",
      data: {
        action: "act_recover",
        act_head_mail: $("#form_email_recover_head").val().trim(),
        act_verif: $("#inp_of_confirm_REC_act").val().trim(),
      },
      success: function (rec_active) {
        rec_active = rec_active.trim();
        if (rec_active === "act_yes") {
          $(".recover-form_head").css("display", "none");
          $(".fin_rec_pend").css("display", "none");
          $(".recover-form_final").css("display", "block");
          $(".fin_rec_act").css("display", "none");
        } else if (rec_active === "act_no") {
          alert("Don't match");
          $("#inp_of_confirm_REC_act").val("");
        } else {
          alert(rec_active);
        }
      },
    });
  });

  //Send Again The Messege...Active Data
  $("#get_the_gen_code_recover_act").on("click", function () {
    $.ajax({
      method: "POST",
      url: "../../php/recover/recover.php",
      data: {
        action: "send_REC_act",
        send_c_rec_act: $("#form_email_recover_head").val().trim(), //send code for recover...active data
      },
      success: function (send_mess_REC_act) {
        send_mess_REC_act = send_mess_REC_act.trim();
        if (send_mess_REC_act === "act_send_yes") {
          alert("Check Mail");
        } else if (send_mess_REC_act === "act_send_no") {
          alert("Sorry,no connection");
        } else {
          alert(send_mess_REC_act);
        }
      },
    });
  });
});
