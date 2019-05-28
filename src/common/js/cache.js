import storage from 'good-storage'
import { insertSong } from '../../store/actions';

const SEARCH_KEY = '__search__';  //搜索数据的key
const SEARCH_MAX_LENGTH = 15; //搜索记录最大存储条数

const PLAY_KEY = '__play__';
const PLAY_MAX_LENGTH = 200;

const FAVORITE_KEY = '__favorite__';
const FAVORITE_MAX_LENGTH = 200

//搜索记录去重，并排序
function insertArray(arr, val, compare, maxLen) {
  const index = arr.findIndex(compare)
  if(index === 0) {
    return
  }

  if(index > 0) {
    arr.splice(index, 1)
  }
  arr.unshift(val)
  if(maxLen && arr.length > maxLen) {
    arr.pop()
  }
}
//删除搜索记录
function deleteArray(arr, compare) {
  const index = arr.findIndex(compare)
  if (index > -1) {
    arr.splice(index, 1);
  }
}

export function saveSearch(query) {
  let searchs = storage.get(SEARCH_KEY, []);
  insertArray(searchs, query, (item) => {
    return item === query
  }, SEARCH_MAX_LENGTH)
  storage.set(SEARCH_KEY, searchs);
  return searchs
}

export function deleteSearch(query) {
  let searchs = storage.get(SEARCH_KEY, []);
  deleteArray(searchs, item => {
    return item === query
  })
  storage.set(SEARCH_KEY, searchs)
  return searchs
}

export function clearSearch () {
  storage.remove(SEARCH_KEY);
  return []
}

export function loadSearch() {
  return storage.get(SEARCH_KEY, [])
}

export function savePlay(song) {
  let songs = storage.get(PLAY_KEY, [])
  insertArray(songs, song, (item) => {
    return item.id === song.id
  }, PLAY_MAX_LENGTH)
  storage.set(PLAY_KEY, songs)
  return songs;
}

export function loadPlay() {
  return storage.get(PLAY_KEY, [])
}

export function saveFavorite(song) {
  let songs = storage.get(FAVORITE_KEY, [])
  insertArray(songs, song, (item) => {
    return song.id === item.id
  }, FAVORITE_MAX_LENGTH)
  storage.set(FAVORITE_KEY, songs)
  return songs;
}

export function deleteFavorite(song) {
  let songs = storage.get(FAVORITE_KEY, [])
  deleteArray(songs, (item) => {
    return song.id === item.id
  })
  storage.set(FAVORITE_KEY, songs)
  return songs; 
}

export function loadFavorite() {
  return storage.get(FAVORITE_KEY, [])
}




