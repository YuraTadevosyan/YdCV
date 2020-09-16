$(function () {
  $("#email_error_message_rec_head").hide();

  var error_email_rec_head = false;

  $("#form_email_recover_head").keyup(function () {
    check_email_rec_head();
  });

  function check_email_rec_head() {
    var pattern = /^([a-z\d\.-_]{2,20})@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/;
    var email = $("#form_email_recover_head").val();
    if (pattern.test(email) && email !== "") {
      $("#email_error_message_rec_head").hide();
      $("#form_email_recover_head").css("border-bottom", "2px solid #34F458");
      error_email_rec_head = false;
    } else {
      $("#email_error_message_rec_head").html(
        "<p class='error_form' >Username can only contain letters, numbers, periods (.), and underscores (_).</p>"
      );
      $("#email_error_message_rec_head").show();
      $("#form_email_recover_head").css("border-bottom", "2px solid #F90A0A");
      error_email_rec_head = true;
    }
  }

  $("#button_of_recover_head").click(function () {
    check_email_rec_head();

    if (error_email_rec_head === false) {
      $.ajax({
        method: "POST",
        url: "../../php/recover/recover.php",
        data: {
          action: "recover_head",
          rec_head_email: $("#form_email_recover_head").val().trim(),
        },
        success: function (data_of_rec_head) {
          data_of_rec_head = data_of_rec_head.trim();
          if (data_of_rec_head === "active_data") {
            $(".recover-form_head").css("display", "none");
            $(".fin_rec_pend").css("display", "none");
            $(".recover-form_final").css("display", "none");
            $(".fin_rec_act").css("display", "block");
          } else if (data_of_rec_head === "pending_data") {
            alert("Sorry,but your account isn't activ");
            $(".recover-form_head").css("display", "none");
            $(".fin_rec_pend").css("display", "block");
            $(".recover-form_final").css("display", "none");
            $(".fin_rec_act").css("display", "none");
          } else if (data_of_rec_head === "no_em") {
            alert("Don't find this mail");
            $(".form_inp").val("");
          } else {
            alert(data_of_rec_head);
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
