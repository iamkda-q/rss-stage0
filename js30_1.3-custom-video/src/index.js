const videoPlayer = document.querySelector(".videoplayer");
const playButton = videoPlayer.querySelector(".videoplayer__button");
const video = videoPlayer.querySelector(".videoplayer__video");

const playStopVideo = () => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
};

const makePauseBtnVisible = () => {
  if (playButton.classList.contains("videoplayer__button_type_pause")) {
    playButton.style.visibility = "visible";
  }
};

videoPlayer.addEventListener("mousemove", () => {
  makePauseBtnVisible();
  timeCounter = Date.now();
  video.style.cursor = "default";
});

videoPlayer.addEventListener("mouseout", () => {
  if (!video.paused) {
    playButton.style.visibility = "hidden";
  }
});

videoPlayer.addEventListener("click", playStopVideo);

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





