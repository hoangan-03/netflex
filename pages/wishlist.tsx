import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import InfoModal from "@/components/InfoModal";
import ViewModal from "@/components/ViewModal";
import useInfoStore from "@/hooks/useInfoStore";
import useViewStore from "@/hooks/useViewStore";
import MovieCardResponsive from "@/components/MovieCardResponsive";
import axios from 'axios';
import { MovieInterface, SeriesInterface } from "../types";
import { fetchMovie, fetchSeries } from "@/api/film";

import SeriesCard from "@/components/SeriesCardResponsive";
import SeriesInfoModal from "@/components/SeriesInfoModal";
import useViewSeriesStore from "@/hooks/useViewSeriesStore";
import useSeriesInfoStore from "@/hooks/useSeriesInfoStore";
import SeriesViewModal from "@/components/SeriesViewModal";

const WishList = () => {
    const [movies, setMovies] = useState<MovieInterface[]>([]);
    const [series, setSeries] = useState<SeriesInterface[]>([]);
    const { isOpen, closeModal } = useInfoStore();
    const { ViewModalopen, closeViewModal } = useViewStore();
    const { isOpen: isSeriesOpen, closeModal: closeSeriesModal } = useSeriesInfoStore();
    const { ViewModalopen: ViewSeriesModalopen, closeViewModal: closeSeriesViewModal } = useViewSeriesStore();


    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                const user = localStorage.getItem("user");
                let userId;
                if (user) {
                  const parsedUser = JSON.parse(user);
                  userId = parsedUser.userId;
                }
                if (!userId) {
                    console.error("User ID not found in local storage");
                    return;
                }
                const response = await axios.get(`/api/getwishlist`, {
                    params: { userId },
                });
                const { movies, series } = response.data;

                const movieDataPromises = movies.map((movie: any) => fetchMovie(movie.videoID));
                const movieData = await Promise.all(movieDataPromises);
                setMovies(movieData);

                const seriesDataPromises = series.map((series: any) => fetchSeries(series.seriesID));
                const seriesData = await Promise.all(seriesDataPromises);
                setSeries(seriesData);

            } catch (error) {
                console.error("Error fetching wishlist:", error);
            }
        };
        fetchWishlist();
    }, []);

    return (
        <>
            <InfoModal visible={isOpen} onClose={closeModal} />
            <SeriesInfoModal visible={isSeriesOpen} onClose={closeSeriesModal} />
            <ViewModal visible={ViewModalopen} onClose={closeViewModal} />
            <SeriesViewModal visible={ViewSeriesModalopen} onClose={closeSeriesViewModal} />
            <Navbar />
            <div className={`w-full h-auto bg-black pt-[100px] md:pt-[120px] md:px-[100px] flex flex-col px-4 sm:px-10 pb-[220px] gap-5 `}>
                <h2 className="text-white text-3xl font-bold px-10 ">Movies</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 w-auto overflow-hidden px-10 pb-24">
                    {movies?.map((movie: MovieInterface) => (
                        <MovieCardResponsive key={movie.id} data={movie} />
                    ))}
                </div>
                <h2 className="text-white text-3xl font-bold px-10">Series</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 w-auto overflow-hidden px-10 pb-24">
                    {series?.map((series: SeriesInterface) => (
                        <SeriesCard key={series.id} data={series} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default WishList;