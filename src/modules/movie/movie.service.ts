
import { v4 as uuidv4 } from 'uuid';
import axios, { AxiosResponse } from 'axios';
import { ConfigService } from '@nestjs/config';
import { FetchMovieDetails } from './type/fetch-movie-details.type';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Movie } from './entities/movie.entity'; // Import the type

@Injectable()
export class MovieService {
  constructor(
    @InjectModel('Movie') private movieModel: Model<Movie>, // Use 'Movie' as a string
    private readonly configService: ConfigService
  ) {}

  async fetchAndSaveMovies() {
    const apiKey = this.configService.get<string>('API_KEY');

    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_KEY}`;

    const response: AxiosResponse = await axios.get(url);
    const movies = response.data.results;  // Adjust as per API response

    for (const movie of movies) {
      const movieDetails = await this.fetchMovieDetails(movie.id);

      const movieDoc = new this.movieModel({
        id: uuidv4(),
        name: movieDetails.title,
        overview: movieDetails.overview,
        popularity: movieDetails.popularity,
        voteAverage: movieDetails.vote_average,
        voteCount: movieDetails.vote_count,
        releaseDate: movieDetails.release_date,
        genres: movieDetails.genres,
      });
      await movieDoc.save();
    }
  }

  async fetchMovieDetails(movieId: number): Promise<FetchMovieDetails> {
   // const apiUrl = this.configService.get<string>('API_URL');  // Adjust config key
    const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.API_KEY}`;
    const response: AxiosResponse = await axios.get(url);
    return response.data;
  }

  async getMovieById(id: string): Promise<Movie> {
    const movie = await this.movieModel.findById(id).exec();
    if (!movie) {
      throw new NotFoundException('Movie not found');
    }
    return movie;
  }

  async getAllMovies(): Promise<Movie[]> {
    const movies = await this.movieModel.find().exec();
    return movies;
  }

  async deleteMovieById(id: string): Promise<void> {
    const result = await this.movieModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('Movie not found');
    }
  }
}
