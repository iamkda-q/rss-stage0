const playButton = document.querySelector(".videoplayer__button_type_play");
const video = document.querySelector(".videoplayer__video");

video.addEventListener("mousemove", () => {
  if (playButton.classList.contains("videoplayer__button_type_pause")) {
    playButton.style.visibility = "visible";
  }
  timeCounter = Date.now();
  video.style.cursor = "default";
});

video.addEventListener("click", () => {
  if (video.paused) {
    video.play();
    playButton.style.visibility = "hidden";
  } else {
    video.pause();
    playButton.style.visibility = "visible";
  }
});

video.addEventListener("mouseout", () => {
  if (!video.paused) {
    playButton.style.visibility = "hidden";
  }
});

video.addEventListener("play", () => {
  playButton.classList.remove("videoplayer__button_type_play");
  playButton.classList.add("videoplayer__button_type_pause");
});

video.addEventListener("pause", () => {
  playButton.classList.remove("videoplayer__button_type_pause");
  playButton.classList.add("videoplayer__button_type_play");
});


// Исчезновение курсора при бездействии 
const timeCursorVisibility = 3000;
let timeCounter = 0;

setInterval(() => {
  if (Date.now() - timeCounter >= timeCursorVisibility && playButton.classList.contains("videoplayer__button_type_pause")) {
    video.style.cursor = "none";
    playButton.style.visibility = "hidden";
  }
}, 99)