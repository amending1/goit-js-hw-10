import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import SlimSelect from 'slim-select';

fetchBreeds();
// const select = new SlimSelect({
//   select: '.breed-select',
// });
const select = document.querySelector('.breed-select');
const catInfoDiv = document.querySelector('.cat-info');

select.addEventListener('change', event => {
  const catId = select.options[select.selectedIndex].value;
  // const catId = select.selected;

  fetchCatByBreed(catId)
    .then(function (response) {
      const catData = response.data[0];
      displayCatInfo(catData);
    })
    .catch(function (error) {
      console.log(error);
      // showError(errorElement);
    });
});

// function showError(errorElement) {
//   errorElement.style.display = 'block';
// }

function displayCatInfo(catData) {
  catInfoDiv.innerHTML = `
    <img src="${catData.url}" alt="Cat Image" />
    <p><strong>Breed:</strong> ${catData.breeds[0].name}</p>
    <p><strong>Description:</strong> ${catData.breeds[0].description}</p>
    <p><strong>Temperament:</strong> ${catData.breeds[0].temperament}</p>
  `;
}
