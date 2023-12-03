import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

fetchBreeds();

const select = document.querySelector('.breed-select');
select.addEventListener('change', event => {
  const catId = select.options[select.selectedIndex].value;
  fetchCatByBreed(catId).then(function (response) {
    console.log(response.data[0]);
  });
});
