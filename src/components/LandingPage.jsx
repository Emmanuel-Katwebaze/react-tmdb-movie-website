import React, { useRef } from 'react'
import Carousel from 'nuka-carousel';
import { useState, useEffect } from 'react';
import axios from 'axios';
import YouTube from 'react-youtube';
import { Link, useLocation, useNavigate } from 'react-router-dom';
/* import { fetchFromAPI, IMG_BASE_URL} from '../utilities/fetchFromAPI'; */

{/* <img key={idx} src={`${IMG_BASE_URL}${movie.backdrop_path}`} height="100%" alt="no_image" object-fit="cover" /> */ }
function LandingPage() {
    const [videos, setVideos] = useState({});
    const [movies, setMovies] = useState({});
    const [movie, setMovie] = useState({});
    const [trailer, setTrailer] = useState(null)
    const [pageLoading, setPageLoading] = useState(true);
    const [playing, setPlaying] = useState(false)
    const [toggleState, setToggleState] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const [currentImageUrl, setCurrentImageUrl] = useState(null);
    const imageRef = useRef(null);


    const { results } = videos;
    const { results: movieResults } = movies;

    const BASE_URL = 'https://api.themoviedb.org/3';

    const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500';

    const ORIGINAL_IMG_URL = 'https://image.tmdb.org/t/p/original';

    const fetchFromAPI = async (url, append) => {
        const { data } = await axios.get(`${BASE_URL}/${url}`, {
            params: {
                api_key: '13e72ef8b4ac129f160e87c49e8a2b1e'
            }
        });

        return data;
    }

    const fetchMovie = async (id) => {
        const { data } = await axios.get(`${BASE_URL}/movie/${id}`, {
            params: {
                api_key: '13e72ef8b4ac129f160e87c49e8a2b1e',
                append_to_response: "videos"
            }
        })

        if (data.videos && data.videos.results) {
            const trailer = data.videos.results.find(vid => vid.name === "Official Trailer")
            setTrailer(trailer ? trailer : data.videos.results[0])
        }
        console.log(data);
        setMovies(data)
    }

    const selectMovie = (movie) => {
        /* e.preventDefault(); */
        fetchMovie(movie.id)
        setMovie(movie)
        setPlaying(true)
    }

    const closeMovieSection = () => {
        setPlaying(false)
    }

/*     const setBackgroundImage = () => {
        const currentSrc = imageRef.current.currentSrc;
        setCurrentImageUrl(currentSrc);
    } */


    useEffect(() => {

        fetchFromAPI(`trending/all/day`).then((data) => {
            if (data.status === 404) {
                setVideos([]);
            } else {
                setVideos(data);
            }
        })
            .catch(error => {
                console.log(error);
            });


        fetchFromAPI(`discover/movie`).then((data) => {
            if (data.status === 404) {
                setMovies([]);
            } else {
                /* console.log(data); */
                setMovies(data);
                setPageLoading(false);
            }
        })
            .catch(error => {
                console.log(error);
            })
    }, []);

    const handleToggle = () => {
        setToggleState(!toggleState);
    };


    console.log(movieResults);
    console.log(results);
    console.log(trailer);
    console.log(currentImageUrl)


    return (
        <div>
            {/* Page loader  */}
            {/* pageLoading <div id="preloader></div>" */}
            {pageLoading ? <div id="preloader"></div> : ""}
            {playing ? <div>
                <div className='overlay' onClick={closeMovieSection}></div>
                <YouTube
                    /* ref={containerRef} */
                    videoId={trailer && trailer.key}
                    className={"youtube-player"}
                    containerClassName={"youtube-player-container"}
                    opts={
                        {
                            width: '100%',
                            height: '100%',
                            playerVars: {
                                autoplay: 1,
                                controls: 1,
                                cc_load_policy: 0,
                                fs: 1,
                                iv_load_policy: 0,
                                modestbranding: 0,
                                rel: 0,
                                showinfo: 0,
                            },
                        }
                    }
                /></div> : ""}
            {/* header section start  */}
            <header className="header">
                <div className="container">
                    <div className="header-area">
                        <div className="logo">
                            <Link to={`/`}><img src="/assets/img/logo.png" alt="logo" /></Link>
                            {/* <img src='as' alt='porfolio' /> */}
                        </div>
                        <div className="header-right">
                            <form action="#">
                                <select>
                                    <option value="Movies">Movies</option>
                                    <option value="Movies">Movies</option>
                                    <option value="Movies">Movies</option>
                                </select>
                                <input type="text" />
                                <button><i className="icofont icofont-search"></i></button>
                            </form>
                            <ul>
                                <li><Link to="#">Welcome Guest!</Link></li>
                                <li><Link className="login-popup" to="#">Login</Link></li>
                            </ul>
                        </div>
                        <div className="menu-area">
                            <div className="responsive-menu"></div>
                            <div className="mainmenu">
                                <ul id="primary-menu">
                                    <li><Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link></li>
                                    <li><Link to="/tvshows" className={location.pathname === '/tvshows' ? 'active' : ''}>Tv Shows</Link></li>
                                    <li><Link to="celebrities.html">CelebritiesList</Link></li>
                                    <li><Link to="top-movies.html">Top Movies</Link></li>
                                    <li><Link to="blog.html">News</Link></li>
                                    <li><Link to="#">Pages <i className="icofont icofont-simple-down"></i></Link>
                                        <ul>
                                            <li><Link to="blog-details.html">Blog Details</Link></li>
                                            <li><Link to="movie-details.html">Movie Details</Link></li>
                                        </ul>
                                    </li>
                                    <li><Link className="theme-btn" to="#"><i className="icofont icofont-ticket"></i> Tickets</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <div className="login-area">
                <div className="login-box">
                    <Link to="#"><i className="icofont icofont-close"></i></Link>
                    <h2>LOGIN</h2>
                    <form action="#">
                        <h6>USERNAME OR EMAIL ADDRESS</h6>
                        <input type="text" />
                        <h6>PASSWORD</h6>
                        <input type="text" />
                        <div className="login-remember">
                            <input type="checkbox" />
                            <span>Remember Me</span>
                        </div>
                        <div className="login-signup">
                            <span>SIGNUP</span>
                        </div>
                        <Link to="#" className="theme-btn">LOG IN</Link>
                        <span>Or Via Social</span>
                        <div className="login-social">
                            <Link to="#"><i className="icofont icofont-social-facebook"></i></Link>
                            <Link to="#"><i className="icofont icofont-social-twitter"></i></Link>
                            <Link to="#"><i className="icofont icofont-social-linkedin"></i></Link>
                            <Link to="#"><i className="icofont icofont-social-google-plus"></i></Link>
                            <Link to="#"><i className="icofont icofont-camera"></i></Link>
                        </div>
                    </form>

                </div>
            </div>
            {/* movie.title ? movie.vote_count : */}
            {/* header section end  */}
            {/* hero area start */}
            <section className="hero-area" id="home" style={currentImageUrl && { backgroundImage: `url(${ORIGINAL_IMG_URL}${currentImageUrl})` }}>
                <div className="container">
                    <div className="hero-area-slider">

                        <Carousel wrapAround={true} slidesToShow={1} speed={2} autoplay="true">


                            {results && results.map((movie, idx) => (
                                <div className="row hero-area-slide" key={idx}>
                                    <div className="col-lg-6 col-md-5" >
                                        <div className="hero-area-content">
                                            <img src={`${ORIGINAL_IMG_URL}${movie.poster_path}`} ref={imageRef} alt="about" /* onLoad={setBackgroundImage}  *//>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-7">
                                        <div className="hero-area-content pr-50">
                                            <h2>{movie.title ? movie.title : movie.name ? movie.name : movie.original_title}</h2>
                                            <div className="review">
                                                <div className="author-review">
                                                    <i className="icofont icofont-star"></i>
                                                    <i className="icofont icofont-star"></i>
                                                    <i className="icofont icofont-star"></i>
                                                    <i className="icofont icofont-star"></i>
                                                    <i className="icofont icofont-star"></i>
                                                </div>
                                                <h4>{movie.vote_count} voters</h4>
                                            </div>
                                            <p>{movie.overview}</p>
                                            <h3>Cast:</h3>
                                            <div className="slide-cast">
                                                <div className="single-slide-cast">
                                                    <img src="/assets/img/cast/cast1.png" alt="about" />
                                                </div>
                                                <div className="single-slide-cast">
                                                    <img src="/assets/img/cast/cast2.html" alt="about" />
                                                </div>
                                                <div className="single-slide-cast">
                                                    <img src="/assets/img/cast/cast3.png" alt="about" />
                                                </div>
                                                <div className="single-slide-cast">
                                                    <img src="/assets/img/cast/cast4.png" alt="about" />
                                                </div>
                                                <div className="single-slide-cast">
                                                    <img src="/assets/img/cast/cast5.png" alt="about" />
                                                </div>
                                                <div className="single-slide-cast">
                                                    <img src="/assets/img/cast/cast6.png" alt="about" />
                                                </div>
                                                <div className="single-slide-cast">
                                                    <img src="/assets/img/cast/cast7.png" alt="about" />
                                                </div>
                                                <div className="single-slide-cast text-center">
                                                    5+
                                                </div>
                                            </div>
                                            <div className="slide-trailor">
                                                <h3>Watch Trailer</h3>
                                                <Link className="theme-btn theme-btn2" to="#"><i className="icofont icofont-play"></i> Tickets</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Carousel>
                        <div className='toggle-area'>
                            <p>Trending</p>
                            <div className="toggle-button" onClick={handleToggle}>
                                <button className="toggle-button__button" id="toggle-button__button">
                                    {toggleState ? 'Today' : 'This Week'}
                                </button>
                                <div className="toggle-button__indicator"></div>
                            </div>
                        </div>

                    </div>
                    <div className="hero-area-thumb">

                        <div className="thumb-prev">
                            <div className="row hero-area-slide">
                                <div className="col-lg-6">
                                    <div className="hero-area-content">
                                        <img src="/assets/img/slide3.png" alt="about" />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="hero-area-content pr-50">
                                        <h2>Last Avatar</h2>
                                        <div className="review">
                                            <div className="author-review">
                                                <i className="icofont icofont-star"></i>
                                                <i className="icofont icofont-star"></i>
                                                <i className="icofont icofont-star"></i>
                                                <i className="icofont icofont-star"></i>
                                                <i className="icofont icofont-star"></i>
                                            </div>
                                            <h4> voters</h4>
                                        </div>
                                        <p>She is Link devil princess from the demon world. She grew up sheltered by her parents and doesn't really know how to be evil or any of the common actions,   She is unable to cry due to Keita's accidental first wish, despite needed for him to wish...</p>
                                        <h3>Cast:</h3>
                                        <div className="slide-cast">
                                            <div className="single-slide-cast">
                                                <img src="/assets/img/cast/cast1.png" alt="about" />
                                            </div>
                                            <div className="single-slide-cast">
                                                <img src="/assets/img/cast/cast2.html" alt="about" />
                                            </div>
                                            <div className="single-slide-cast">
                                                <img src="/assets/img/cast/cast3.png" alt="about" />
                                            </div>
                                            <div className="single-slide-cast">
                                                <img src="/assets/img/cast/cast4.png" alt="about" />
                                            </div>
                                            <div className="single-slide-cast">
                                                <img src="/assets/img/cast/cast5.png" alt="about" />
                                            </div>
                                            <div className="single-slide-cast">
                                                <img src="/assets/img/cast/cast6.png" alt="about" />
                                            </div>
                                            <div className="single-slide-cast">
                                                <img src="/assets/img/cast/cast7.png" alt="about" />
                                            </div>
                                            <div className="single-slide-cast text-center">
                                                5+
                                            </div>
                                        </div>
                                        <div className="slide-trailor">
                                            <h3>Watch Trailer</h3>
                                            <Link className="theme-btn theme-btn2" to="#"><i className="icofont icofont-play"></i> Tickets</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="thumb-next">
                            <div className="row hero-area-slide">
                                <div className="col-lg-6">
                                    <div className="hero-area-content">
                                        <img src="/assets/img/slide1.png" alt="about" />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="hero-area-content pr-50">
                                        <h2>The Deer God</h2>
                                        <div className="review">
                                            <div className="author-review">
                                                <i className="icofont icofont-star"></i>
                                                <i className="icofont icofont-star"></i>
                                                <i className="icofont icofont-star"></i>
                                                <i className="icofont icofont-star"></i>
                                                <i className="icofont icofont-star"></i>
                                            </div>
                                            <h4>180k voters</h4>
                                        </div>
                                        <p>She is Link devil princess from the demon world. She grew up sheltered by her parents and doesn't really know how to be evil or any of the common actions,   She is unable to cry due to Keita's accidental first wish, despite needed for him to wish...</p>
                                        <h3>Cast:</h3>
                                        <div className="slide-cast">
                                            <div className="single-slide-cast">
                                                <img src="/assets/img/cast/cast1.png" alt="about" />
                                            </div>
                                            <div className="single-slide-cast">
                                                <img src="/assets/img/cast/cast2.html" alt="about" />
                                            </div>
                                            <div className="single-slide-cast">
                                                <img src="/assets/img/cast/cast3.png" alt="about" />
                                            </div>
                                            <div className="single-slide-cast">
                                                <img src="/assets/img/cast/cast4.png" alt="about" />
                                            </div>
                                            <div className="single-slide-cast">
                                                <img src="/assets/img/cast/cast5.png" alt="about" />
                                            </div>
                                            <div className="single-slide-cast">
                                                <img src="/assets/img/cast/cast6.png" alt="about" />
                                            </div>
                                            <div className="single-slide-cast">
                                                <img src="/assets/img/cast/cast7.png" alt="about" />
                                            </div>
                                            <div className="single-slide-cast text-center">
                                                5+
                                            </div>
                                        </div>
                                        <div className="slide-trailor">
                                            <h3>Watch Trailer</h3>
                                            <Link className="theme-btn theme-btn2" to="#"><i className="icofont icofont-play"></i> Tickets</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section > {/*  hero area end */}
            {/* portfolio section start  */}
            <section className="portfolio-area pt-60">
                <div className="container">
                    <div className="row flexbox-center">
                        <div className="col-lg-6 text-center text-lg-left">
                            <div className="section-title">
                                <h1><i className="icofont icofont-movie"></i> Movies</h1>
                            </div>
                        </div>
                        <div className="col-lg-6 text-center text-lg-right">
                            <div className="portfolio-menu">
                                <ul>
                                    <li data-filter="*" className="active">Popular</li>
                                    <li data-filter=".soon">Comming Soon</li>
                                    <li data-filter=".top">Top Rated</li>
                                    <li data-filter=".released">Recently Released</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-lg-9">
                            <div className="row portfolio-item">
                                {movieResults && movieResults.map((movie, idx) => (
                                    <div className="col-md-4 col-sm-6 soon released" key={idx}>
                                        <div className="single-portfolio">
                                            <div className="single-portfolio-img">
                                                <img src={`${IMG_BASE_URL}${movie.poster_path}`} alt="portfolio" />
                                                <Link to={trailer && `https://www.youtube.com/watch?v=${trailer.key}`} className="popup-youtube">
                                                    <i className="icofont icofont-ui-play"></i>
                                                </Link>
                                            </div>
                                            <div className="portfolio-content">
                                                <Link to={`/movie/${movie.id}`}>{movie.title ? movie.title : movie.name ? movie.name : movie.original_title}</Link>
                                                <div className="review">
                                                    <div className="author-review">
                                                        <i className="icofont icofont-star"></i>
                                                        <i className="icofont icofont-star"></i>
                                                        <i className="icofont icofont-star"></i>
                                                        <i className="icofont icofont-star"></i>
                                                        <i className="icofont icofont-star"></i>
                                                    </div>
                                                    <h4>180k voters</h4>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                ))}
                            </div>
                        </div>
                        <div className="col-lg-3 text-center text-lg-left">
                            <div className="portfolio-sidebar">
                                <img src="/assets/img/sidebar/sidebar1.png" alt="sidebar" />
                                <img src="/assets/img/sidebar/sidebar2.png" alt="sidebar" />
                                <img src="/assets/img/sidebar/sidebar3.png" alt="sidebar" />
                                <img src="/assets/img/sidebar/sidebar4.png" alt="sidebar" />
                            </div>
                        </div>
                    </div>
                </div>
            </section> {/* portfolio section end  */}
            {/*  video section start  */}
            <section className="video ptb-90">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section-title pb-20">
                                <h1><i className="icofont icofont-film"></i> Trailers & Videos</h1>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-md-9">
                            <div className="video-area">
                                <img src={results && `${IMG_BASE_URL}${results[0].backdrop_path}`} alt="video" />
                                <div className="popup-youtube" onClick={(e) => selectMovie(results[0])}>
                                    <i className="icofont icofont-ui-play"></i>
                                </div>
                                <div className="video-text">
                                    <h2>{results && results[0].original_title}</h2>
                                    <div className="review">
                                        <div className="author-review">
                                            <i className="icofont icofont-star"></i>
                                            <i className="icofont icofont-star"></i>
                                            <i className="icofont icofont-star"></i>
                                            <i className="icofont icofont-star"></i>
                                            <i className="icofont icofont-star"></i>
                                        </div>
                                        <h4>{results && results[0].vote_count} voters</h4>
                                    </div>
                                </div>
                            </div>
                        </div>{/* url={trailer && `https://www.youtube.com/watch?v=${trailer.key}`} */}
                        <div className="col-md-3">
                            <div className="row">
                                <div className="col-md-12 col-sm-6">
                                    <div className="video-area">
                                        <img src={results && `${IMG_BASE_URL}${results[3].backdrop_path}`} alt="video" />
                                        <div className="popup-youtube" onClick={(e) => selectMovie(results[3])}>
                                            <i className="icofont icofont-ui-play"></i>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12 col-sm-6">
                                    <div className="video-area">{/* <img src="/assets/img/video/video3.png" alt="video" /> */}
                                        <img src={results && `${IMG_BASE_URL}${results[2].backdrop_path}`} alt="video" />
                                        <div className="popup-youtube" onClick={(e) => selectMovie(results[2])}>
                                            <i className="icofont icofont-ui-play"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>{/*  video section end  */}
            {/* news section start  */}
            <section className="news">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="section-title pb-20">
                                <h1><i className="icofont icofont-coffee-cup"></i> Latest News</h1>
                            </div>
                        </div>
                    </div>
                    <hr />
                </div>
                <div className="news-slide-area">
                    <div className="news-slider">
                        <Carousel wrapAround={true} slidesToShow={1} speed={2} autoplay="true">
                            <div className="single-news">
                                <div className="news-bg-1"></div>
                                <div className="news-date">
                                    <h2><span>NOV</span> 25</h2>
                                    <h1>2017</h1>
                                </div>
                                <div className="news-content">
                                    <h2>The Witch Queen</h2>
                                    <p>Witch Queen is Link tall woman with Link slim build. She has pink hair, which is pulled up under her hat, and teal eyes.</p>
                                </div>
                                <Link to="#">Read More</Link>
                            </div>
                            <div className="single-news">
                                <div className="news-bg-2"></div>
                                <div className="news-date">
                                    <h2><span>NOV</span> 25</h2>
                                    <h1>2017</h1>
                                </div>
                                <div className="news-content">
                                    <h2>The Witch Queen</h2>
                                    <p>Witch Queen is Link tall woman with Link slim build. She has pink hair, which is pulled up under her hat, and teal eyes.</p>
                                </div>
                                <Link to="#">Read More</Link>
                            </div>
                            <div className="single-news">
                                <div className="news-bg-3"></div>
                                <div className="news-date">
                                    <h2><span>NOV</span> 25</h2>
                                    <h1>2017</h1>
                                </div>
                                <div className="news-content">
                                    <h2>The Witch Queen</h2>
                                    <p>Witch Queen is Link tall woman with Link slim build. She has pink hair, which is pulled up under her hat, and teal eyes.</p>
                                </div>
                                <Link to="#">Read More</Link>
                            </div>
                        </Carousel>
                    </div>
                    <div className="news-thumb">
                        <div className="news-next">
                            <div className="single-news">
                                <div className="news-bg-3"></div>
                                <div className="news-date">
                                    <h2><span>NOV</span> 25</h2>
                                    <h1>2017</h1>
                                </div>
                                <div className="news-content">
                                    <h2>The Witch Queen</h2>
                                    <p>Witch Queen is Link tall woman with Link slim build. She has pink hair, which is pulled up under her hat, and teal eyes.</p>
                                </div>
                                <Link to="#">Read More</Link>
                            </div>
                        </div>
                        <div className="news-prev">
                            <div className="single-news">
                                <div className="news-bg-2"></div>
                                <div className="news-date">
                                    <h2><span>NOV</span> 25</h2>
                                    <h1>2017</h1>
                                </div>
                                <div className="news-content">
                                    <h2>The Witch Queen</h2>
                                    <p>Witch Queen is Link tall woman with Link slim build. She has pink hair, which is pulled up under her hat, and teal eyes.</p>
                                </div>
                                <Link to="#">Read More</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>{/*  news section end  */}
            {/*  footer section start  */}
            <footer className="footer">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-sm-6">
                            <div className="widget">
                                <img src="/assets/img/logo.png" alt="about" />
                                <p>7th Harley Place, London W1G 8LZ United Kingdom</p>
                                <h6><span>Call us: </span>(+880) 111 222 3456</h6>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-6">
                            <div className="widget">
                                <h4>Legal</h4>
                                <ul>
                                    <li><Link to="#">Terms of Use</Link></li>
                                    <li><Link to="#">Privacy Policy</Link></li>
                                    <li><Link to="#">Security</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-6">
                            <div className="widget">
                                <h4>Account</h4>
                                <ul>
                                    <li><Link to="#">My Account</Link></li>
                                    <li><Link to="#">Watchlist</Link></li>
                                    <li><Link to="#">Collections</Link></li>
                                    <li><Link to="#">User Guide</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-6">
                            <div className="widget">
                                <h4>Newsletter</h4>
                                <p>Subscribe to our newsletter system now to get latest news from us.</p>
                                <form action="#">
                                    <input type="text" placeholder="Enter your email.." />
                                    <button>SUBSCRIBE NOW</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <hr />
                </div>
                <div className="copyright">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 text-center text-lg-left">
                                <div className="copyright-content">
                                    <p><Link target="_blank" to="https://www.templateshub.net">Templates Hub</Link></p>
                                </div>
                            </div>
                            <div className="col-lg-6 text-center text-lg-right">
                                <div className="copyright-content">
                                    <Link to="#" className="scrollToTop">
                                        Back to top<i className="icofont icofont-arrow-up"></i>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            {/* footer section end  */}
        </div >
    )
}

export default LandingPage