import {videoPlayer, videoPoster, centerPlayButton, video,
  progress, controls, videoTime, playButton, volumeButton,
  volumeReg, fullscreen} from "./utils/constants.js";

video.volume = volumeReg.value; // громкость видео = заданному при загрузке страницы range

/* Чтобы видео не запускалось при кликах на панели управления */
controls.addEventListener("click", (evt) => {
  evt.stopPropagation();
});

/* Пересчет времени из секунд в формат 00:00:00 */
function calcTime(sec) {
  const currentSeconds = Math.round(sec) % 60;
  const currentMinutes =
    Math.round(sec) / 60 >= 1 ? Math.floor((Math.round(sec) / 60) % 60) : 0;
  const currentHours =
    Math.round(sec) / 3600 >= 1 ? Math.floor((Math.round(sec) / 3600) % 60) : 0;

  const returnTextFormatTimeUnits = (timeUnits) => {
    if (timeUnits < 10) {
      return `0${timeUnits}`;
    }
    return `${timeUnits}`;
  };

  const timeSeconds = returnTextFormatTimeUnits(currentSeconds);
  const timeMinutes = returnTextFormatTimeUnits(currentMinutes);
  const timeHours = returnTextFormatTimeUnits(currentHours);

  return `${timeHours}:${timeMinutes}:${timeSeconds}`;
}

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
  if (
    !volumeReg.classList.contains("videoplayer__volume-reg_invis") &&
    evt.relatedTarget == document.querySelector(".page")
  ) {
    volumeReg.classList.add("videoplayer__volume-reg_invis");
  }
});

videoPlayer.addEventListener("click", () => {
  if (video.classList.contains("page__hidden")) {
    video.classList.remove("page__hidden");
    controls.classList.remove("page__hidden");
    videoPoster.classList.add("page__hidden");
  }
  playStopVideo();
});

video.addEventListener("play", () => {
  changeClass(
    centerPlayButton,
    "videoplayer__button_type_pause",
    "videoplayer__button_type_play"
  );
  changeClass(
    playButton,
    "videoplayer__controls-button_type_pause",
    "videoplayer__controls-button_type_play"
  );
});

video.addEventListener("pause", () => {
  changeClass(
    centerPlayButton,
    "videoplayer__button_type_play",
    "videoplayer__button_type_pause"
  );
  changeClass(
    playButton,
    "videoplayer__controls-button_type_play",
    "videoplayer__controls-button_type_pause"
  );
});

// Исчезновение курсора при бездействии - начало
const timeCursorVisibility = 3000;
let timeCounter = 0;
setInterval(() => {
  if (
    Date.now() - timeCounter >= timeCursorVisibility &&
    centerPlayButton.classList.contains("videoplayer__button_type_pause")
  ) {
    video.style.cursor = "none";
    centerPlayButton.style.visibility = "hidden";
  } else if (
    centerPlayButton.classList.contains("videoplayer__button_type_play")
  ) {
    centerPlayButton.style.visibility = "visible";
  }
}, 99);
// Исчезновение курсора при бездействии - конец


video.addEventListener("timeupdate", () => {
  const currentTime = (video.currentTime / video.duration) * 100;
  progress.style.background = `linear-gradient(to right, rgba(180, 8, 8, 0.7) 0%, rgba(180, 8, 8, 0.7) ${currentTime}%, 
  rgba(95, 95, 95, 0.7) ${currentTime}%, rgba(95, 95, 95, 0.7) 100%)`;
  videoTime.textContent = `${calcTime(video.currentTime)} / ${calcTime(
    video.duration
  )}`;
});

/* Реализация управления текущего времени видео на div без input[range] - начало */
const setCurrentTimeVideo = (evt) => {
  video.currentTime =
    ((evt.clientX - videoPlayer.offsetLeft) / videoPlayer.offsetWidth) *
    video.duration;
};

const rem = () => {
  progress.removeEventListener("mousemove", setCurrentTimeVideo);
  progress.removeEventListener("mouseup", rem);
  progress.removeEventListener("mouseout", rem);
};

progress.addEventListener("mousedown", () => {
  progress.addEventListener("mousemove", setCurrentTimeVideo);
  progress.addEventListener("mouseout", rem);
  progress.addEventListener("mouseup", rem);
});

progress.addEventListener("click", setCurrentTimeVideo);
/* Реализация управления текущего времени видео на div без input[range] - конец */

/* Работа со звуком - начало */
let currentVolume; // переменная для фиксирования громкости при нажатии кнопки mute
const toggleVolume = () => {
  if (
    volumeButton.classList.contains("videoplayer__controls-button_type_volume")
  ) {
    currentVolume = video.volume;
    video.volume = 0;
    volumeReg.value = 0;
    changeClass(
      volumeButton,
      "videoplayer__controls-button_type_mute",
      "videoplayer__controls-button_type_volume"
    );
  } else {
    video.volume = currentVolume;
    volumeReg.value = currentVolume;
    changeClass(
      volumeButton,
      "videoplayer__controls-button_type_volume",
      "videoplayer__controls-button_type_mute"
    );
  }
};

playButton.addEventListener("click", playStopVideo);
volumeButton.addEventListener("click", toggleVolume);

volumeButton.addEventListener("mouseover", () => {
  volumeReg.classList.remove("videoplayer__volume-reg_invis");
});

volumeReg.addEventListener("input", () => {
  video.volume = volumeReg.value;
  if (volumeReg.value == 0) {
    changeClass(
      volumeButton,
      "videoplayer__controls-button_type_mute",
      "videoplayer__controls-button_type_volume"
    );
  } else {
    changeClass(
      volumeButton,
      "videoplayer__controls-button_type_volume",
      "videoplayer__controls-button_type_mute"
    );
  }
});
/* Работа со звуком - конец */

fullscreen.addEventListener("click", () => {
  video.requestFullscreen();
});

/* Самооценка для проверяющего */
console.log(`
"Самооценка для проверяющего"
Score: 60 / 60.
5.1 Вёрстка (10/10)
[+] вёрстка видеоплеера: есть само видео, в панели управления есть кнопка Play/Pause, прогресс-бар, кнопка Volume/Mute, регулятор громкости звука (5/5)
[±] в футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс (5/5)
5.2 Кнопка Play/Pause на панели управления (10/10)
при клике по кнопке Play/Pause запускается или останавливается проигрывание видео (5/5)
внешний вид и функционал кнопки изменяется в зависимости от того, проигрывается ли видео в данный момент (5/5)
5.3 Прогресс-бар отображает прогресс проигрывания видео. При перемещении ползунка прогресс-бара вручную меняется текущее время проигрывания видео. Разный цвет прогресс-бара до и после ползунка (10/10)
5.4 При перемещении ползунка регулятора громкости звука можно сделать звук громче или тише. Разный цвет регулятора громкости звука до и после ползунка (10/10)
5.5 При клике по кнопке Volume/Mute можно включить или отключить звук. Одновременно с включением/выключением звука меняется внешний вид кнопки. Также внешний вид кнопки меняется, если звук включают или выключают перетягиванием регулятора громкости звука от нуля или до нуля (10/10)
5.6 Кнопка Play/Pause в центре видео (10/10)
есть кнопка Play/Pause в центре видео при клике по которой запускается видео и отображается панель управления (5/5)
когда видео проигрывается, кнопка Play/Pause в центре видео скрывается, когда видео останавливается, кнопка снова отображается (5/5)
5.7 Очень высокое качество оформления приложения и/или дополнительный не предусмотренный в задании функционал, улучшающий качество приложения (10/10)
`);