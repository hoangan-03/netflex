
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

}
export interface Genre {
  id: number;
  name: string;
}