

export interface User {
  id: string;
  fullname: string;
  imageUrl?: string;
  isMale?: boolean;
  yearOfBirth?: number;
  email: string;
  hashedPassword: string;
  createdAt: Date;
  updatedAt: Date;
  wishList: UserMovie[];
}

export interface Movie {
  id: string;
  videoID: string;
  videoUrl: string;
  users: UserMovie[];
}

export interface UserMovie {
  id: string;
  userId: string;
  movieId: string;
  user: User;
  movie: Movie;
}

export interface SeriesInterface {
  backdrop_path: string;
  episode_run_time: number[];
  first_air_date: string;
  genres: Genre[];
  homepage: string;
  id: number;
  languages: string[];
  name: string;
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  seasons: Season[];
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
}

export interface Episode {
  id: number;
  name: string;
  overview: string;
  vote_average: number;
  vote_count: number;
  air_date: string;
  episode_number: number;
  episode_type: string;
  production_code: string;
  runtime: number;
  season_number: number;
  show_id: number;
  still_path: string;
}

export interface Season {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
  vote_average: number;
}


export interface MovieInterface {
  id: string;
  videoUrl: string;
  title: string;
  overview: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  videoID: string;
  budget: number;
  revenue: number;
  runtime: number;
  genres: Genre[];
  original_language: string;
  origin_country: Array<string>;
  backdrop_path: string; 
  popularity: number;
  tagline: string;

}
export type MediaInterface = MovieInterface | SeriesInterface;
export interface Genre {
  id: number;
  name: string;
}
export interface SearchResult {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string;
  release_date: string;
  runtime: number;
  genres: { name: string }[];
  videoUrl: string;
  vote_average: number;
  vote_count: number;
  videoID: number;
  poster_path: string;
  budget: number;
  revenue: number;
  original_language: string;
  origin_country: string[];
}
export interface InfoModalProps {
  visible?: boolean;
  onClose: any;
}
export interface SeriesInfoModalProps {
  visible?: boolean;
  onClose: any;
}
export interface MobileMenuProps {
  visible?: boolean;
}
export interface MovieListProps {
  data: MovieInterface[];
  title: string;
}
export interface SeriesListProps {
  data: MovieInterface[];
  title: string;
}

import { StaticImageData } from "next/image";
export interface ScrollButtonProps {
  direction: "left" | "right";
  scroll: () => void;
  icon: StaticImageData;
}
export interface NavbarItemProps {
  label: string;
  active?: boolean;
}
export interface PlayButtonProps {
  movieId: any;
}
export interface MovieCardProps {
  data: MovieInterface;
}
export interface SeriesCardProps {
  data: SeriesInterface;
}

export interface ViewModalProps {
  visible?: boolean;
  onClose: any;
}