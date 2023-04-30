import React from 'react'
import { Stack, Box, Grid, Container, Typography } from '@mui/material'
/* import { fetchFromAPI, BASE_URL, TMDB_API_KEY, IMG_BASE_URL } from '../utilities/fetchFromAPI'; */
import { useState, useEffect } from 'react';
import MediaCard from './MediaCard';
import { Paper, Button } from '@mui/material';
import Carousel from 'nuka-carousel';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Rating from '@mui/material/Rating';
import axios from 'axios';

export const BASE_URL = 'https://api.themoviedb.org/3';

export const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const MainFeed = () => {
    const [videos, setVideos] = useState({});

    const { results } = videos;

    useEffect(() => {
        const fetchFromAPI = async (url) => {
            const { data } = await axios.get(`${BASE_URL}/${url}?api_key=13e72ef8b4ac129f160e87c49e8a2b1e`);

            return data;
        }
        fetchFromAPI(`trending/all/day`).then((data) => setVideos(data));
    }, []);

    console.log(results);

    const [hovered, setHovered] = React.useState(false);

    const handleMouseEnter = () => {
        setHovered(true);
    };

    const handleMouseLeave = () => {
        setHovered(false);
    };


    return (
        <Stack sx={{ overflowY: 'none', height: '90vh', flexDirection: { sx: 'column', sm: 'column', md: 'row' } }} direction='row' justifyContent='start' alignItems='start' gap={2} flexWrap='wrap'>
            <Container height="100vh">
                <Carousel wrapAround={true} slidesToShow={3} autoplay={true} height="100%" >
                    {results.map((movie, idx) => (
                        <img key={idx} src={movie.media_type === "movie"? `${IMG_BASE_URL}${movie.media_type}`: `${IMG_BASE_URL}${movie.media_type}`} height="100%" alt="no_image" object-fit="cover" />
                        
                    ))}
                </Carousel>
            </Container>
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    {results.map((movie, idx) => (
                        <Grid item key={idx} xs={6} sm={6} md={4}>
                            <Card sx={{ maxWidth: 345 }} onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}>
                                <CardMedia
                                    sx={{ paddingTop: '56.25%' }}
                                    image={`${IMG_BASE_URL}${movie.poster_path}`}
                                    title={movie.original_title}
                                    style={{ transform: hovered ? 'scale(1.1)' : 'scale(1)' }}
                                />
                                <CardContent sx={hovered ? {
                                    height: '106px', transform: 'translateY(100%)',
                                    transition: 'transform 0.2s',
                                } : {
                                    height: '106px', transition: 'transform 0.2s',
                                }}>
                                    <Typography gutterBottom variant="h6" component="div">
                                        {movie.original_title ? movie.original_title : movie.original_name}
                                    </Typography>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        <Rating name="movie-rating" value={(movie.vote_average) / 10 * 5} max={5} precision={0.5} readOnly />
                                        {' '} {movie.vote_average}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>


        </Stack >
    )
}

export default MainFeed;

                           {/*  <div class="row hero-area-slide">
                                <div class="col-lg-6 col-md-5">
                                    <div class="hero-area-content">
                                        <img src="/assets/img/slide1.png" alt="about" />
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-7">
                                    <div class="hero-area-content pr-50">
                                        <h2>Last Avatar</h2>
                                        <div class="review">
                                            <div class="author-review">
                                                <i class="icofont icofont-star"></i>
                                                <i class="icofont icofont-star"></i>
                                                <i class="icofont icofont-star"></i>
                                                <i class="icofont icofont-star"></i>
                                                <i class="icofont icofont-star"></i>
                                            </div>
                                            <h4>180k voters</h4>
                                        </div>
                                        <p>She is a devil princess from the demon world. She grew up sheltered by her parents and doesn't really know how to be evil or any of the common actions,   She is unable to cry due to Keita's accidental first wish, despite needed for him to wish...</p>
                                        <h3>Cast:</h3>
                                        <div class="slide-cast">
                                            <div class="single-slide-cast">
                                                <img src="/assets/img/cast/cast1.png" alt="about" />
                                            </div>
                                            <div class="single-slide-cast">
                                                <img src="/assets/img/cast/cast2.html" alt="about" />
                                            </div>
                                            <div class="single-slide-cast">
                                                <img src="/assets/img/cast/cast3.png" alt="about" />
                                            </div>
                                            <div class="single-slide-cast">
                                                <img src="/assets/img/cast/cast4.png" alt="about" />
                                            </div>
                                            <div class="single-slide-cast">
                                                <img src="/assets/img/cast/cast5.png" alt="about" />
                                            </div>
                                            <div class="single-slide-cast">
                                                <img src="/assets/img/cast/cast6.png" alt="about" />
                                            </div>
                                            <div class="single-slide-cast">
                                                <img src="/assets/img/cast/cast7.png" alt="about" />
                                            </div>
                                            <div class="single-slide-cast text-center">
                                                5+
                                            </div>
                                        </div>
                                        <div class="slide-trailor">
                                            <h3>Watch Trailer</h3>
                                            <a class="theme-btn theme-btn2" href="#"><i class="icofont icofont-play"></i> Tickets</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row hero-area-slide">
                                <div class="col-lg-6 col-md-5">
                                    <div class="hero-area-content">
                                        <img src="/assets/img/slide3.png" alt="about" />
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-7">
                                    <div class="hero-area-content pr-50">
                                        <h2>The Deer God</h2>
                                        <div class="review">
                                            <div class="author-review">
                                                <i class="icofont icofont-star"></i>
                                                <i class="icofont icofont-star"></i>
                                                <i class="icofont icofont-star"></i>
                                                <i class="icofont icofont-star"></i>
                                                <i class="icofont icofont-star"></i>
                                            </div>
                                            <h4>180k voters</h4>
                                        </div>
                                        <p>She is a devil princess from the demon world. She grew up sheltered by her parents and doesn't really know how to be evil or any of the common actions,   She is unable to cry due to Keita's accidental first wish, despite needed for him to wish...</p>
                                        <h3>Cast:</h3>
                                        <div class="slide-cast">
                                            <div class="single-slide-cast">
                                                <img src="/assets/img/cast/cast1.png" alt="about" />
                                            </div>
                                            <div class="single-slide-cast">
                                                <img src="/assets/img/cast/cast2.html" alt="about" />
                                            </div>
                                            <div class="single-slide-cast">
                                                <img src="/assets/img/cast/cast3.png" alt="about" />
                                            </div>
                                            <div class="single-slide-cast">
                                                <img src="/assets/img/cast/cast4.png" alt="about" />
                                            </div>
                                            <div class="single-slide-cast">
                                                <img src="/assets/img/cast/cast5.png" alt="about" />
                                            </div>
                                            <div class="single-slide-cast">
                                                <img src="/assets/img/cast/cast6.png" alt="about" />
                                            </div>
                                            <div class="single-slide-cast">
                                                <img src="/assets/img/cast/cast7.png" alt="about" />
                                            </div>
                                            <div class="single-slide-cast text-center">
                                                5+
                                            </div>
                                        </div>
                                        <div class="slide-trailor">
                                            <h3>Watch Trailer</h3>
                                            <a class="theme-btn theme-btn2" href="#"><i class="icofont icofont-play"></i> Tickets</a>
                                        </div>
                                    </div>
                                </div>
                            </div> */}