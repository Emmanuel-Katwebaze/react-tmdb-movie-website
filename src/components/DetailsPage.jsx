import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import Slider from "react-slick";
import YouTube from 'react-youtube';

export default function DetailsPage() {
    const [videos, setVideos] = useState({});
    const [pageLoading, setPageLoading] = useState(true);
    const params = useParams();/* 
    const [movie, setMovie] = useState({});
    const [movies, setMovies] = useState({}); */
    const [trailer, setTrailer] = useState(null)
    const [playing, setPlaying] = useState(false)

    const { id: videoId } = params;
    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 2000,
        cssEase: "linear"
    };

    const location = useLocation()

    const { credits } = videos;

    /* const { results } = videos;
    const { results: movieResults } = movies; */

    const BASE_URL = 'https://api.themoviedb.org/3';

    const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500';

    const ORIGINAL_IMG_URL = 'https://image.tmdb.org/t/p/original';


    const fetchMovieDetails = async (id) => {
        const { data } = await axios.get(`${BASE_URL}/movie/${id}`, {
            params: {
                api_key: '13e72ef8b4ac129f160e87c49e8a2b1e',
                append_to_response: "videos,credits"
            }
        })

        return data;

    }



    useEffect(() => {

        fetchMovieDetails(videoId).then((data) => {
            if (data.status === 404) {
                setVideos([]);
            } else {
                setVideos(data);
                setPageLoading(false);
            }
        })
            .catch(error => {
                console.log(error);
            });

    }, []);


    /* const fetchMovieTrailer = () => {
        if (videos && videos.videos.results) {
            const trailer = videos.videos.results.find(vid => vid.name === "Official Trailer")
            setTrailer(trailer ? trailer : videos.videos.results[0])
        }
    } */


    const selectMovie = () => {
        /* e.preventDefault(); */
        /*  fetchMovieTrailer() */
        if (videos && videos.videos.results) {
            const trailer = videos.videos.results.find(vid => vid.name === "Official Trailer")
            setTrailer(trailer ? trailer : videos.videos.results[0])
        }
        setPlaying(true)
    }

    const closeMovieSection = () => {
        setPlaying(false)
    }



    /* console.log(movieResults);
    console.log(results); */    

    console.log(videos);
    console.log(videos.poster_path);
    console.log(credits)
    console.log(trailer);




    return (
        <div>
            {pageLoading ? <div id="preloader"></div> : ""}
            {/*  header section start */}
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
            <header className="header">
                <div className="container">
                    <div className="header-area">
                        <div className="logo">
                            <Link to={`/`}><img src="/assets/img/logo.png" alt="logo" /></Link>
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
                                    <li><Link to="index-2.html">Home</Link></li>
                                    <li><Link to="movies.html">Movies</Link></li>
                                    <li><Link className="active" to="celebrities.html">CelebritiesList</Link></li>
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

            {/*  breadcrumb area start */}
            <section className="breadcrumb-area" style={{ backgroundImage: `url(${ORIGINAL_IMG_URL}${videos.backdrop_path})` }}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="breadcrumb-area-content">
                                <h1>{videos.original_title}</h1>
                            </div>
                            <div className='trailer-btn' style={{ textAlign: 'center', }}>
                                <button className='theme-btn' onClick={selectMovie}>Watch Trailer</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>{/*  breadcrumb area end  */}
            {/*  transformers area start  */}
            <section className="transformers-area">
                <div className='cast-title' style={{ textAlign: 'center', margin: '1.5rem 0', }}>
                    <h2>Cast</h2>
                </div>
                <div className="container">
                    <div className="transformers-box" style={{ height: '50%', width: '80%', }} >
                        <Slider {...settings}>

                            {credits && credits.cast.map((cast, idx) => (

                                cast.name && cast.profile_path &&
                                <Link to={`/person/${cast.id}`} className="carousel-area" key={idx}>
                                    <div className="transformers-content" >
                                        <img src={`${IMG_BASE_URL}${cast.profile_path}`} alt="about" />
                                    </div>
                                    <div className='carousel-content'>
                                        <h5>{cast.name}</h5>
                                    </div>
                                </Link>
                            ))}
                        </Slider>
                    </div>
                </div>
            </section>{/*  transformers area end */}
            {/* details area start */}
            <section className="details-area">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-9">
                            <div className="details-content">
                                <div className="details-overview">
                                    <h2>Overview</h2>
                                    <p>{videos.overview}</p>
                                </div>
                                <div className="details-reply">
                                    <h2>Leave Link Reply</h2>
                                    <form action="#">
                                        <div className="row">
                                            <div className="col-lg-4">
                                                <div className="select-container">
                                                    <input type="text" placeholder="Name" />
                                                    <i className="icofont icofont-ui-user"></i>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="select-container">
                                                    <input type="text" placeholder="Email" />
                                                    <i className="icofont icofont-envelope"></i>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="select-container">
                                                    <input type="text" placeholder="Phone" />
                                                    <i className="icofont icofont-phone"></i>
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="textarea-container">
                                                    <textarea placeholder="Type Here Message"></textarea>
                                                    <button><i className="icofont icofont-send-mail"></i></button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div className="details-comment">
                                    <Link className="theme-btn theme-btn2" to="#">Post Comment</Link>
                                    <p>You may use these HTML tags and attributes: You may use these HTML tags and attributes: You may use these HTML tags and attributes: </p>
                                </div>
                                <div className="details-thumb">
                                    <div className="details-thumb-prev">
                                        <div className="thumb-icon">
                                            <i className="icofont icofont-simple-left"></i>
                                        </div>
                                        <div className="thumb-text">
                                            <h4>Previous Post</h4>
                                            <p>Standard Post With Gallery</p>
                                        </div>
                                    </div>
                                    <div className="details-thumb-next">
                                        <div className="thumb-text">
                                            <h4>Next Post</h4>
                                            <p>Standard Post With Preview Image</p>
                                        </div>
                                        <div className="thumb-icon">
                                            <i className="icofont icofont-simple-right"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>{/*  details area end  */}
            {/* footer section start  */}
            <footer className="footer">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-sm-6">
                            <div className="widget">
                                <img src="assets/img/logo.png" alt="about" />
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
        </div>
    )
}
