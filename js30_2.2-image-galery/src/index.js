import {
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
} from "./utils/constants.js";


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

async function getPhoto() {
    const res = await fetch("https://api.unsplash.com/photos/?per_page=15", {
        method: "GET",
        headers: {
            "Accept-Version": "v1",
            Authorization:
                "Client-ID HR-ZoD9QKz8-G3XXQcDdXvDyZVQg_v4KD-7P86HhD5s",
        },
    });
    if (res.ok) {
        const data = await res.json();
        data.forEach((photo) => {
            renderCard(createCard(photo.urls.regular));
        });
    } else {
        return Promise.reject(res);
    }
}

function errorHandler(errorStatus) {
    if (Object.keys(serverErrors).includes(String(errorStatus))) {
        return serverErrors[errorStatus];
    }
    return "Серверная ошибка.";
}

function returnError(err) {
    return `${errorHandler(err.status)} Номер ошибки - ${
        err.status ? err.status : "неизвестен"
    }. Всего хорошего!`;
}

/* 12 фото при загрузке страницы */
getPhoto().catch((err) => {
    console.log(returnError(err));
});
/* let color; &color=${color} */

async function findPhoto(query) {
    const res = await fetch(
        `https://api.unsplash.com/search/photos/?per_page=18&query=${query}`,
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
        renderCard(createCard(photo.urls.regular));
    });
}

function handleSubmit(evt) {
    evt.preventDefault();
    if (searchInput.value) {
        findPhoto(searchInput.value);
        searchInput.blur();
        searchInput.classList.remove("search__input_with-text");
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
        handleInputFull(clearButton, evt.target);
    } else {
        handleInputClear(clearButton, evt.target);
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
    [langButton.style.backgroundImage, langWrapper.style.backgroundImage] = [
        langWrapper.style.backgroundImage,
        langButton.style.backgroundImage,
    ];
});

/* Смена темы страницы */
themeButton.addEventListener("click", (evt) => {
    /* Операции над кнопками смены цвета */
    const textThemeButton = themeButton.querySelector(".buttons__text");
    const textThemeWrapper = themeWrapper.querySelector(".buttons__text");
    function toggleTextTheme(textElement) {
        textElement.classList.toggle("buttons__text_color_dark");
        textElement.classList.toggle("buttons__text_color_light");
    }
    [textThemeButton.textContent, textThemeWrapper.textContent] = [
        textThemeWrapper.textContent,
        textThemeButton.textContent,
    ];
    toggleTextTheme(textThemeButton);
    toggleTextTheme(textThemeWrapper);
    /* Кнопка и обертка меняются текстами */
    [themeButton.style.backgroundColor, themeWrapper.style.backgroundColor] = [
        themeWrapper.style.backgroundColor,
        themeButton.style.backgroundColor,
    ];
    page.classList.toggle("page_light");
    header.classList.toggle("header_light");
    headerLogo.classList.toggle("header__logo_light");
    texts.forEach((item) => {
        item.classList.toggle("page__white-text");
    });
    /* Проходим по всем формам, ищем все инпуты типа text и меняем цвет текста их лэйблов на противоположный */
    Array.from(forms).forEach((form) => {
        Array.from(form.elements).forEach((element) => {
            if (element.type === "text") {
                if (element.value) {
                    const label = findLabel(element);
                    label.classList.toggle(`${element.name}-label_dark`);
                }
            }
        });
    });
});

console.log(`
"Самооценка для проверяющего"
Score: 60 / 60.

[10/10] - Вёрстка
- [+] на странице есть несколько фото и строка поиска (+5)
- [+] в футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс (+5)

[10/10] - При загрузке приложения на странице отображаются полученные от API изображения

[10/10] - Если в поле поиска ввести слово и отправить поисковый запрос, 
на странице отобразятся изображения соответствующей тематики, если такие данные предоставляет API

[30/30] - Поиск
- [+] При открытии приложения курсор находится в поле ввода (+5)
- [+] Есть placeholder (+5)
- [+] Автозаполнение поля ввода отключено (нет выпадающего списка с предыдущими запросами) (+5)
- [+] Поисковый запрос можно отправить нажатием клавиши Enter (+5)
- [+] После отправки поискового запроса и отображения результатов поиска, поисковый запрос продолжает отображаться в поле ввода (+5)
- [+] В поле ввода есть крестик при клике по которому поисковый запрос из поля ввода удаляется и отображается placeholder (+5)

[10/10] - Дополнительно
- [+] Адаптивная верстка, при уменьшении ширины экрана меняются сетка галереи и размеры некоторых элементов страницы
- [+] Есть возможность выбора языка страницы (русский/английский)
- [+] Есть возможность выбора темы страницы (светлая/темная)
- [+] Верстка поисковой строки с плавными анимациями
- [+] Обработка серверных ошибок`);
