import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function CelebrityPage() {
    const [personDetails, setPersonDetails] = useState({});
    const [pageLoading, setPageLoading] = useState(true);
    const params = useParams();

    const { id: personId } = params;

    const BASE_URL = 'https://api.themoviedb.org/3';

    const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500';

    const ORIGINAL_IMG_URL = 'https://image.tmdb.org/t/p/original';


    const fetchPersonDetails = async (id) => {
        const { data } = await axios.get(`${BASE_URL}/person/${id}`, {
            params: {
                api_key: '13e72ef8b4ac129f160e87c49e8a2b1e',
                append_to_response: "movie_credits"
            }
        })

        return data;

    }

    useEffect(() => {

        fetchPersonDetails(personId).then((data) => {
            if (data.status === 404) {
                setPersonDetails([]);
            } else {
                setPersonDetails(data);
                setPageLoading(false);
            }
        })
            .catch(error => {
                console.log(error);
            });

    }, []);

    console.log(personDetails)

    return (
        <div>
            {/*  Page loader */}
            {pageLoading ? <div id="preloader"></div> : ""}
            {/* header section start */}
            <header class="header">
                <div class="container">
                    <div class="header-area">
                        <div class="logo">
                            <Link to={`/`}><img src="assets/img/logo.png" alt="logo" /></Link>
                        </div>
                        <div class="header-right">
                            <form action="#">
                                <select>
                                    <option value="Movies">Movies</option>
                                    <option value="Movies">Movies</option>
                                    <option value="Movies">Movies</option>
                                </select>
                                <input type="text" />
                                <button><i class="icofont icofont-search"></i></button>
                            </form>
                            <ul>
                                <li><Link to="#">Welcome Guest!</Link></li>
                                <li><Link class="login-popup" to="#">Login</Link></li>
                            </ul>
                        </div>
                        <div class="menu-area">
                            <div class="responsive-menu"></div>
                            <div class="mainmenu">
                                <ul id="primary-menu">
                                    <li><Link to="index-2.html">Home</Link></li>
                                    <li><Link to="movies.html">Movies</Link></li>
                                    <li><Link to="celebrities.html">CelebritiesList</Link></li>
                                    <li><Link to="top-movies.html">Top Movies</Link></li>
                                    <li><Link to="blog.html">News</Link></li>
                                    <li><Link to="#">Pages <i class="icofont icofont-simple-down"></i></Link>
                                        <ul>
                                            <li><Link to="blog-details.html">Blog Details</Link></li>
                                            <li><Link to="movie-details.html">Movie Details</Link></li>
                                        </ul>
                                    </li>
                                    <li><Link class="theme-btn" to="#"><i class="icofont icofont-ticket"></i> Tickets</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <div class="login-area">
                <div class="login-box">
                    <Link to="#"><i class="icofont icofont-close"></i></Link>
                    <h2>LOGIN</h2>
                    <form action="#">
                        <h6>USERNAME OR EMAIL ADDRESS</h6>
                        <input type="text" />
                        <h6>PASSWORD</h6>
                        <input type="text" />
                        <div class="login-remember">
                            <input type="checkbox" />
                            <span>Remember Me</span>
                        </div>
                        <div class="login-signup">
                            <span>SIGNUP</span>
                        </div>
                        <Link to="#" class="theme-btn">LOG IN</Link>
                        <span>Or Via Social</span>
                        <div class="login-social">
                            <Link to="#"><i class="icofont icofont-social-facebook"></i></Link>
                            <Link to="#"><i class="icofont icofont-social-twitter"></i></Link>
                            <Link to="#"><i class="icofont icofont-social-linkedin"></i></Link>
                            <Link to="#"><i class="icofont icofont-social-google-plus"></i></Link>
                            <Link to="#"><i class="icofont icofont-camera"></i></Link>
                        </div>
                    </form>

                </div>
            </div>
            {/*  header section end  */}
            {/*  breadcrumb area start  */}
            {/* <section class="breadcrumb-area">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="breadcrumb-area-content">
                                <h1>Celebrities Page</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}{/*  breadcrumb area end */}
            {/* transformers area start */}
            <section class="celebrity-area">
                <div class="container">
                    <div class="transformers-box">
                        <div class="row flexbox-center">
                            <div class="col-lg-5 text-lg-left text-center">
                                <div class="transformers-content">
                                    <img src={`${IMG_BASE_URL}${personDetails.profile_path}`} alt="about" />
                                </div>
                            </div>
                            <div class="col-lg-7">
                                <div class="transformers-content mtr-30">
                                    <h2>{personDetails.name}</h2>
                                    <ul>
                                        <li>
                                            <div class="transformers-left">
                                                Biography:
                                            </div>
                                            <div class="transformers-right">
                                                {personDetails.biography}
                                            </div>
                                        </li>
                                        <li>
                                            <div class="transformers-left">
                                                Known For:
                                            </div>
                                            <div class="transformers-right">
                                                {personDetails.known_for_department}
                                            </div>
                                        </li>
                                        <li>
                                            <div class="transformers-left">
                                                Gender:
                                            </div>
                                            <div class="transformers-right">
                                                {personDetails.gender === 1 ? 'Female' : personDetails.gender === 2 ? 'Male' : 'Non-binary'}
                                            </div>
                                        </li>
                                        <li>
                                            <div class="transformers-left">
                                                Place of Birth:
                                            </div>
                                            <div class="transformers-right">
                                                {personDetails.place_of_birth}
                                            </div>
                                        </li>
                                        {personDetails.deathday &&
                                            <li>
                                                <div class="transformers-left">
                                                    Death Day:
                                                </div>
                                                <div class="transformers-right">
                                                    {personDetails.deathday}
                                                </div>
                                            </li>
                                        }
                                        <li>
                                            <div class="transformers-left">
                                                Birthday:
                                            </div>
                                            <div class="transformers-right">
                                                {personDetails.birthday}
                                            </div>
                                        </li>
                                        <li>
                                            <div class="transformers-left">
                                                Follow:
                                            </div>
                                            <div class="transformers-right">
                                                <Link to="#"><i class="icofont icofont-social-facebook"></i></Link>
                                                <Link to="#"><i class="icofont icofont-social-twitter"></i></Link>
                                                <Link to="#"><i class="icofont icofont-social-google-plus"></i></Link>
                                                <Link to="#"><i class="icofont icofont-youtube-play"></i></Link>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>{/* transformers area end */}
            {/*  details area start */}
            <section class="details-area">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-9">
                            <div class="details-content">
                                <div class="details-overview">
                                    <h2>Overview</h2>
                                    <p>Humans are at war with the Transformers, and Optimus Prime is gone. The key to saving the future lies buried in the secrets of the past and the hidden history of Transformers on Earth. Now it's up to the unlikely alliance of inventor Cade Yeager, Bumblebee, Link n English lord and an Oxford professor to save the world. Transformers: The Last Knight has Link deeper mythos and bigger spectacle than its predecessors, yet still ends up being mostly hollow and cacophonous. The first "Transformers" movie that could actually be characterized as badass. Which isn't Link bad thing. It may, in fact, be better.</p>
                                </div>
                                <div class="details-reply">
                                    <h2>Leave Link Reply</h2>
                                    <form action="#">
                                        <div class="row">
                                            <div class="col-lg-4">
                                                <div class="select-container">
                                                    <input type="text" placeholder="Name" />
                                                    <i class="icofont icofont-ui-user"></i>
                                                </div>
                                            </div>
                                            <div class="col-lg-4">
                                                <div class="select-container">
                                                    <input type="text" placeholder="Email" />
                                                    <i class="icofont icofont-envelope"></i>
                                                </div>
                                            </div>
                                            <div class="col-lg-4">
                                                <div class="select-container">
                                                    <input type="text" placeholder="Phone" />
                                                    <i class="icofont icofont-phone"></i>
                                                </div>
                                            </div>
                                            <div class="col-lg-12">
                                                <div class="textarea-container">
                                                    <textarea placeholder="Type Here Message"></textarea>
                                                    <button><i class="icofont icofont-send-mail"></i></button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div class="details-comment">
                                    <Link class="theme-btn theme-btn2" to="#">Post Comment</Link>
                                    <p>You may use these HTML tags and attributes: You may use these HTML tags and attributes: You may use these HTML tags and attributes: </p>
                                </div>
                                <div class="details-thumb">
                                    <div class="details-thumb-prev">
                                        <div class="thumb-icon">
                                            <i class="icofont icofont-simple-left"></i>
                                        </div>
                                        <div class="thumb-text">
                                            <h4>Previous Post</h4>
                                            <p>Standard Post With Gallery</p>
                                        </div>
                                    </div>
                                    <div class="details-thumb-next">
                                        <div class="thumb-text">
                                            <h4>Next Post</h4>
                                            <p>Standard Post With Preview Image</p>
                                        </div>
                                        <div class="thumb-icon">
                                            <i class="icofont icofont-simple-right"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 text-center text-lg-left">
                            <div class="portfolio-sidebar">
                                <img src="assets/img/sidebar/sidebar1.png" alt="sidebar" />
                                <img src="assets/img/sidebar/sidebar2.png" alt="sidebar" />
                                <img src="assets/img/sidebar/sidebar4.png" alt="sidebar" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>{/* details area end */}
            {/*  footer section start */}
            <footer class="footer">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-3 col-sm-6">
                            <div class="widget">
                                <img src="assets/img/logo.png" alt="about" />
                                <p>7th Harley Place, London W1G 8LZ United Kingdom</p>
                                <h6><span>Call us: </span>(+880) 111 222 3456</h6>
                            </div>
                        </div>
                        <div class="col-lg-3 col-sm-6">
                            <div class="widget">
                                <h4>Legal</h4>
                                <ul>
                                    <li><Link to="#">Terms of Use</Link></li>
                                    <li><Link to="#">Privacy Policy</Link></li>
                                    <li><Link to="#">Security</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div class="col-lg-3 col-sm-6">
                            <div class="widget">
                                <h4>Account</h4>
                                <ul>
                                    <li><Link to="#">My Account</Link></li>
                                    <li><Link to="#">Watchlist</Link></li>
                                    <li><Link to="#">Collections</Link></li>
                                    <li><Link to="#">User Guide</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div class="col-lg-3 col-sm-6">
                            <div class="widget">
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
                <div class="copyright">
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-6 text-center text-lg-left">
                                <div class="copyright-content">
                                    <p><Link target="_blank" to="https://www.templateshub.net">Templates Hub</Link></p>
                                </div>
                            </div>
                            <div class="col-lg-6 text-center text-lg-right">
                                <div class="copyright-content">
                                    <Link to="#" class="scrollToTop">
                                        Back to top<i class="icofont icofont-arrow-up"></i>
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
