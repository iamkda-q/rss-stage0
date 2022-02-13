const ru = {
    ".header__title": "Галерея с API Unsplash",
    ".search__input": "Например, котики...",
    ".search__input-label": "Поиск фото",
    ".footer__copyright": "2022 Коннов Дмитрий",
    ".footer__link": "Мой github",
    ".buttons__text_en": "Рус",
    ".buttons__text_ru": "Англ",
    ".buttons__text_color_light": "Ночь",
    ".buttons__text_color_dark": "День",
};

const en = {
    ".header__title": "Gallery with API Unsplash",
    ".search__input": "For example, cats...",
    ".search__input-label": "Photo search",
    ".footer__copyright": "2022 Konnov Dmitriy",
    ".footer__link": "My github",
    ".buttons__text_en": "En",
    ".buttons__text_ru": "Rus",
    ".buttons__text_color_light": "Dark",
    ".buttons__text_color_dark": "Light",
};

const languages = {
    ru: ru,
    en: en,
};

const serverErrors = {
    400: "Некорректный запрос на сервер",
    401: "Извините, но по какой-то причине вам отказано в доступе.",
    403: "Извините, но по какой-то причине вам отказано в доступе.",
    404: "Запрашиваемый вами ресурс отсутствует.",
    500: "Внутренняя ошибка сервера.",
};

/* Цвета для кнопок Lang и Theme */
const BGRU =
    "linear-gradient(180deg, white 0%, white 33%, blue 33%, blue 66%, red 66%, red 100%)";
const BGEN = `linear-gradient(0deg, red 0%, red 10%, white 10%, white 20%, red 20%, red 30%, white 30%, white 40%,
red 40%, red 50%, white 50%, white 60%, red 60%, red 70%, white 70%, blue 100%)`;
const DARK = "black";
const LIGHT = "white";

/* Header */
const header = document.querySelector(".header");
const headerLogo = header.querySelector(".header__logo");

/* Галерея */
const gallery = document.querySelector(".gallery__list");
const galleryItemTemplate = document.querySelector("#gallery__item"); // template-разметка карточки
const page = document.querySelector(".page");
/* Поиск */
const forms = document.forms;
const searchForm = forms["search__form"];
const searchInput = searchForm.elements["search__input"];
const clearButton = document.querySelector(".search__clear-button");
/* Язык */
const texts = Array.from(document.querySelectorAll(".page__white-text"));
const langButton = document.querySelector(".buttons__button_lang");
const langWrapper = document.querySelector(".buttons__wrapper_lang");
/* Тема */
const themeButton = document.querySelector(".buttons__button_theme");
const themeWrapper = document.querySelector(".buttons__wrapper_theme");

export {
    languages,
    serverErrors,
    BGRU,
    BGEN,
    DARK,
    LIGHT,
    header,
    headerLogo,
    gallery,
    galleryItemTemplate,
    page,
    forms,
    searchForm,
    searchInput,
    clearButton,
    texts,
    langButton,
    langWrapper,
    themeButton,
    themeWrapper,
};
