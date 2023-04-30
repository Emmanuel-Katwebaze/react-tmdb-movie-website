import axios from 'axios';

export const BASE_URL = 'https://api.themoviedb.org/3';

export const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500';


export const TMDB_API_KEY = process.env.TMDB_API_KEY;

export const fetchFromAPI = async (url,append) => {
    const { data } = await axios.get(`${BASE_URL}/${url}${append}`,{
        params: {
            api_key: process.env.TMDB_API_KEY
        }
    });

    return data;
}
