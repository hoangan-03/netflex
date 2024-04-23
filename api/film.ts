import axios, { AxiosResponse } from 'axios';
const apikey: string = process.env.NEXT_PUBLIC_API_KEY ?? '';

const movieEndpoint = (filmID: string): string =>
    `https://api.themoviedb.org/3/movie/${filmID}?api_key=${apikey}`;

const castEndpoint = (filmID: string): string =>
    `https://api.themoviedb.org/3/movie/${filmID}/credits?api_key=${apikey}`;

const apiCall = async (endpoint: string): Promise<any> => {
    const options = {
        method: 'GET',
        url: endpoint,
    };
    try {
        const response: AxiosResponse = await axios.request(options);
        return response.data;
    } catch (error) {
        console.log('error: ', error);
        return {};
    }
};

export const fetchMovie = (filmID: string): Promise<any> => {
    let movieUrl: string = movieEndpoint(filmID);
    return apiCall(movieUrl);
};
export const fetchCast = (filmID: string): Promise<any> => {
    let movieUrl: string = castEndpoint(filmID);
    return apiCall(movieUrl);
};