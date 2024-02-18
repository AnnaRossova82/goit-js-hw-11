import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const apiKey = '42441729-7dc314f47a8382b16bbe5b871';
const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const imageGallery = document.getElementById('imageGallery');

searchForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const searchTerm = searchInput.value.trim();

  if (searchTerm === '') {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search term.',
    });
    return;
  }

  searchImages(searchTerm);
});

function searchImages(searchTerm) {
  const apiUrl = `https://pixabay.com/api/?key=${apiKey}&q=${searchTerm}&image_type=photo&orientation=horizontal&safesearch=true`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      displayImages(data.hits);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}

function displayImages(images) {
  imageGallery.innerHTML = '';

  if (images.length === 0) {
    iziToast.info({
      title: 'Info',
      message: 'Sorry, there are no images matching your search query. Please try again.',
    });
    return;
  }

  images.forEach(image => {
    const imageCard = document.createElement('div');
    imageCard.className = 'imageCard';

    const imageElement = document.createElement('img');
    imageElement.src = image.previewURL;
    imageElement.alt = image.tags;

    imageCard.appendChild(imageElement);
    imageGallery.appendChild(imageCard);
  });
}