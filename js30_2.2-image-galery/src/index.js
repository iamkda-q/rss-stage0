import initialCards from "./utils/constants.js";

const gallery = document.querySelector(".gallery__list");

function createCard(cardLink) {
    const galleryItemTemplate = document.querySelector("#gallery__item");
    const galleryItem = galleryItemTemplate.content.cloneNode(true);
    const galleryPhoto = galleryItem.querySelector(".gallery__photo");
    galleryPhoto.src = cardLink;
    gallery.append(galleryItem);
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
//     const res = await fetch("https://api.unsplash.com/photos/?per_page=10", {
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

let query;
let color;

async function findPhoto() {
    const res = await fetch(`https://api.unsplash.com/search/photos/?per_page=10&query=${query}&color=${color}`, {
        method: "GET",
        headers: {
            'Accept-Version': 'v1',
            Authorization: 'Client-ID HR-ZoD9QKz8-G3XXQcDdXvDyZVQg_v4KD-7P86HhD5s',
        },
    });
    const data = await res.json();
    console.log(data.results);
    data.results.forEach((photo) => {
        createCard(photo.urls.regular);
    });
}

/* findPhoto(); */