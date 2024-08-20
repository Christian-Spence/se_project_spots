const initialCards = [
{
name:"Val Thorens", 
link:"https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg"
},
{
name:"Restaurant terrace", 
link:"https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg"
},
{
name:"An outdoor cafe", 
link:"https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg"
},
{
name:"A very long bridge, over the forest and through the trees", 
link:"https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg"
},
{
name:"Tunnel with morning light", 
link:"https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg"
},
{
name:"Mountain house", 
link:"https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg"
},
];

const editProfileButton = document.querySelector(".profile__edit-button");
const editModal = document.querySelector("#edit-profile-modal");
const cardModalBtn = document.querySelector(".profile__post");
const editModalCloseBtn = editModal.querySelector(".modal__close-btn");
const editModalNameInput = editModal.querySelector("#profile-name");
const editModalDescriptionInput = editModal.querySelector("#profile-description");
const editFormElement = editModal.querySelector(".modal__form");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards");
const cardModal = document.querySelector("#add-card-modal");
const cardForm = cardModal.querySelector(".modal__form");
const cardModalCloseBtn = cardModal.querySelector(".modal__close-btn");
const cardNameInput = cardModal.querySelector("#add-card-name");
const cardLinkInput = cardModal.querySelector("#add-card-link");
const previewModal = document.querySelector("#preview-modal");
const previewModalImageEl = previewModal.querySelector(".modal__image");
const previewModalCaptionEl = previewModal.querySelector(".modal__caption");

function openModal(modal){
    modal.classList.add("modal_opened");
}

function closeModal(modal){
    modal.classList.remove("modal_opened");
}

function editFormSubmit(evt){
    evt.preventDefault();
    profileName.textContent = editModalNameInput.value;
    profileDescription.textContent = editModalDescriptionInput.value;
    closeModal(editModal);
}

function handleAddCardSubmit(evt){
    evt.preventDefault();
    const inputValues = {name: cardNameInput.value, link: cardLinkInput.value};
    const cardElement = getCardElement(inputValues);
    cardsList.prepend(cardElement);
    closeModal(cardModal);
}

function getCardElement(data){
    const cardElement = cardTemplate.content.querySelector(".cards__item").cloneNode(true);
    const cardNameEl = cardElement.querySelector(".cards__text");
    const cardImageEl = cardElement.querySelector(".cards__photo");
    const cardLikeBtn = cardElement.querySelector(".cards__like-button");
    const cardDeleteBtn = cardElement.querySelector(".cards__delete-icon");
    cardNameEl.textContent = data.name;
    cardImageEl.src = data.link;
    cardImageEl.alt = data.name;

cardLikeBtn.addEventListener("click",() => {
    cardLikeBtn.classList.toggle("cards__like-button_liked");
});

cardDeleteBtn.addEventListener("click", () => { 
    cardElement.remove(); 
});

// cardImageEl.addEventListener("click", () =>{
//     openModal(previewModal);
//     previewModalImageEl.src = data.link;
//     previewModalCaptionEl.src = data.name;
// })

return cardElement;
}

editProfileButton.addEventListener("click",() => {
    editModalNameInput.value = profileName.textContent;
    editModalDescriptionInput.value = profileDescription.textContent;
    openModal(editModal);
});

editModalCloseBtn.addEventListener("click", () => {
    closeModal(editModal);
});

cardModalBtn.addEventListener("click",() => {
    openModal(cardModal);
});

cardModalCloseBtn.addEventListener("click", () => {
    closeModal(cardModal);
});

editFormElement.addEventListener("submit", editFormSubmit);
cardForm.addEventListener("submit", handleAddCardSubmit);

for(let i = 0; i < initialCards.length; i++){
    const cardElement = getCardElement(initialCards[i]);
    cardsList.prepend(cardElement);
}