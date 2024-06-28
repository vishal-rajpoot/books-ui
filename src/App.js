import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import BookList from './components/BookList';
import BookForm from './components/BookForm';
import Login from './components/Login';
import Register from './components/Register';
import { Box, Container } from '@mui/material';
import { BookProvider } from './context/BookContext';

const App = () => {
  // const { isAuthenticated } = useContext(AuthContext);
  const token = localStorage.getItem('token');

  return (
    <Box
    sx={{
      backgroundImage: 'linear-gradient(45deg, #e2dac7 30%, #f0deb3 90%)',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '15px 0',
    }}
  >
    <BookProvider>
    <Router>
      <Container>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<PrivateRoute component={BookList} isAuthenticated={token} />} />
          <Route path="/add-book" element={<PrivateRoute component={BookForm} isAuthenticated={token} />} />
        </Routes>
      </Container>
    </Router>
    </BookProvider>
    </Box>

  );
};

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => {
  return isAuthenticated ? <Component {...rest} /> : <Navigate to="/login" replace />;
};

export default App;
