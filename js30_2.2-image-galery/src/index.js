import initialCards from "./utils/constants.js";

const gallery = document.querySelector(".gallery__list");

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

console.log();
