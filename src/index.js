

import ImgApi from "./imgApi";

import Notiflix from 'notiflix';
const imgApi = new ImgApi()

// function onFetch(name){
//     return fetch(`https://pixabay.com/api/?key=${KEY}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true`).then(res =>{
//         if(!res.ok){
//             throw new Error(res.status)
//          }      
//     return res.json()}).then(res => {console.log(res); return res}).catch(err => console.log(err));
// }

function forEachCard({webformatURL, largeImageURL,tags,likes,views,comments,downloads}){
    
return `<div class="photo-card"><img class="card-img" src="${webformatURL}" alt="${tags}" loading="lazy" /><div class="info"><p class="info-item"><b>Likes: ${likes}</b></p><p class="info-item"><b>Views: ${views}</b></p><p class="info-item"><b>Comments: ${comments}</b></p><p class="info-item"><b>Downloads: ${downloads}</b></p></div></div>`

}

const refs = {
    formEl: document.querySelector('.search-form'),
    cardListEl: document.querySelector('.gallery'),
    loadMoreEl: document.querySelector('.load-more'),
    
}

refs.formEl.addEventListener('submit', onSubmit);
refs.loadMoreEl.addEventListener('click', onLoadMore);

function onSubmit(evt){
    evt.preventDefault()
    refs.loadMoreEl.classList.add('is-hidden')
    clearHtml();
    imgApi.query = refs.formEl.searchQuery.value;
    if(imgApi.query===""){
        refs.loadMoreEl.classList.add('is-hidden')
        return
    }
    
console.log(refs.formEl.searchQuery.value)
imgApi.resetPage();



let onFetchCardList = imgApi.onFetch(name).then(r => { if(r.hits.length === 0){
    Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
    throw new Error();
}
Notiflix.Notify.success(`Hooray! We found ${r.totalHits} images.`);
return r.hits.map( r => forEachCard(r))}
    
     ).then(r => {return r.join('')}).then(res => {addHtml(res); refs.loadMoreEl.classList.remove('is-hidden')} ).catch(err => console.log(err))

console.log(onFetchCardList)
}

function onLoadMore(){
   console.log(imgApi.onFetch().then(r => { if(r.hits.length === 0){
    Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
    refs.loadMoreEl.classList.add('is-hidden')}; return r.hits.map( r => forEachCard(r))}
    
     ).then(r => {return r.join('')}).then(addHtml)) 
}

function addHtml (html){
refs.cardListEl.insertAdjacentHTML('beforeend', html)
}

function clearHtml (){
    refs.cardListEl.innerHTML = '';
}

