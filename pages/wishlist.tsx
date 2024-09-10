import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import InfoModal from "@/components/InfoModal";
import ViewModal from "@/components/ViewModal";
import useInfoModalStore from "@/hooks/useInfoStore";
import useViewStore from "@/hooks/useViewStore";
import MovieCard2 from "@/components/MovieCard2";
import { fetchMovie } from "../api/film";
import axios from 'axios';
import { MovieInterface } from "../types";

const WishList = () => {
    const [movies, setMovies] = useState<MovieInterface[]>([]);
    const { isOpen, closeModal } = useInfoModalStore();
    const { ViewModalopen, closeViewModal } = useViewStore();
    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                const user = localStorage.getItem("user");
                console.log("User local storage:", user);
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
                const movieIds = response.data.map((movie: any) => movie.videoID);
                const movieDataPromises = movieIds.map((id: string) => fetchMovie(id));
                const movieData = await Promise.all(movieDataPromises);
                setMovies(movieData);
            } catch (error) {
                console.error("Error fetching wishlist:", error);
            }
        };
        fetchWishlist();
    }, []);
    console.log(movies);
    return (
        <>
            <InfoModal visible={isOpen} onClose={closeModal} />
            <ViewModal visible={ViewModalopen} onClose={closeViewModal} />
            <Navbar />
            <div className={`w-full h-auto pt-[150px] md:pt-[220px] px-4 md:px-[100px] flex flex-col gap-2 `}>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 w-auto overflow-hidden px-4 sm:px-10 pb-[220px]">
                    {movies?.map((movie: MovieInterface) => (
                        <MovieCard2 key={movie.id} data={movie} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default WishList;