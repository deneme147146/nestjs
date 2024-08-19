
import { v4 as uuidv4 } from 'uuid';
import axios, { AxiosResponse } from 'axios';
//import { ConfigService } from '@nestjs/config';
import { FetchMovieDetails } from './type/fetch-movie-details.type';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Movie } from './entities/movie.entity'; 

@Injectable()
export class MovieService {
  constructor(
    @InjectModel('Movie') private movieModel: Model<Movie>, 
    //private readonly configService: ConfigService
  ) {}
  
  async createMovie(createMovieDto: CreateMovieDto): Promise<Movie> {
    const movie = new this.movieModel({
      id: uuidv4(),
      ...createMovieDto,
    });
    
    return await movie.save();
  }
 

  async fetchAndSaveMovies() {
   // const apiKey = this.configService.get<string>('API_KEY');
  
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_KEY}`;
  
    const response: AxiosResponse = await axios.get(url);
    const movies = response.data.results;  

    for (const movie of movies) {
      const movieDetails = await this.fetchMovieDetails(movie.id);
  
      const existingMovie = await this.movieModel.findOne({ id: movieDetails.id });
  
      if (!existingMovie) {
        const movieDoc = new this.movieModel({
          id: movieDetails.id, 
          name: movieDetails.name,
          overview: movieDetails.overview,
          popularity: movieDetails.popularity,
          voteAverage: movieDetails.voteAverage,
          voteCount: movieDetails.voteCount,
          releaseDate: movieDetails.releaseDate,
          genres: movieDetails.genres,
        });
        await movieDoc.save();
      } else {

      }
    }
  }
  

  async fetchMovieDetails(movieId: number): Promise<FetchMovieDetails> {
   // const apiUrl = this.configService.get<string>('API_URL');  // Adjust config key
    const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.API_KEY}`;
    
    const response: AxiosResponse = await axios.get(url);
    //console.log("ğüpğ", response.data.results)
    
    return response.data;
  }

  async getMovieById(id: string): Promise<Movie> {
    if(id.includes('-')){
      throw new NotFoundException('Id mustnt contain - char'); 
    }
    const movie = await this.movieModel.findById(id).exec();
    if (!movie) {
      throw new NotFoundException('Movie not found');
    }
    else{
          return movie;

    }
  }

  async getAllMovies(): Promise<Movie[]> {
    const movies = await this.movieModel.find().exec();
    return movies;
  }

  async updateMovie(id: string, updateMovieDto: UpdateMovieDto): Promise<Movie> {
    const updatedMovie = await this.movieModel.findByIdAndUpdate(id, updateMovieDto, { new: true }).exec();
    if (!updatedMovie) {
      throw new NotFoundException('Movie not found');
    }
    return updatedMovie;
  }
  async deleteMovieById(id: string): Promise<void> {
    const result = await this.movieModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('Movie not found');
    }
  }
}
