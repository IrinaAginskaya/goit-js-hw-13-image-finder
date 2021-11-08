const API_KEY = '24233847-0df8e18c0b7a82668deba14ff';
const BASE_URL = 'https://pixabay.com/api/';

export default class ImagesApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }
    fetchImages() {
        const response = `${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`;
        return fetch(response)
            .then(response => response.json())
            .then(({ hits }) => {
                this.incrementPage();
                return hits;
            });
    }

  incrementPage() {
      this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
