import axios, { AxiosResponse } from 'axios';
const apikey: string = process.env.NEXT_PUBLIC_API_KEY ?? '';

const movieEndpoint = (filmID: string): string =>
    `https://api.themoviedb.org/3/movie/${filmID}?api_key=${apikey}`;

const castEndpoint = (filmID: string): string =>
    `https://api.themoviedb.org/3/movie/${filmID}/credits?api_key=${apikey}`;

const castSeriesEndpoint = (seriesID: string): string =>
    `https://api.themoviedb.org/3/tv/${seriesID}/credits?api_key=${apikey}`;


const seriesEndpoint = (seriesID: string): string =>
    `https://api.themoviedb.org/3/tv/${seriesID}?api_key=${apikey}`;

const seasonEndpoint = (seriesID: string, seasonNumber: number): string =>
    `https://api.themoviedb.org/3/tv/${seriesID}/season/${seasonNumber}?api_key=${apikey}`;

const episodeEndpoint = (seriesID: string, seasonNumber: number, episodeNumber: number): string =>
    `https://api.themoviedb.org/3/tv/${seriesID}/season/${seasonNumber}/episode/${episodeNumber}?api_key=${apikey}`;



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
    let castUrl: string = castEndpoint(filmID);
    return apiCall(castUrl);
};
export const fetchSeriesCast = (serieSID: string): Promise<any> => {
    let castSeriesUrl: string = castSeriesEndpoint(serieSID);
    return apiCall(castSeriesUrl);
};
export const fetchSeries = (seriesID: string): Promise<any> => {
    let seriesUrl: string = seriesEndpoint(seriesID);
    return apiCall(seriesUrl);
};
export const fetchSeason = (seriesID: string, season: number): Promise<any> => {
    let seasonUrl: string = seasonEndpoint(seriesID, season);
    return apiCall(seasonUrl);
};
export const fetchEpisode = (seriesID: string, season: number, episode: number): Promise<any> => {
    let episodeUrl: string = episodeEndpoint(seriesID, season, episode);
    return apiCall(episodeUrl);
};