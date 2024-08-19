
interface Genre {
  id: number;
  name: string;
  _id: string;
}

export interface FetchMovieDetails {
  _id: string;
  id: string;
  name: string;
  overview: string;
  popularity: number;
  voteAverage: number;
  voteCount: number;
  releaseDate: string; 
  genres: Genre[];
  __v: number;
}
