$(function () {
  $("#sign_view").on("click", function () {
    $("#log_cont").css("display", "block");
    $("body").css({ "overflow-y": "hidden" });
    $(".signup").css("display", "block");
  });

  $("#way_to_sign_in").on("click", function () {
    $(".signup").css("display", "none");
    $(".sign-in").css("display", "block");
  });

  $("#way_to_sign_up").on("click", function () {
    $(".sign-in").css("display", "none");
    $(".signup").css("display", "block");
  });

  $("#way_to_recover").on("click", function () {
    $(".sign-in").css("display", "none");
    $(".signup").css("display", "none");
    $(".forgot_password").css("display", "block");
    //  $(".recover-form").css("display", "block");
    // $(".fin_rec").css("display", "none");
  });

  $("#way_to_sign_in_rec").on("click", function () {
    $(".signup").css("display", "none");
    $(".forgot_password").css("display", "none");
    $(".sign-in").css("display", "block");
  });

  $(".close_zmdi").on("click", function () {
    $("body").css("overflow-y", "auto");
    $(".sign-in").css("display", "none");
    $(".signup").css("display", "none");
    $(".forgot_password").css("display", "none");
    $("#log_cont").css("display", "none");
  });
});
