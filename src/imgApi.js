

import axios from 'axios';

export default class GalleryService {
  constructor() {
    this.name = '';
    this.page = 1;
    this.hits = 0;
    this.totalHits = 0;
    this.perPage = 40;
  }

  async onFetch() {
    try {
      const KEY = '36726851-d95c66efa8eaebbb271de5c8c';
      const response = await axios.get(
        `https://pixabay.com/api/?key=${KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`
      );

      if (response.status !== 200) {
        throw new Error(response.status);
      }

      const data = response.data;
      console.log(data);
      this.page += 1;
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(name) {
    this.searchQuery = name;
  }
}