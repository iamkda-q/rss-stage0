import initialCards from "./utils/constants.js";

const gallery = document.querySelector(".gallery__list");



function createCard(cardLink) {
    const galleryItemTemplate = document.querySelector("#gallery__item");
    const galleryItem = galleryItemTemplate.content.cloneNode(true);
    const galleryPhoto = galleryItem.querySelector(".gallery__photo");
    galleryPhoto.src = cardLink;
    gallery.append(galleryItem);
}

initialCards.forEach(item => {
    createCard(item.link);
});

initialCards.forEach(item => {
    createCard(item.link);
});