function preloader() {
  $(() => {
    setInterval(() => {
      let p = $(".preloader");
      p.css("opacity", 0);
      p.css("z-index", -1);
    }, 1000);
  });
}

preloader();
