import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { fetchFromAPI, BASE_URL,TMDB_API_KEY,IMG_BASE_URL } from '../utilities/fetchFromAPI';



const MediaCard = ( {movie} ) => (
    <Card sx={{height: '100%'}}>
      <CardMedia
        sx={{ paddingTop: '56.25%' }}
        image={`${IMG_BASE_URL}${movie.poster_path}`}
        title={movie.original_title}
      />
      <CardContent sx={{height: '106px'}}>
        <Typography gutterBottom variant="h6" component="div">
        {movie.original_title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        Episode Number: {}
        Sub / Dub: {}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Watch</Button>
        <Button size="small">Download</Button>
      </CardActions>
    </Card>
);

export default MediaCard;