import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../services/BookService'

const BookContext = createContext();

const BookProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`${API_URL}/books/`, {
          headers: {
            Authorization: `${token}`,
          },
        });
        const data = response.data.data;
        setBooks(data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    if (token) {
      fetchBooks();
    }
  }, [token]);

  const addBook = async (book) => {
    try {
      const response = await axios.post(`${API_URL}/books/`, book, {
        headers: {
          Authorization: `${token}`,
        },
      });
      setBooks((prevBooks) => [...prevBooks, response.data.data]);
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  return (
    <BookContext.Provider value={{ books, addBook }}>
      {children}
    </BookContext.Provider>
  );
};

export { BookContext, BookProvider };
