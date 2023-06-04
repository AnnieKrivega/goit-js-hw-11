import axios from 'axios';

export default class ImageApi {
constructor() {
    this.searchQuery = '';
    this.page = 1;
}

async onFetch() {
    try {
    const KEY = '37016253-52bbdbb3a453e4173ac0bf432';
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
