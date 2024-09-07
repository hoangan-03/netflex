
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
export interface MobileMenuProps {
  visible?: boolean;
}
export interface MovieListProps {
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
export interface ViewModalProps {
  visible?: boolean;
  onClose: any;
}