import initialCards from "./utils/constants.js";

const gallery = document.querySelector(".gallery__list");
const page = document.querySelector(".page");


function createCard(cardLink) {
    const galleryItemTemplate = document.querySelector("#gallery__item");
    const galleryItem = galleryItemTemplate.content.cloneNode(true);
    const galleryPhoto = galleryItem.querySelector(".gallery__photo");
    galleryPhoto.src = cardLink;
    gallery.append(galleryItem);
}

/* Функция очистки галереи */
function clearGallery() {
    while (gallery.lastChild) {
        gallery.removeChild(gallery.lastChild);
      }
}

initialCards.forEach((item) => {
    createCard(item.link);
});
initialCards.forEach((item) => {
    createCard(item.link);
});
initialCards.forEach((item) => {
    createCard(item.link);
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
//         createCard(photo.urls.regular)
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
//         createCard(photo.urls.regular);
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
        createCard(photo.urls.regular);
    });
}

const searchInput = document.forms["search__form"].elements["search__input"];

searchInput.addEventListener("blur", (evt) => {
    // событие blur происходит, когда фокус убирается с input
    if (evt.target.value) {
        evt.target.classList.add("search__input_with-text");
    } else {
        evt.target.classList.remove("search__input_with-text");
    }
});

const searchButton = document.querySelector(".search__button");

searchButton.addEventListener("click", (evt) => {
    evt.preventDefault();
    if (searchInput.value) {
/*         findPhoto(searchInput.value)
        searchInput.value = "";
        searchInput.blur();
        searchInput.classList.remove("search__input_with-text"); */

    }
});

const BGRU = "linear-gradient(180deg, white 0%, white 33%, blue 33%, blue 66%, red 66%, red 100%)";
const BGEN = `linear-gradient(0deg, red 0%, red 10%, white 10%, white 20%, red 20%, red 30%, white 30%, white 40%,
    red 40%, red 50%, white 50%, white 60%, red 60%, red 70%, white 70%, blue 100%)`;

/* const BGLIGHT = "linear-gradient(180deg, white 0%, white 40%, black 100%)"; */
const DARK = "black";
const LIGHT = "white";

const langButton = document.querySelector(".buttons__button_lang");
const langWrapper = document.querySelector(".buttons__wrapper_lang");

const themeButton = document.querySelector(".buttons__button_theme");
const themeWrapper = document.querySelector(".buttons__wrapper_theme");

langButton.style.backgroundImage = BGEN; 
langWrapper.style.backgroundImage = BGRU; 

themeButton.style.backgroundColor = LIGHT; 
themeWrapper.style.backgroundColor = DARK; 



langButton.addEventListener("click", (evt) => {
    const textButton = langButton.querySelector(".buttons__text");
    const textWrapper = langWrapper.querySelector(".buttons__text");
    [textButton.textContent, textWrapper.textContent] = [textWrapper.textContent, textButton.textContent];
    [langButton.style.backgroundImage, langWrapper.style.backgroundImage] = [langWrapper.style.backgroundImage, langButton.style.backgroundImage];


});

const textThemeButton = themeButton.querySelector(".buttons__text");
const textThemeWrapper = themeWrapper.querySelector(".buttons__text");
textThemeButton.style.color = DARK; 
textThemeWrapper.style.color = LIGHT; 

themeButton.addEventListener("click", (evt) => {
    [textThemeButton.textContent, textThemeWrapper.textContent] = [textThemeWrapper.textContent, textThemeButton.textContent];
    [textThemeButton.style.color, textThemeWrapper.style.color] = [textThemeWrapper.style.color, textThemeButton.style.color];
    [themeButton.style.backgroundColor, themeWrapper.style.backgroundColor] = [themeWrapper.style.backgroundColor, themeButton.style.backgroundColor];
    page.classList.toggle("page_light");
});


















console.log();