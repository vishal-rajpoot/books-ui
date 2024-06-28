import axios from 'axios';

export const API_URL = 'http://localhost:8080/api/';

export const fetchBooks = () => {
  return axios.get(API_URL);
};

export const createBook = (book) => {
  return axios.post(API_URL, book);
};
