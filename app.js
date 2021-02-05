const form = document.querySelector('#form');
const search = document.querySelector('.input');
const container = document.querySelector('.grid-container');

// Get photos
async function getPhotos(query) {
  const apiKey = 'KkacLQDwrXPlDzOTphNUN19UObe08pqVR35mz-vy01M';
  const apiUrl = `https://api.unsplash.com/search/photos/?client_id=${apiKey}&query=${query}&per_page=12`;

  const response = await axios.get(apiUrl);
  const data = response.data.results;

  data.forEach(photo => {
    showImages(photo);
  });

  console.log(data);
}

// Build UI
function showImages(photo) {
  const template = `<div id=${photo.id} class="img img--1 ">
        <img
          class="image"
          src=${photo.urls.regular}
          alt=${photo.alt_description}
        />
        <div class="text">
          <h2>${photo.user.first_name} ${photo.user.last_name}</h2>
          <p>${
            photo.user.location ? photo.user.location : 'Somewhere on earth'
          }</p>
        </div>
      </div>`;

  container.insertAdjacentHTML('beforeend', template);
}

form.addEventListener('submit', e => {
  e.preventDefault();
  container.innerHTML = '';
  getPhotos(search.value);
});

window.addEventListener('load', getPhotos('african'));
