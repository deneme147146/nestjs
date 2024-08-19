import { MovieService } from './movie.service';

import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Movie } from './entities/movie.entity';
import { FetchMovieDetails } from './type/fetch-movie-details.type';

import { AxiosResponse } from 'axios';
import axios from 'axios';
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

jest.mock('axios');

describe('MovieService', () => {
  let service: MovieService;
  let movieModel: Model<Movie>;

  const mockMovieDetailsa = {
    id: 1,
    title: 'Mock Movie',
  };

  const movieDetails = {
    adult: false,
    backdrop_path: '/dsGwCEO8tda4FlgHKvL95f0oQbH.jpg',
    genre_ids: [16, 878, 28],
    id: 1209290,
    original_language: 'en',
    original_title: 'Justice League: Crisis on Infinite Earths Part Three',
    overview:
      'Now fully revealed as the ultimate threat to existence, the Anti-Monitor wages an unrelenting attack on the surviving Earths that struggle for survival in a pocket universe. One by one, these worlds and all their inhabitants are vaporized! On the planets that remain, even time itself is shattered, and heroes from the past join the Justice League and their rag-tag allies against the epitome of evil. But as they make their last stand, will the sacrifice of the superheroes be enough to save us all?',
    popularity: 781.673,
    poster_path: '/a3q8NkM8uTh9E23VsbUOdDSbBeN.jpg',
    release_date: '2024-07-16',
    title: 'Justice League: Crisis on Infinite Earths Part Three',
    video: false,
    vote_average: 7.514,
    vote_count: 138,
  };

  const mockMovies = {
    data: {
      results: [movieDetails],
    },
  };
  const mockMoviesDetail = {
    data: movieDetails
    
  };



  //console.log('den,', mockMovieDetails.data.results);

  beforeEach(async () => {
    process.env.API_KEY = '4e71f4722153864e3fa7efc281dbe328';
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MovieService,
        {
          provide: getModelToken('Movie'),
          useValue: {
            findOne: jest.fn(),
            findById: jest.fn(),
            find: jest.fn(),
            deleteOne: jest.fn(),
            prototype: {
              save: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<MovieService>(MovieService);
    movieModel = module.get<Model<Movie>>(getModelToken('Movie'));
  });

  afterEach(() => {
    jest.clearAllMocks();
    delete process.env.API_KEY;
  });

  // describe('fetchAndSaveMovie', () => {
  //   it('should fetch movies and save them', async () => {
  //     // Mock axios.get to return an object with a data property
  //     axios.get = jest.fn().mockResolvedValueOnce({ data: { results: mockMovies } });

  //     movieModel.prototype.save = jest.fn().mockResolvedValue({});

  //     await service.fetchAndSaveMovie();

  //     expect(axios.get).toHaveBeenCalled();
  //     expect(movieModel.prototype.save).toHaveBeenCalled();
  //   });
  // });

  // describe('fetchAndSaveMovies', () => {
  //   it('should fetch and save movies if they do not already exist', async () => {
  //     axios.get = jest.fn().mockResolvedValueOnce(mockMovies);
  //     movieModel.findOne = jest.fn().mockResolvedValue(null);
  //     movieModel.prototype.save = jest.fn().mockResolvedValue({});

  //     await service.fetchAndSaveMovies();

  //     expect(axios.get).toHaveBeenCalled();
  //     expect(movieModel.findOne).toHaveBeenCalled();
  //     expect(movieModel.prototype.save).toHaveBeenCalled();
  //   });
  // });

  // describe('fetchMovieDetails', () => {
  //   it('should fetch movie details', async () => {
  //     axios.get = jest.fn().mockResolvedValueOnce(mockMoviesDetail);

  //     const result = await service.fetchMovieDetails(1);

  //     // expect(axios.get).toHaveBeenCalledWith(`https://api.themoviedb.org/3/movie/1?api_key=${process.env.API_KEY}`)
  //     expect(result).toEqual(mockMoviesDetail);
  //   });
  // });

  describe('getMovieById', () => {
    it('should return a movie by id', async () => {
      movieModel.findById = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockMoviesDetail),
      });

      const result = await service.getMovieById('1');

      expect(result).toEqual(mockMoviesDetail);
    });

    it('should throw NotFoundException if movie is not found', async () => {
      movieModel.findById = jest
        .fn()
        .mockReturnValue({ exec: jest.fn().mockResolvedValue(null) });

      await expect(service.getMovieById('1')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('getAllMovies', () => {
    it('should return all movies', async () => {
      movieModel.find = jest
        .fn()
        .mockReturnValue({ exec: jest.fn().mockResolvedValue(mockMovies) });

      const result = await service.getAllMovies();

      expect(result).toEqual(mockMovies);
    });
  });

  describe('deleteMovieById', () => {
    it('should delete a movie by id', async () => {
      movieModel.deleteOne = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue({ deletedCount: 1 }),
      });

      await service.deleteMovieById('1');

      expect(movieModel.deleteOne).toHaveBeenCalled();
    });

    it('should throw NotFoundException if no movie is deleted', async () => {
      movieModel.deleteOne = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue({ deletedCount: 0 }),
      });

      await expect(service.deleteMovieById('1')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
