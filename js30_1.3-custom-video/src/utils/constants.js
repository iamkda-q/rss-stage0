const videoPlayer = document.querySelector(".videoplayer");
const videoPoster = document.querySelector(".videoplayer__poster");
const centerPlayButton = videoPlayer.querySelector(".videoplayer__button");
const video = videoPlayer.querySelector(".videoplayer__video");
const progress = videoPlayer.querySelector(".videoplayer__progress-bar");
const controls = videoPlayer.querySelector(".videoplayer__controls");
const videoTime = videoPlayer.querySelector(".videoplayer__time");
const playButton = videoPlayer.querySelector(
  ".videoplayer__controls-button_type_play"
);
const volumeButton = videoPlayer.querySelector(
  ".videoplayer__controls-button_type_volume"
);
const volumeReg = videoPlayer.querySelector(".videoplayer__volume-reg");
const fullscreen = videoPlayer.querySelector(
  ".videoplayer__controls-button_type_fullscreen"
);

export {videoPlayer, videoPoster, centerPlayButton, video,
  progress, controls, videoTime, playButton, volumeButton,
  volumeReg, fullscreen};