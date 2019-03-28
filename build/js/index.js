"use strict";

var cardData = {
  URL: []
};
var source = document.querySelector("#new-card").innerHTML.trim();
var template = Handlebars.compile(source); //====================================================================

var addCardForm = document.querySelector(".card-form");
addCardForm.addEventListener("submit", handleAdd);
var cardList = document.querySelector(".cards");
cardList.addEventListener("submit", handleDel);

function handleAdd(e) {
  e.preventDefault();
  var inputValue = document.querySelector("#url-text").value;
  var validURL = cardData.URL.every(function (x) {
    return inputValue !== x;
  });
  if (inputValue === "") return;

  if (validURL) {
    cardData.URL.unshift(inputValue);
    var markup = template(cardData);
    cardList.innerHTML = markup;
    localStorage.setItem("list", JSON.stringify(cardData));
  } else {
    alert("Такой URL уже есть!");
  }

  addCardForm.reset();
} //=====================================================================


function handleDel(e) {
  e.preventDefault();
  var cardValueUrl = e.target.firstElementChild.firstElementChild.innerHTML;
  e.target.parentNode.remove(); //  cardData.URL.pop(cardValueUrl);
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
  var markup = template(arr);
  cardList.innerHTML = markup;
}