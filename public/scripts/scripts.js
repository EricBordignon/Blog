
// Index page animation
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("index-animation");

  if (!container) {
    console.error("Lottie container not found");
    return;
  }

  lottie.loadAnimation({
    container: container,
    renderer: "svg",
    loop: true,
    autoplay: true,
    path: "/animations/index-animation.json" // works 100%
  });
});


