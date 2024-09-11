import React, { useCallback, useEffect, useState } from "react";
import { PlusIcon, XMarkIcon, CheckIcon } from "@heroicons/react/24/outline";
import PlayButton from "@/components/PlayButton";
import useInfoModalStore from "@/hooks/useInfoStore";
import { fetchCast } from "@/api/film";
import { InfoModalProps } from "@/types";
import axios from 'axios';

const InfoModal = ({ visible, onClose }: InfoModalProps) => {
  const [castData, setCast] = useState<any>(null);
  const [isVisible, setIsVisible] = useState<boolean>(visible ? true : false);
  const { signleInfo } = useInfoModalStore();
  const [user, setUser] = useState<any>(null);
  const [isInWishlist, setIsInWishlist] = useState<boolean>(false);

  useEffect(() => {
    setIsVisible(!!visible);
  }, [visible]);

  useEffect(() => {
    if (signleInfo?.id) {
      fetchCast(signleInfo?.id)
        .then((data) => setCast(data))
        .catch((error) => console.error(error));
    }
  }, [signleInfo]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        axios.get(`/api/getwishlist?userId=${parsedUser.userId}`)
          .then(response => {
            const wishlist = response.data;
            const isInWishlist = wishlist.some((movie: any) => movie.videoID === String(signleInfo?.id));
            setIsInWishlist(isInWishlist);
          })
          .catch(error => {
            console.error("Error fetching wishlist:", error);
          });
      } catch (error) {
        console.error("Failed to parse user from local storage:", error);
      }
    }
  }, [signleInfo]);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose]);

  const handleAddToWishlist = async () => {
    if (user) {
      const userId = user.userId;
      const movieId = signleInfo?.id;
      if (!userId || !movieId) {
        alert('User ID or Movie ID is missing');
        return;
      }
      try {
        await axios.post('/api/addwishlist', {
          userId,
          movieId,
        });
        setIsInWishlist(true);
      } catch (error) {
        console.error('Error adding movie to wishlist:', error);
      }
    } else {
      alert('User not found');
    }
  };
  const handleRemoveFromWishlist = async () => {
    if (user) {
      const userId = user.userId;
      const movieId = signleInfo?.id;
      if (!userId || !movieId) {
        alert('User ID or Movie ID is missing');
        return;
      }
      try {
        await axios.delete('/api/removefromwishlist', {
          params: {
            userId,
            movieId,
          },
        });
        setIsInWishlist(false);
      } catch (error) {
        console.error('Error removing movie from wishlist:', error);
      }
    } else {
      alert('User not found');
    }
  };

  if (!visible) {
    return null;
  }

  const thumbnailUrl =
    "https://image.tmdb.org/t/p/original" + signleInfo?.backdrop_path;

  return (
    <div className="z-[65000] transition  w-auto duration-300 bg-black bg-opacity-80 flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0">
      <div className="relative w-auto mx-auto max-w-3xl rounded-md overflow-hidden ">
        <div
          className={`${isVisible ? "scale-100" : "scale-0"
            } transform duration-300  relative flex-auto max-h-[90vh] bg-zinc-900 drop-shadow-md`}
        >
          <div className="relative h-48 md:h-96">
            <video
              poster={thumbnailUrl}
              autoPlay
              muted
              loop
              src={signleInfo?.videoUrl}
              className="w-full brightness-[60%] object-cover h-full"
            />
            <div
              onClick={handleClose}
              className="cursor-pointer absolute top-3 right-3 h-10 w-10 rounded-full bg-black bg-opacity-70 flex items-center justify-center"
            >
              <XMarkIcon className="text-white w-6" />
            </div>
            <div className="absolute bottom-[10%] left-10">
              <p className="text-white text-3xl md:text-4xl h-full lg:text-5xl font-bold mb-8">
                {signleInfo?.title}
              </p>
              <div className="flex flex-row gap-4 items-center">
                <PlayButton movieId={signleInfo?.id} />
              </div>
            </div>
            {user && (
              <div className="absolute bottom-[10%] right-10">
                <button
                  onClick={isInWishlist ? handleRemoveFromWishlist : handleAddToWishlist}
                  className="flex flex-row gap-4 justify-center bg-white/10 rounded-full hover:bg-white/30 p-2 backdrop-blur-sm items-center"
                >
                  {isInWishlist ? (
                    <CheckIcon className="w-7 h-7" />
                  ) : (
                    <PlusIcon className="w-7 h-7" />
                  )}
                </button>
              </div>
            )}
          </div>
          <div className="px-6 md:px-12 py-4 md:py-8">
            <div className="flex flex-row gap-8 justify-between w-full h-full">
              <div className="flex flex-col w-[70%] h-full">
                <div className="flex flex-row items-center gap-3">
                  <p className="text-lg text-green-400 ">
                    {signleInfo?.release_date?.substring(0, 4)}
                  </p>
                  <p className="text-gray-300 text-lg">
                    {signleInfo?.runtime &&
                      `${Math.floor(signleInfo.runtime / 60)}h ${signleInfo.runtime % 60
                      }m`}
                  </p>
                </div>
                <p className="text-white text-lg w-auto mb-7">
                  {signleInfo?.vote_average.toFixed(1)}{"/10"}
                </p>
                <p className="text-white text-base">{signleInfo?.overview}</p>
              </div>
              <div className="w-[30%] h-full flex flex-col gap-3 justify-start items-start">
                <div className="text-white  text-base">
                  <span className="text-gray-200 font-bold">Cast: </span>
                  {castData?.cast[0].name}, {castData?.cast[1].name},{" "}
                  {castData?.cast[2].name}
                </div>
                <div className="text-white  text-base">
                  <span className="text-gray-200 font-bold">Genre: </span>
                  {signleInfo?.genres &&
                    signleInfo?.genres.length > 0 &&
                    (signleInfo?.genres[0] as { name: string })?.name}
                  {signleInfo?.genres &&
                    signleInfo?.genres.length > 1 &&
                    `, ${(signleInfo?.genres[1] as { name: string })?.name}`}
                  {signleInfo?.genres &&
                    signleInfo?.genres.length > 2 &&
                    `, ${(signleInfo?.genres[2] as { name: string })?.name}`}
                  {signleInfo?.genres &&
                    signleInfo?.genres.length > 3 &&
                    `, ${(signleInfo?.genres[3] as { name: string })?.name}`}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;