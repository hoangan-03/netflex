
export interface MovieInterface {
  id: string;
  videoUrl: string;
  original_title: string;
  overview: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  videoID: string;
  budget: number;
  revenue: number;
  runtime: number;
  genres: Array<object>;

   // Fix the syntax error and use 'object' instead of 'Object'
  backdrop_path: string; // Add this line
  // Add any other properties that a movie object might have
}