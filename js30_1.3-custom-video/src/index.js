const videoPlayer = document.querySelector(".videoplayer");
const centerPlayButton = videoPlayer.querySelector(".videoplayer__button");
const video = videoPlayer.querySelector(".videoplayer__video");
const progress = videoPlayer.querySelector(".videoplayer__progress-bar");
const controls = videoPlayer.querySelector(".videoplayer__controls");
const videoTime = videoPlayer.querySelector(".videoplayer__time");
const playButton = videoPlayer.querySelector(".videoplayer__controls-button_type_play");
const volumeButton = videoPlayer.querySelector(".videoplayer__controls-button_type_volume");
const volumeReg = videoPlayer.querySelector(".videoplayer__volume-reg");
const fullscreen = videoPlayer.querySelector(".videoplayer__controls-button_type_fullscreen");
/* videoTime.textContent = `00:00 / ${video.duration}s`; */
video.volume = volumeReg.value;

controls.addEventListener("click", (evt) => {
  evt.stopPropagation();
});

const playStopVideo = () => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
};

const changeClass = (target, addClass, removeClass) => {
  target.classList.remove(removeClass);
  target.classList.add(addClass);
};

const makePauseBtnVisible = () => {
  if (centerPlayButton.classList.contains("videoplayer__button_type_pause")) {
    centerPlayButton.style.visibility = "visible";
  }
};

videoPlayer.addEventListener("mousemove", () => {
  makePauseBtnVisible();
  timeCounter = Date.now();
  video.style.cursor = "default";
});

videoPlayer.addEventListener("mouseout", (evt) => {
  if (!video.paused) {
    centerPlayButton.style.visibility = "hidden";
  }
  if (!volumeReg.classList.contains("videoplayer__volume-reg_invis") && evt.relatedTarget == document.querySelector(".page")) {
    volumeReg.classList.add("videoplayer__volume-reg_invis");
  }
});

videoPlayer.addEventListener("click", playStopVideo);

video.addEventListener("play", () => {
  changeClass(centerPlayButton, "videoplayer__button_type_pause", "videoplayer__button_type_play");
  changeClass(playButton, "videoplayer__controls-button_type_pause", "videoplayer__controls-button_type_play");
});

video.addEventListener("pause", () => {
  changeClass(centerPlayButton, "videoplayer__button_type_play", "videoplayer__button_type_pause");
  changeClass(playButton, "videoplayer__controls-button_type_play", "videoplayer__controls-button_type_pause");
});

// Исчезновение курсора при бездействии 
const timeCursorVisibility = 3000;
let timeCounter = 0;

setInterval(() => {
  if (Date.now() - timeCounter >= timeCursorVisibility && centerPlayButton.classList.contains("videoplayer__button_type_pause")) {
    video.style.cursor = "none";
    centerPlayButton.style.visibility = "hidden";
  }
}, 99)

video.addEventListener("timeupdate", () => {
  const currentTime = video.currentTime / video.duration * 100;
  progress.style.background = `linear-gradient(to right, rgba(180, 8, 8, 0.7) 0%, rgba(180, 8, 8, 0.7) ${currentTime}%, 
  rgba(95, 95, 95, 0.7) ${currentTime}%, rgba(95, 95, 95, 0.7) 100%)`;
  videoTime.textContent = `${Math.ceil(video.currentTime)} / ${Math.ceil(video.duration)}`;
});

const setCurrentTimeVideo = (evt) => {
  video.currentTime = ((evt.clientX - videoPlayer.offsetLeft) / videoPlayer.offsetWidth) * video.duration;
};

const rem = () => {
  progress.removeEventListener("mousemove", setCurrentTimeVideo);
  progress.removeEventListener("mouseup", rem);
  progress.removeEventListener("mouseout", rem);
};

progress.addEventListener("mousedown",() => {
  progress.addEventListener("mousemove", setCurrentTimeVideo);
  progress.addEventListener("mouseout", rem);
  progress.addEventListener("mouseup", rem);
});




progress.addEventListener("click", setCurrentTimeVideo);


/* const currentSec = video.currentTime; */

const toggleVolume = () => {
  if (volumeButton.classList.contains("videoplayer__controls-button_type_volume")) {
    currentVolume = video.volume;
    video.volume = 0;
    volumeReg.value = 0;
    changeClass(volumeButton, "videoplayer__controls-button_type_mute", "videoplayer__controls-button_type_volume");
  } else {
    video.volume = currentVolume;
    volumeReg.value = currentVolume;
    changeClass(volumeButton, "videoplayer__controls-button_type_volume", "videoplayer__controls-button_type_mute");
  }
};
let currentVolume;

playButton.addEventListener("click", playStopVideo);
volumeButton.addEventListener("click", toggleVolume);


volumeButton.addEventListener("mouseover", () => {
  volumeReg.classList.remove("videoplayer__volume-reg_invis");
});

volumeReg.addEventListener("input", () => {
  video.volume = volumeReg.value;
  if (volumeReg.value == 0) {
    changeClass(volumeButton, "videoplayer__controls-button_type_mute", "videoplayer__controls-button_type_volume");
  } else {
    changeClass(volumeButton, "videoplayer__controls-button_type_volume", "videoplayer__controls-button_type_mute");
  }
});

fullscreen.addEventListener("click", () => {
  video.webkitEnterFullScreen();
});
