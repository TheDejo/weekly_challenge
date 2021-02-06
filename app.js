const form = document.querySelector('#form');
const search = document.querySelector('.input');
const container = document.querySelector('.grid-container');
const modalContainer = document.querySelector('.modal-container');
const cancel = document.querySelector('.cancel');
const lazyGrid = document.querySelectorAll('.grid-lazy');

//Photo data from api
let photoData = [];

// Get photos
async function getPhotos(query) {
  const apiKey = 'KkacLQDwrXPlDzOTphNUN19UObe08pqVR35mz-vy01M';
  const apiUrl = `https://api.unsplash.com/search/photos/?client_id=${apiKey}&query=${query}&per_page=12`;

  const response = await axios.get(apiUrl);
  const data = response.data.results;

  // Lazy loading
  lazyGrid.forEach(cur => {
    cur.style.display = 'none';
  });

  //Populate photo data
  photoData = [...data];

  //Render UI
  data.forEach(photo => {
    showImages(photo);
  });
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

//Submit EventListener
form.addEventListener('submit', e => {
  e.preventDefault();
  container.innerHTML = '';
  getPhotos(search.value);
});

//Load African Images by default
window.addEventListener('load', getPhotos('african'));


//  Modal
container.addEventListener('click', async e => {
  console.log(e.target.id);

  let photo = photoData.find(photo => {
    return e.target.id == photo.id;
  });

  let template = `
      <div class="modal">
        <div class="modal-img">
          <img src=${photo.urls.regular} alt="">
        </div>
        <div class="modal-text">
          <h3>${photo.user.first_name} ${photo.user.last_name}</h3>
          <span>${
            photo.user.location ? photo.user.location : 'Somewhere on earth'
          }</span>
        </div>
      </div>
`;

  modalContainer.style.display = 'flex';

  cancel.style.display = 'block';
  modalContainer.insertAdjacentHTML('beforeend', template);
});

cancel.addEventListener('click', () => {
  cancel.style.display = 'none';
  modalContainer.style.display = 'none';
  modalContainer.innerHTML = '';
});
