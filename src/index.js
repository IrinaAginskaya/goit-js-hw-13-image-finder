import './sass/main.scss';
import ImagesApiService from './js/apiService';
import LoadMoreBtn from './js/btn-loadMore';
import imagesListTpl from './templates/card.hbs';
import { errorNotification } from './js/pnotify';

const refs = {
  galleryContainer: document.querySelector('.gallery'),
  formRef: document.querySelector('#search-form'),
  inputRef: document.querySelector('input'),
  btnRef: document.querySelector('[data-action="load-more"]'),
};

const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

refs.formRef.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchImages);


const imagesApiService = new ImagesApiService();

async function onSearch(e) {
  e.preventDefault();

  imagesApiService.query = e.currentTarget.elements.query.value.trim();

  if (imagesApiService.query) {
    try {
      clearContainer();
      loadMoreBtn.show();
      imagesApiService.resetPage();
      await fetchImages();
    } catch {
      errorNotification();
      loadMoreBtn.hide();
    }
  }
}
function renderImages(images) {
  refs.galleryContainer.insertAdjacentHTML('beforeend', imagesListTpl(images));
};
// const renderImages = images => {
//   refs.galleryContainer.insertAdjacentHTML('beforeend', imagesListTpl(images));
// };
// const clearContainer = () => {
//   refs.galleryContainer.innerHTML = '';
// };
function clearContainer() {
  refs.galleryContainer.innerHTML = '';
};

async function fetchImages() {
  loadMoreBtn.disable();
  const images = await imagesApiService.fetchImages();
  renderImages(images);

  if (images.length < 12) {
    loadMoreBtn.hide();
  } else {
    loadMoreBtn.enable();
  }

  setTimeout(() => {
    refs.galleryContainer.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  }, 500);
}