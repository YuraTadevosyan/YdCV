$(function () {
  $("#button_of_confirm_REC_pend").on("click", function () {
    $.ajax({
      method: "POST",
      url: "../../php/recover/recover.php",
      data: {
        action: "pend_recover",
        pend_head_mail: $("#form_email_recover_head").val().trim(),
        pend_verif: $("#inp_of_confirm_REC_pend").val().trim(),
      },
      success: function (rec_pending) {
        rec_pending = rec_pending.trim();
        if (rec_pending === "pend_yes") {
          $(".recover-form_head").css("display", "none");
          $(".fin_rec_pend").css("display", "none");
          $(".recover-form_final").css("display", "block");
          $(".fin_rec_act").css("display", "none");
        } else if (rec_pending === "pend_no") {
          alert("Don't match");
          $("#inp_of_confirm_REC_pend").val("");
        } else {
          alert(rec_pending);
        }
      },
    });
  });

  //Send Again The Messege...Pending Data
  $("#get_the_gen_code_recover_pend").on("click", function () {
    $.ajax({
      method: "POST",
      url: "../../php/recover/recover.php",
      data: {
        action: "send_REC_pend",
        send_c_rec_pend: $("#form_email_recover_head").val().trim(), //send code for recover...pending data
      },
      success: function (send_mess_REC_pend) {
        send_mess_REC_pend = send_mess_REC_pend.trim();
        if (send_mess_REC_pend === "pend_send_yes") {
          alert("Check Mail");
        } else if (send_mess_REC_pend === "pend_send_no") {
          alert("Sorry,no connection");
        } else {
          alert(send_mess_REC_pend);
        }
      },
    });
  });
});
