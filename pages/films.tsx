import React from "react";
import Navbar from "@/components/Navbar";
import DisplayRandom from "@/components/DisplayRandom";
import MovieList from "@/components/MovieList";
import InfoModal from "@/components/InfoModal";
import ViewModal from "@/components/ViewModal";
import useInfoModalStore from "@/hooks/useInfoStore";
import useMovieList from "@/hooks/useMovieList";
import { fetchMovie } from "../api/film";
import { useState, useEffect } from "react";
import { MovieInterface, Genre } from "../types";
import useViewStore from "@/hooks/useViewStore";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MovieCardResponsive from "@/components/MovieCardResponsive";

const Films = () => {
  const [selectedGenre, setGenre] = useState<string>("Genre");
  const { data: movies = [] } = useMovieList();
  const [updatedMovies, setUpdatedMovies] = useState(movies);

  useEffect(() => {
    Promise.all(movies.map((movie: any) => fetchMovie(movie.videoID)))
      .then((dataa) => {
        const newMovies = movies.map((movie: any) => {
          const matchingData = dataa.find((d) => d.id == movie.videoID);
          return matchingData ? { ...movie, ...matchingData } : movie;
        });
        setUpdatedMovies(newMovies);
      })
      .catch((error) => console.error(error));
  }, [movies]);

  const { isOpen, closeModal } = useInfoModalStore();
  const { ViewModalopen, closeViewModal } = useViewStore();

  const anime = updatedMovies.filter(
    (movie: MovieInterface) =>
      movie.genres?.some((genre: Genre) => genre.name === "Animation") &&
      movie.original_language === "ja"
  );
  const newReleases = updatedMovies.filter((movie: MovieInterface) =>
    movie.release_date?.includes("2024")
  );
  const scienceFiction = updatedMovies.filter((movie: MovieInterface) =>
    movie.genres?.some((genre: Genre) => genre.name === "Science Fiction")
  );
  const horror = updatedMovies.filter((movie: MovieInterface) =>
    movie.genres?.some((genre: Genre) => genre.name === "Horror")
  );
  const mystery = updatedMovies.filter((movie: MovieInterface) =>
    movie.genres?.some((genre: Genre) => genre.name === "Mystery")
  );
  const HollywoodMovies = updatedMovies.filter(
    (movie: MovieInterface) =>
      movie.origin_country?.includes("US") &&
      movie.genres?.some((genre: Genre) => genre.name !== "Animation")
  );
  const romance = updatedMovies.filter((movie: MovieInterface) =>
    movie.genres?.some((genre: Genre) => genre.name === "Romance")
  );
  const epicAdventures = updatedMovies.filter((movie: MovieInterface) =>
    movie.genres?.some((genre: Genre) => genre.name === "Adventure")
  );
  const comedy = updatedMovies.filter((movie: MovieInterface) =>
    movie.genres?.some((genre: Genre) => genre.name === "Comedy")
  );
  const heartwarmingStories = updatedMovies.filter((movie: MovieInterface) =>
    movie.genres?.some((genre: Genre) => genre.name === "Drama")
  );
  const thrillers = updatedMovies.filter((movie: MovieInterface) =>
    movie.genres?.some((genre: Genre) => genre.name === "Thriller")
  );
  const documentaries = updatedMovies.filter((movie: MovieInterface) =>
    movie.genres?.some((genre: Genre) => genre.name === "Documentary")
  );
  const familyFun = updatedMovies.filter((movie: MovieInterface) =>
    movie.genres?.some((genre: Genre) => genre.name === "Family")
  );
  const classicHits = updatedMovies.filter((movie: MovieInterface) =>
    movie.release_date && parseInt(movie.release_date.split("-")[0]) < 2000
  );
  const internationalCinema = updatedMovies.filter((movie: MovieInterface) =>
    movie.origin_country && movie.origin_country.length > 1
  );

  const handleChange = (event: SelectChangeEvent) => {
    setGenre(event.target.value as any);
  };

  const filterMovies = updatedMovies.filter((movie: MovieInterface) =>
    movie.genres?.some((genre: Genre) => genre.name === selectedGenre)
  );

  const popularest = updatedMovies.filter(
    (movie: MovieInterface) => movie.popularity > 140
  );

  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <ViewModal visible={ViewModalopen} onClose={closeViewModal} />

      <Navbar />
      <div className="w-full h-auto md:h-[200px] z-[10000] pl-[70px] absolute top-0 flex flex-row pt-[70px] md:pt-[100px] gap-12 justify-start items-start md:items-center">
        <h2 className="text-white text-6xl font-bold hidden md:block">Movies</h2>
        <div className="w-[200px] top-10">
          <FormControl
            size="small"
            fullWidth
            style={{
              backgroundColor: "black",
              zIndex: "10001",
              borderColor: "white",
              border: "1px solid",
            }}
          >
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedGenre}
              label="Genre"
              onChange={handleChange}
              style={{ color: "white", borderColor: "white", outline: "none", height: "2rem" }}
              IconComponent={(props) => (
                <ExpandMoreIcon {...props} style={{ color: "white" }} />
              )}
            >
              <MenuItem value="Genre">Genre</MenuItem>
              <MenuItem value="Action">Action</MenuItem>
              <MenuItem value="Adventure">Adventure</MenuItem>
              <MenuItem value="Animation">Animation</MenuItem>
              <MenuItem value="Comedy">Comedy</MenuItem>
              <MenuItem value="Crime">Crime</MenuItem>
              <MenuItem value="Documentary">Documentary</MenuItem>
              <MenuItem value="Horror">Horror</MenuItem>
              <MenuItem value="Mystery">Mystery</MenuItem>
              <MenuItem value="Romance">Romance</MenuItem>
              <MenuItem value="Science Fiction">Science Fiction</MenuItem>
              <MenuItem value="Thriller">Thriller</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <div className={`w-full h-auto bg-black flex flex-col gap-2 ${selectedGenre === "Genre" ? "block" : "hidden"} `}>
        <DisplayRandom data={updatedMovies} title={""} />
        <MovieList title="Top Picks for You" data={popularest} />
        <MovieList title="Anime Adventures" data={anime} />
        <MovieList title="Fresh Arrivals" data={newReleases} />
        <MovieList title="Mind-Bending Sci-Fi" data={scienceFiction} />
        <MovieList title="Spine-Chilling Horror" data={horror} />
        <MovieList title="Unsolved Mysteries" data={mystery} />
        <MovieList title="Hollywood Hits" data={HollywoodMovies} />
        <MovieList title="Romantic Escapes" data={romance} />
        <MovieList title="Epic Adventures" data={epicAdventures} />
        <MovieList title="Laugh Out Loud" data={comedy} />
        <MovieList title="Heartwarming Stories" data={heartwarmingStories} />
        <MovieList title="Edge of Your Seat Thrillers" data={thrillers} />
        <MovieList title="Documentary Spotlight" data={documentaries} />
        <MovieList title="Family Fun" data={familyFun} />
        <MovieList title="Classic Hits" data={classicHits} />
        <MovieList title="International Cinema" data={internationalCinema} />
      </div>
      <div className={`w-full h-auto bg-black pt-[150px] md:pt-[220px] px-4 md:px-6 xl:px-[100px] flex flex-col gap-2 ${selectedGenre !== "Genre" ? "block" : "hidden"} `}>
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 w-auto overflow-hidden px-4 sm:px-10 pb-[220px]">
          {filterMovies?.map((movie: MovieInterface) => (
            <MovieCardResponsive key={movie.id} data={movie} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Films;