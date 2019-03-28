"use strict";

let cardData = {
  URL: []
};
const source = document.querySelector("#new-card").innerHTML.trim();
const template = Handlebars.compile(source);
//====================================================================

const addCardForm = document.querySelector(".card-form");
addCardForm.addEventListener("submit", handleAdd);

const cardList = document.querySelector(".cards");
cardList.addEventListener("submit", handleDel);

function handleAdd(e) {
  e.preventDefault();
  const inputValue = document.querySelector("#url-text").value;
  const validURL = cardData.URL.every(x => inputValue !== x);

  if (inputValue === "") return;
  if (validURL) {
    cardData.URL.unshift(inputValue);
    const markup = template(cardData);
    cardList.innerHTML = markup;

    localStorage.setItem("list", JSON.stringify(cardData));
  } else {
    alert("Такой URL уже есть!");
  }

  addCardForm.reset();
} //=====================================================================

function handleDel(e) {
  e.preventDefault();

  const cardValueUrl = e.target.firstElementChild.firstElementChild.innerHTML;
  e.target.parentNode.remove();
  //  cardData.URL.pop(cardValueUrl);

  // cardData.URL.splice(cardValueUrl,1);

  localStorage.setItem("list", JSON.stringify(cardData));

  console.log(cardValueUrl);
  console.log(cardData.URL);
}

window.addEventListener("DOMContentLoaded", getItemLC);

function getItemLC() {
  cardData = JSON.parse(localStorage.getItem("list"));
  createCardList(cardData);
}

function createCardList(arr) {
  const markup = template(arr);
  cardList.innerHTML = markup;
}
