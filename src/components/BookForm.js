import React, { useState, useContext } from 'react';
import { BookContext } from '../context/BookContext';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import bookImage1 from '../images/book1.jpg';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const BookForm = () => {
  const { addBook } = useContext(BookContext);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addBook({ title, author });
    setTitle('');
    setAuthor('');
  };
  const notify = () => toast.success("New Book Added");

  const defaultTheme = createTheme();

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh', marginTop: '2%' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${bookImage1})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LibraryBooksIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Add New Book
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="title"
                label="Title"
                name="title"
                autoComplete="title"
                autoFocus
                value={title}
                onChange={(e) => setTitle(e.target.value)}

              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="author"
                label="Author"
                type="author"
                id="author"
                autoComplete="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
             
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={notify}
              >
                Submit
              </Button>
              <ToastContainer />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default BookForm;
