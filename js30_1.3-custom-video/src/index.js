const videoPlayer = document.querySelector(".videoplayer");
const playButton = videoPlayer.querySelector(".videoplayer__button");
const video = videoPlayer.querySelector(".videoplayer__video");
const progress = videoPlayer.querySelector(".videoplayer__progress-bar");


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

video.addEventListener("timeupdate", () => {
  const currentTime = video.currentTime / video.duration * 100;
  progress.style.background = `linear-gradient(to right, rgba(180, 8, 8, 0.7) 0%, rgba(180, 8, 8, 0.7) ${currentTime}%, 
  rgba(95, 95, 95, 0.7) ${currentTime}%, rgba(95, 95, 95, 0.7) 100%)`;
});

const setCurrentTimeVideo = (evt) => {
  evt.stopPropagation();
  video.currentTime = ((evt.clientX - videoPlayer.offsetLeft) / videoPlayer.offsetWidth) * video.duration;
};

const rem = (evt) => {
  evt.stopPropagation();
  progress.removeEventListener("mousemove", setCurrentTimeVideo);
  progress.removeEventListener("mouseup", rem);
  progress.removeEventListener("mouseout", rem);
};

progress.addEventListener("mousedown",(evt) => {
  evt.stopPropagation();
  progress.addEventListener("mousemove", setCurrentTimeVideo);
  progress.addEventListener("mouseout", rem);
  progress.addEventListener("mouseup", rem);
});

progress.addEventListener("click", setCurrentTimeVideo);



