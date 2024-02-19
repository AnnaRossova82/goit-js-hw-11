import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


document.addEventListener('DOMContentLoaded', function () {
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');
    const galleryContainer = document.getElementById('gallery');
   

    const lightbox = new SimpleLightbox('.gallery-container a');

      
    searchForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const searchTerm = searchInput.value.trim();
  
      if (searchTerm === '') {
        iziToast.warning({
          title: 'Warning',
          message: 'Please enter a search term.',
          position: 'topCenter',
        });
        return;
      }
  

      galleryContainer.innerHTML = '';
      loader.style.display = 'block'; 
 

      fetchImages(searchTerm);
    });
  
    function fetchImages(searchTerm) {
      const spinner = new Spinner().spin(loader);
 
        const apiKey = '42441729-7dc314f47a8382b16bbe5b871';
      const apiUrl = `https://pixabay.com/api/?key=${apiKey}&q=${searchTerm}&image_type=photo&orientation=horizontal&safesearch=true`;
  
      fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        loader.style.display = 'none';
     
          if (data.hits.length > 0) {
            displayImages(data.hits);
          } else {

            iziToast.info({
              title: 'Info',
              message: 'Sorry, there are no images matching your search query. Please try again!',
              position: 'topCenter',
            });
          }
        })
        .catch(error => {
           loader.style.display = 'none';
          console.error('Error fetching images:', error);
      
          iziToast.error({
            title: 'Error',
            message: 'An error occurred while fetching images. Please try again later.',
            position: 'topCenter',
          });
        });
    }
  
    function displayImages(images) {
      images.forEach(image => {
        const card = document.createElement('div');
        card.classList.add('card');

      const a = document.createElement('a');
      a.href = image.largeImageURL;
      a.setAttribute('data-lightbox', 'gallery');
  
        const img = document.createElement('img');
        img.src = image.webformatURL;
        img.alt = image.tags;

        a.appendChild(img);
  
        const cardInfo = document.createElement('div');
        cardInfo.classList.add('card-info');
  
        const title = document.createElement('h3');
        title.textContent = image.tags;
  
        const details = document.createElement('p');
        details.textContent = `Likes: ${image.likes} | Views: ${image.views} | Comments: ${image.comments} | Downloads: ${image.downloads}`;
  
        cardInfo.appendChild(title);
        cardInfo.appendChild(details);
  
        card.appendChild(a);
        card.appendChild(cardInfo);
  
        galleryContainer.appendChild(card);
        lightbox.refresh();
      });
    }
  });

