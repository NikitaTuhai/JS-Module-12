
'use strict'

let urlList = getUrlFromLocalStorage();

let form = document.querySelector('.card-form');
let input = document.querySelector('#url-text');
let cardSection = document.querySelector('.cards');
drawFavorites()

function drawFavorites() {
  let template = document.querySelector('#new-card').innerHTML.trim();
  let compileTemplate = Handlebars.compile(template);
  let cardMarkup = urlList.reduce((acc, elem) => acc + compileTemplate(elem), '');
  cardSection.insertAdjacentHTML('afterbegin', cardMarkup);
}



form.addEventListener('submit', onUrlAdding);
cardSection.addEventListener('click', onDeleteClick);

function onUrlAdding(event) {
  event.preventDefault();
  let urlValidation = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
  if (urlValidation.test(input.value) && !urlList.find(elem => elem.url === input.value)) {
    cardSection.innerHTML = '';
    urlList.unshift({url: input.value});
    setUrlToLocalStorage(urlList);
    drawFavorites();
  } else if (urlList.find(elem => elem.url === input.value)) {
    alert("Такая закладка уже существует!");
  } else if (!urlValidation.test(input.value)) {
    alert("Не прошло валидацию!")
  }
  form.reset();
};

function onDeleteClick(event) {
  if (event.target.nodeName === "BUTTON") {
    let cardForDelete = event.target.parentNode;
    let cardForDeleteUrl = cardForDelete.querySelector('.card-url').textContent;
    let indexOfDeletedUrl = urlList.indexOf(urlList.find(el => el.url === cardForDeleteUrl));
    cardForDelete.remove();
    urlList.splice([indexOfDeletedUrl], 1);
    setUrlToLocalStorage(urlList);
  }
}

function setUrlToLocalStorage(array) {
  localStorage.setItem('cards', JSON.stringify(array));
}
function getUrlFromLocalStorage() {
  let data = localStorage.getItem('cards');
  return data ? JSON.parse(data) : [];
}
