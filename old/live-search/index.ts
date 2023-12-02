import { fromEvent } from 'rxjs';
import { ajax } from 'rxjs/ajax'
import './live-search'
import { liveSearch, request } from './live-search';

const inputEl = document.querySelector('input') as HTMLInputElement;
const container = document.querySelector('.container') as HTMLDivElement;

liveSearch(
  fromEvent<InputEvent>(inputEl, 'input'),
  (text) => request(ajax(`https:/api.github.com/search/repositories?q=${text}`))
)
  .subscribe((htmlStr) => {
    container.innerHTML = htmlStr;
  })
