import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_6iBgCXZRlrmB01CH5KRgYAQ7uz4Rs6J14X5chxd4DcenYSIATPoSJzkRfPujPiVS';

export function fetchBreeds() {
  axios
    .get('https://api.thecatapi.com/v1/breeds')
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
    .finally(function () {});
}

export function fetchCatByBreed(breedId) {
  const promise = axios.get(
    `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`
  );
  return promise;
}
