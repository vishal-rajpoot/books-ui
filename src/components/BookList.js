import React, { useContext } from 'react';
import { BookContext } from '../context/BookContext';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import book3 from '../images/book3.jpg';
import { Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const BookList = () => {
  // const navigate  = useNavigate();

  const { books } = useContext(BookContext);
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    // navigate('/login');
  };

  return (
    <Grid container spacing={4}>
    <Grid item xs={12}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Button component={Link} to="/add-book" variant="contained" color="primary">
              Add new Book
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="secondary" onClick={handleLogout}>
              Logout
            </Button>
          </Grid>
        </Grid>
      </Grid>
    {books?.map((book, index) => (
      <Grid item key={index} xs={12} md={6}>
        <CardActionArea component="a" href="#">
          <Card sx={{ display: 'flex' }}>
            <CardContent sx={{ flex: 1 }}>
              <Typography component="h2" variant="h5">
                Title - {book.title}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                Author - {book.author}
              </Typography>
              <Typography variant="subtitle1" paragraph>
                Added by - {book.created_by}
              </Typography>
            </CardContent>
            <CardMedia
              component="img"
              sx={{ width: 160, display: { xs: 'block', sm: 'block' } }}
              image={book3 || 'https://picsum.photos/160'}
              alt={book.title}
            />
          </Card>
        </CardActionArea>
      </Grid>
    ))}
  </Grid>
  );
}

export default BookList;

