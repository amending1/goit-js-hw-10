import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_6iBgCXZRlrmB01CH5KRgYAQ7uz4Rs6J14X5chxd4DcenYSIATPoSJzkRfPujPiVS';

export function fetchBreeds() {
  const promise = axios.get('https://api.thecatapi.com/v1/breeds');
  return promise;
}

export function fetchCatByBreed(breedId) {
  const promiseBreedId = axios.get(
    `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`
  );
  return promiseBreedId;
}
