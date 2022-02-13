const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    }
  ];

  const ru = {
    ".header__title" : "Галерея с API Unsplash",
    ".search__input": "Например, котики...",
    ".search__input-label" : "Поиск фото",
    ".footer__copyright" : "2022 Коннов Дмитрий",
    ".footer__link" : "Мой github",
    ".buttons__text_en" : "Рус",
    ".buttons__text_ru" : "Англ",
    ".buttons__text_color_light" : "Ночь",
    ".buttons__text_color_dark" : "День",
  };

  const en = {
    ".header__title" : "Gallery with API Unsplash",
    ".search__input": "For example, cats...",
    ".search__input-label" : "Photo search",
    ".footer__copyright" : "2022 Konnov Dmitriy",
    ".footer__link" : "My github",
    ".buttons__text_en" : "En",
    ".buttons__text_ru" : "Rus",
    ".buttons__text_color_light" : "Dark",
    ".buttons__text_color_dark" : "Light",
  };

  const languages = {
    ru: ru,
    en: en,
  };

  

  export {initialCards, languages};