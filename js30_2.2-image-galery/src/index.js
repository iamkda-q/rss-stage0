import {initialCards, languages} from "./utils/constants.js";
/* Цвета для кнопок Lang и Theme */
const BGRU = "linear-gradient(180deg, white 0%, white 33%, blue 33%, blue 66%, red 66%, red 100%)";
const BGEN = `linear-gradient(0deg, red 0%, red 10%, white 10%, white 20%, red 20%, red 30%, white 30%, white 40%,
    red 40%, red 50%, white 50%, white 60%, red 60%, red 70%, white 70%, blue 100%)`;
const DARK = "black";
const LIGHT = "white";
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

langButton.style.backgroundImage = BGEN; 
langWrapper.style.backgroundImage = BGRU; 

themeButton.style.backgroundColor = LIGHT; 
themeWrapper.style.backgroundColor = DARK; 

/* Отрисовка карточки */
function renderCard(card) {
    gallery.append(card);
}

/* Создание карточки */
function createCard(cardLink) {
    const galleryItem = galleryItemTemplate.content.cloneNode(true);
    const galleryPhoto = galleryItem.querySelector(".gallery__photo");
    galleryPhoto.src = cardLink;
    return galleryItem;
}

/* Очистка галереи */
function clearGallery() {
    while (gallery.lastChild) {
        gallery.removeChild(gallery.lastChild);
      }
}

initialCards.forEach((item) => {
    renderCard(createCard(item.link));
});
initialCards.forEach((item) => {
    renderCard(createCard(item.link));
});
initialCards.forEach((item) => {
    renderCard(createCard(item.link));
});

// fetch("https://api.unsplash.com/photos/", { /* ?client_id=HR-ZoD9QKz8-G3XXQcDdXvDyZVQg_v4KD-7P86HhD5s */
//     method: "GET",
//     headers: {
//         "Accept-Version": "v1",
//         Authorization: `Client-ID HR-ZoD9QKz8-G3XXQcDdXvDyZVQg_v4KD-7P86HhD5s`
//     }
// })
// .then(res => res.json())
// .then(res => {
//     console.log(res);
//     res.forEach(photo => {
//         renderCard(createCard(photo.urls.regular))
//     })
// })
// .catch(() => {
//     console.log("NO WORK");
// })

// async function getPhoto() {
//     const res = await fetch("https://api.unsplash.com/photos/?per_page=12", {
//         method: "GET",
//         headers: {
//             'Accept-Version': 'v1',
//             Authorization: 'Client-ID HR-ZoD9QKz8-G3XXQcDdXvDyZVQg_v4KD-7P86HhD5s',
//         },
//     });
//     const data = await res.json();
//     data.forEach((photo) => {
//         renderCard(createCard(photo.urls.regular));
//     });
// }

/* let color; &color=${color} */

async function findPhoto(query) {
    const res = await fetch(
        `https://api.unsplash.com/search/photos/?per_page=12&query=${query}`,
        {
            method: "GET",
            headers: {
                "Accept-Version": "v1",
                Authorization:
                    "Client-ID HR-ZoD9QKz8-G3XXQcDdXvDyZVQg_v4KD-7P86HhD5s",
            },
        }
    );
    const data = await res.json();
    clearGallery();
    data.results.forEach((photo) => {
        renderCard(createCard(photo.urls.regular))
    });
}

function handleSubmit(evt) {
    evt.preventDefault();
    if (searchInput.value) {
        /*         findPhoto(searchInput.value)
                searchInput.blur();
                searchInput.classList.remove("search__input_with-text"); */
                searchInput.focus();
            }
}

function findLabel(element) {
    return document.querySelector(`.${element.name}-label`);
}

searchInput.addEventListener("focus", (evt) => {
    const label = findLabel(evt.target);
    label.classList.add(`${evt.target.name}-label_shift`);
    if (page.classList.contains("page_light")) {
        label.classList.add(`${evt.target.name}-label_dark`);
    }
});

function handleInputClear(btn, input) {
    btn.classList.add("search__clear-button_hidden");
    input.style.paddingLeft = "";
}

function handleInputFull(btn, input) {
    btn.classList.remove("search__clear-button_hidden");
    input.style.paddingLeft = "30px";
}

function clearInput(btn, input) {
    input.value = "";
    handleInputClear(btn, input);
    input.focus();
}

searchInput.addEventListener("input", (evt) => {
    if (evt.target.value) {
        handleInputFull(clearButton , evt.target)
    } else {
        handleInputClear(clearButton , evt.target)
    }
});

clearButton.addEventListener("click", (evt) => {
    clearInput(evt.target, searchInput);
});

searchInput.addEventListener("blur", (evt) => {
    // событие blur происходит, когда фокус убирается с input
    const label = findLabel(evt.target);
    if (!evt.target.value) {
        if (page.classList.contains("page_light")) {
            label.classList.remove(`${evt.target.name}-label_dark`);
        }
        label.classList.remove(`${evt.target.name}-label_shift`);
    }
});

/* Фокус на строке поиска при загрузке страницы */
searchInput.focus();

searchForm.addEventListener("submit", handleSubmit);

function setLang() {
    for (let selector in languages[currentLang]) {
        const element = document.querySelector(selector);
        if (element.placeholder) {
            element.placeholder = languages[currentLang][selector];
            continue;
        }
        element.textContent = languages[currentLang][selector];
    }
}

/* Простановка текстов при загрузке страницы */
let currentLang = "ru";
setLang();

function changeLang() {
    if (currentLang == "ru") {
        currentLang = "en";
    } else {
        currentLang = "ru";
    }
    setLang();
}

/* Смена языка */
langButton.addEventListener("click", (evt) => {
    changeLang();
    [langButton.style.backgroundImage, langWrapper.style.backgroundImage] = [langWrapper.style.backgroundImage, langButton.style.backgroundImage];
});

const header = document.querySelector(".header");
const headerLogo = header.querySelector(".header__logo");

/* Смена темы страницы */
themeButton.addEventListener("click", (evt) => {
    /* Операции над кнопками смены цвета */
    const textThemeButton = themeButton.querySelector(".buttons__text");
    const textThemeWrapper = themeWrapper.querySelector(".buttons__text");
    function toggleTextTheme(textElement) {
        textElement.classList.toggle("buttons__text_color_dark");
        textElement.classList.toggle("buttons__text_color_light");
    }
    [textThemeButton.textContent, textThemeWrapper.textContent] = [textThemeWrapper.textContent, textThemeButton.textContent];
    toggleTextTheme(textThemeButton);
    toggleTextTheme(textThemeWrapper);
    /* Кнопка и обертка меняются текстами */
    [themeButton.style.backgroundColor, themeWrapper.style.backgroundColor] = [themeWrapper.style.backgroundColor, themeButton.style.backgroundColor];
    page.classList.toggle("page_light");
    header.classList.toggle("header_light");
    headerLogo.classList.toggle("header__logo_light");
    texts.forEach(item => {
        item.classList.toggle("page__white-text");
    });
    /* Проходим по всем формам, ищем все инпуты типа text и меняем цвет текста их лэйблов на противоположный */
    Array.from(forms).forEach(form => {
        Array.from(form.elements).forEach(element => {
            if (element.type === "text") {
                if (element.value) {
                    const label = findLabel(element);
                    label.classList.toggle(`${element.name}-label_dark`);
                }
            }
        })
    });

});



















console.log();