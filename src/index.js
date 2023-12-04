import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';

// const select = new SlimSelect({
//   select: '.breed-select',
// });
const select = document.querySelector('.breed-select');
const catInfoDiv = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const loaderAnimation = document.querySelector('span.loader-animation');
const errorParagraph = document.querySelector('.error');

hideError();

fetchBreeds()
  .then(function (response) {
    const cats = response.data; //tablica
    const select = document.querySelector('.breed-select');
    cats.forEach(function (entry) {
      select.options.add(new Option(entry.name, entry.id));
    });
    console.log(cats);
  })
  .catch(function (error) {
    console.log(error);
  })
  .finally(function () {
    hideLoader();
  });

select.addEventListener('change', event => {
  const catId = select.options[select.selectedIndex].value;
  // const catId = select.selected;
  showLoader();

  fetchCatByBreed(catId)
    .then(function (response) {
      const catData = response.data[0];
      displayCatInfo(catData);
    })
    .catch(function (error) {
      console.log(error);
      showError();
    })
    .finally(function () {
      hideLoader();
    });
});

function displayCatInfo(catData) {
  catInfoDiv.innerHTML = `
    <img src="${catData.url}" alt="Cat Image" />
    <p><strong>Breed:</strong> ${catData.breeds[0].name}</p>
    <p><strong>Description:</strong> ${catData.breeds[0].description}</p>
    <p><strong>Temperament:</strong> ${catData.breeds[0].temperament}</p>
  `;
  select.style.display = 'block';
  catInfoDiv.style.display = 'block';
}

function showLoader() {
  select.style.display = 'none';
  catInfoDiv.style.display = 'none';
  loader.style.display = 'block';
  loaderAnimation.style.display = 'block';
  errorParagraph.style.display = 'none';
}

function hideLoader() {
  loader.style.display = 'none';
  loaderAnimation.style.display = 'none';
}

function showError() {
  select.style.display = 'none';
  catInfoDiv.style.display = 'none';
  loader.style.display = 'none';
  // errorParagraph.style.display = 'block';
  Notiflix.Notify.warning(
    'Oops! Something went wrong! Try reloading the page!'
  );
}

function hideError() {
  errorParagraph.style.display = 'none';
}
